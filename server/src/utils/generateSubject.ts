import { GoogleGenerativeAI } from '@google/generative-ai'

/**
 * Generates a concise, relevant email subject line using Gemini Flash.
 * Falls back to a plain subject if the API key is missing or the call fails.
 */
export const generateSubject = async (
  senderName: string,
  message: string
): Promise<string> => {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return `Portfolio Contact from ${senderName}`
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `
You are an email subject line writer. Given a contact form message sent to a developer's portfolio website, 
generate a SHORT (max 8 words), professional, and specific email subject line.
Do NOT include quotes. Do NOT include "Re:" or "Fwd:". Just output the subject line text only.

Sender name: ${senderName}
Message: "${message.slice(0, 400)}"

Subject line:`

    const result = await model.generateContent(prompt)
    const subject = result.response.text().trim().replace(/^["']|["']$/g, '')
    return subject || `Portfolio Contact from ${senderName}`
  } catch (err) {
    console.warn('Gemini subject generation failed, using fallback:', err)
    return `Portfolio Contact from ${senderName}`
  }
}
