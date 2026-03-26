import mongoose, { Document, Schema } from 'mongoose'

export interface IExperience extends Document {
  company: string
  role: string
  duration: string
  startDate: Date
  endDate?: Date
  current: boolean
  description: string[]
  logo?: string
  location: string
  type: 'full-time' | 'internship' | 'part-time' | 'contract'
  order: number
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: [{ type: String }],
    logo: { type: String },
    location: { type: String, required: true },
    type: {
      type: String,
      enum: ['full-time', 'internship', 'part-time', 'contract'],
      default: 'full-time',
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model<IExperience>('Experience', ExperienceSchema)
