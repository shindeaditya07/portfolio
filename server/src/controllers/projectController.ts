import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Project from '../models/Project'

export const getProjects = asyncHandler(async (_req: Request, res: Response) => {
  const projects = await Project.find().sort({ order: 1 })
  res.json(projects)
})

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.create(req.body)
  res.status(201).json(project)
})

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!project) { res.status(404); throw new Error('Project not found') }
  res.json(project)
})

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findByIdAndDelete(req.params.id)
  if (!project) { res.status(404); throw new Error('Project not found') }
  res.json({ message: 'Deleted' })
})
