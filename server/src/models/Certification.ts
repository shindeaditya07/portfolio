import mongoose, { Document, Schema } from 'mongoose'

export interface ICertification extends Document {
  name: string
  issuer: string
  date: Date
  credentialUrl?: string
  badgeUrl?: string
  category?: string
}

const CertificationSchema = new Schema<ICertification>(
  {
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: Date, required: true },
    credentialUrl: { type: String },
    badgeUrl: { type: String },
    category: { type: String, default: 'General' },
  },
  { timestamps: true }
)

export default mongoose.model<ICertification>('Certification', CertificationSchema)
