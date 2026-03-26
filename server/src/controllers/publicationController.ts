import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Publication from '../models/Publication'

export const getPublications = asyncHandler(async (_req: Request, res: Response) => {
  const publications = await Publication.find().sort({ date: -1 })
  res.json(publications)
})

export const createPublication = asyncHandler(async (req: Request, res: Response) => {
  const publication = await Publication.create(req.body)
  res.status(201).json(publication)
})

export const updatePublication = asyncHandler(async (req: Request, res: Response) => {
  const publication = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!publication) { res.status(404); throw new Error('Publication not found') }
  res.json(publication)
})

export const deletePublication = asyncHandler(async (req: Request, res: Response) => {
  const publication = await Publication.findByIdAndDelete(req.params.id)
  if (!publication) { res.status(404); throw new Error('Publication not found') }
  res.json({ message: 'Deleted' })
})
