import { Router } from 'express'
import authMiddleware from '@middlewares/authMiddleware'
import UserController from '@controllers/UserController'
import AuthController from '@controllers/AuthController copy'

const routes = Router()

routes.post('/users', UserController.store)
routes.post('/auth', AuthController.authenticate)
routes.get('/users', authMiddleware, UserController.index)

export default routes
