import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Contact from '../models/Contact'
import { sendEmail } from '../utils/sendEmail'
import { generateSubject } from '../utils/generateSubject'

// @desc  Submit contact form
// @route POST /api/contact
// @access Public
export const submitContact = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    res.status(400)
    throw new Error('All fields are required')
  }

  // Save to DB
  const contact = await Contact.create({ name, email, message })

  // Generate AI subject + send email (non-blocking — don't fail the response if email fails)
  try {
    const subject = await generateSubject(name, message)

    const now = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'shindeaditya07@gmail.com',
      replyTo: email,
      subject,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a1a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a1a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a0a2e 0%,#16082a 100%);border-radius:16px 16px 0 0;padding:32px 36px;border-bottom:1px solid rgba(139,92,246,0.3);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:22px;font-weight:700;color:#a78bfa;letter-spacing:-0.5px;">Aditya.</span>
                    <span style="font-size:12px;color:#6b7280;margin-left:8px;">Portfolio Contact</span>
                  </td>
                  <td align="right">
                    <span style="background:rgba(139,92,246,0.15);color:#a78bfa;font-size:11px;padding:4px 10px;border-radius:20px;border:1px solid rgba(139,92,246,0.3);">
                      📬 New Message
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#10102a;padding:32px 36px;">

              <!-- Sender info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:12px;padding:20px;margin-bottom:28px;">
                <tr>
                  <td style="padding:0 0 12px 0;">
                    <span style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;">From</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="color:#e2e8f0;font-size:18px;font-weight:600;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:4px;">
                    <a href="mailto:${email}" style="color:#a78bfa;font-size:14px;text-decoration:none;">${email}</a>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <p style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px 0;">Message</p>
              <div style="background:rgba(255,255,255,0.03);border-left:3px solid #7c3aed;border-radius:0 8px 8px 0;padding:20px 24px;margin-bottom:28px;">
                <p style="color:#cbd5e1;font-size:15px;line-height:1.8;margin:0;white-space:pre-wrap;">${message}</p>
              </div>

              <!-- Reply CTA -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <a href="mailto:${email}?subject=Re: ${subject}"
                       style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;">
                      ↩ Reply to ${name}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0a0a1a;padding:20px 36px;border-radius:0 0 16px 16px;border-top:1px solid rgba(139,92,246,0.1);">
              <p style="color:#374151;font-size:12px;margin:0;text-align:center;">
                Received at ${now} IST · via <a href="https://shindeaditya07.dev" style="color:#6b7280;text-decoration:none;">portfolio contact form</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    })
  } catch (err) {
    console.warn('Email send failed (form still submitted):', err)
  }

  res.status(201).json({ message: 'Message sent successfully', id: contact._id })
})

// @desc  Get all contacts
// @route GET /api/contact
// @access Admin
export const getContacts = asyncHandler(async (_req: Request, res: Response) => {
  const contacts = await Contact.find().sort({ createdAt: -1 })
  res.json(contacts)
})

// @desc  Mark contact as read
// @route PUT /api/contact/:id/read
// @access Admin
export const markRead = asyncHandler(async (req: Request, res: Response) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
  if (!contact) { res.status(404); throw new Error('Contact not found') }
  res.json(contact)
})
