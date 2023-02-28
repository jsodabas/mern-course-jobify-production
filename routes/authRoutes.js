import express from 'express'
import rateLimiter from 'express-rate-limit'
import { login, register, updateUser, getCurrentUser, logoutUser } from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 10,
    message: 'Too many requests from this IP. Please try again after 15 minutes'
})

const router = express.Router()

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.route('/logoutUser').get(logoutUser)
router.route('/:id').patch(authenticateUser, updateUser)
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser)

export default router