import mongoose, { Document, Schema } from 'mongoose'

export interface IPublication extends Document {
  title: string
  journal?: string
  conference?: string
  date: Date
  link?: string
  type: 'paper' | 'article' | 'blog'
  authors: string[]
  abstract?: string
}

const PublicationSchema = new Schema<IPublication>(
  {
    title: { type: String, required: true },
    journal: { type: String },
    conference: { type: String },
    date: { type: Date, required: true },
    link: { type: String },
    type: { type: String, enum: ['paper', 'article', 'blog'], default: 'paper' },
    authors: [{ type: String }],
    abstract: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model<IPublication>('Publication', PublicationSchema)
