import { Router } from 'express'
import {
  getPublications,
  createPublication,
  updatePublication,
  deletePublication,
} from '../controllers/publicationController'
import { protect } from '../middleware/authMiddleware'

const router = Router()

router.route('/').get(getPublications).post(protect, createPublication)
router.route('/:id').put(protect, updatePublication).delete(protect, deletePublication)

export default router
