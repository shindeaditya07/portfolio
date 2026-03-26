import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Experience from '../models/Experience'

// @desc  Get all experiences
// @route GET /api/experience
// @access Public
export const getExperiences = asyncHandler(async (_req: Request, res: Response) => {
  const experiences = await Experience.find().sort({ order: 1 })
  res.json(experiences)
})

// @desc  Create experience
// @route POST /api/experience
// @access Admin
export const createExperience = asyncHandler(async (req: Request, res: Response) => {
  const experience = await Experience.create(req.body)
  res.status(201).json(experience)
})

// @desc  Update experience
// @route PUT /api/experience/:id
// @access Admin
export const updateExperience = asyncHandler(async (req: Request, res: Response) => {
  const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!experience) { res.status(404); throw new Error('Experience not found') }
  res.json(experience)
})

// @desc  Delete experience
// @route DELETE /api/experience/:id
// @access Admin
export const deleteExperience = asyncHandler(async (req: Request, res: Response) => {
  const experience = await Experience.findByIdAndDelete(req.params.id)
  if (!experience) { res.status(404); throw new Error('Experience not found') }
  res.json({ message: 'Deleted' })
})
