import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Certification from '../models/Certification'

export const getCertifications = asyncHandler(async (_req: Request, res: Response) => {
  const certifications = await Certification.find().sort({ date: -1 })
  res.json(certifications)
})

export const createCertification = asyncHandler(async (req: Request, res: Response) => {
  const certification = await Certification.create(req.body)
  res.status(201).json(certification)
})

export const updateCertification = asyncHandler(async (req: Request, res: Response) => {
  const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!certification) { res.status(404); throw new Error('Certification not found') }
  res.json(certification)
})

export const deleteCertification = asyncHandler(async (req: Request, res: Response) => {
  const certification = await Certification.findByIdAndDelete(req.params.id)
  if (!certification) { res.status(404); throw new Error('Certification not found') }
  res.json({ message: 'Deleted' })
})
