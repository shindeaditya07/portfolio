import mongoose, { Document, Schema } from 'mongoose'

export interface IProject extends Document {
  title: string
  description: string
  longDescription?: string
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  thumbnail?: string
  featured: boolean
  category: string
  order: number
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    techStack: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    thumbnail: { type: String },
    featured: { type: Boolean, default: false },
    category: { type: String, default: 'AI/ML' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model<IProject>('Project', ProjectSchema)
