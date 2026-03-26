import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App password
    },
  })

  await transporter.sendMail({
    from: `"Aditya Portfolio" <${process.env.EMAIL_USER}>`,
    replyTo: options.replyTo,
    ...options,
  })
}
