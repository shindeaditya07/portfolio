import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db'
import experienceRoutes from './routes/experienceRoutes'
import projectRoutes from './routes/projectRoutes'
import publicationRoutes from './routes/publicationRoutes'
import certificationRoutes from './routes/certificationRoutes'
import contactRoutes from './routes/contactRoutes'
import authRoutes from './routes/authRoutes'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: (requestOrigin, callback) => {
    // Always allow requests with no origin, or typical local/Vercel domains
    if (!requestOrigin || 
        requestOrigin.includes('localhost') || 
        requestOrigin.includes('vercel.app') || 
        (process.env.FRONTEND_URL && requestOrigin === process.env.FRONTEND_URL.trim())) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Routes
app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))
app.use('/api/experience', experienceRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/publications', publicationRoutes)
app.use('/api/certifications', certificationRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/auth', authRoutes)

// Error handler (must be last)
app.use(errorHandler)

// Start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
})
