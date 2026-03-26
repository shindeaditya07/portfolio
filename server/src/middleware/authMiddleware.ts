import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  role: string
}

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Not authorized, no token' })
    return
  }
  try {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    if (decoded.role !== 'admin') {
      res.status(403).json({ message: 'Forbidden' })
      return
    }
    next()
  } catch {
    res.status(401).json({ message: 'Not authorized, invalid token' })
  }
}
