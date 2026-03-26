import { Router } from 'express'
import { submitContact, getContacts, markRead } from '../controllers/contactController'
import { protect } from '../middleware/authMiddleware'

const router = Router()

router.route('/').post(submitContact).get(protect, getContacts)
router.route('/:id/read').put(protect, markRead)

export default router
