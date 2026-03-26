import { Router } from 'express'
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../controllers/certificationController'
import { protect } from '../middleware/authMiddleware'

const router = Router()

router.route('/').get(getCertifications).post(protect, createCertification)
router.route('/:id').put(protect, updateCertification).delete(protect, deleteCertification)

export default router
