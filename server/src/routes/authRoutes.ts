import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../utils/sendEmail'
import Admin from '../models/Admin'
import fs from 'fs/promises'
import path from 'path'

const router = Router()

// @desc  Admin login
// @route POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { password } = req.body
  let adminPassword = process.env.ADMIN_PASSWORD
  
  // Prefer the database hash if they reset their password
  const adminDb = await Admin.findOne()
  if (adminDb && adminDb.passwordHash) {
    adminPassword = adminDb.passwordHash
  }

  if (!adminPassword) {
    res.status(500).json({ message: 'Server config error' })
    return
  }
  const match = await bcrypt.compare(password, adminPassword)
  if (!match) {
    res.status(401).json({ message: 'Invalid credentials' })
    return
  }
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET as string, { expiresIn: '7d' })
  res.json({ token })
})

// @desc  Forgot Password
// @route POST /api/auth/forgot-password
router.post('/forgot-password', async (req: Request, res: Response) => {
  const { email } = req.body
  
  if (email !== process.env.ADMIN_EMAIL) {
    // We return 200 even on wrong email to prevent email enumeration, 
    // but here we can just say "Email sent"
    res.json({ message: 'If the email matches an admin, a reset link was sent.' })
    return
  }

  const resetToken = jwt.sign({ reset: true }, process.env.JWT_SECRET as string, { expiresIn: '15m' })
  
  // Create reset link (assuming frontend is running on FRONTEND_URL or localhost 5173/5174)
  // We can just use the Origin header or default
  const origin = req.headers.origin || 'http://localhost:5173'
  const resetUrl = `${origin}/admin/reset-password?token=${resetToken}`

  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: 'Portfolio Admin - Password Reset',
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your portfolio admin dashboard.</p>
        <p>Click the link below to reset your password. This link is valid for 15 minutes.</p>
        <a href="${resetUrl}" style="padding: 10px 20px; background: #9333ea; color: white; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Reset Password</a>
      `
    })
    res.json({ message: 'If the email matches an admin, a reset link was sent.' })
  } catch (error) {
    console.error('Email send failed', error)
    res.status(500).json({ message: 'Could not send email' })
  }
})

// @desc  Reset Password
// @route POST /api/auth/reset-password
router.post('/reset-password', async (req: Request, res: Response) => {
  const { token, newPassword } = req.body

  if (!token || !newPassword) {
    res.status(400).json({ message: 'Token and new password are required' })
    return
  }

  try {
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET as string)
    
    // Hash new password
    const salt = await bcrypt.genSalt(12)
    const newHash = await bcrypt.hash(newPassword, salt)

    // Production-ready: Store the new hash strictly in MongoDB 
    // since Render does not have an underlying .env file
    let adminRecord = await Admin.findOne()
    if (adminRecord) {
      adminRecord.passwordHash = newHash
      await adminRecord.save()
    } else {
      await Admin.create({ passwordHash: newHash })
    }
    
    // Update active memory just for safety
    process.env.ADMIN_PASSWORD = newHash

    res.json({ message: 'Password reset successfully' })
  } catch (error) {
    console.error('Reset failed', error)
    res.status(401).json({ message: 'Invalid or expired token' })
  }
})

export default router
