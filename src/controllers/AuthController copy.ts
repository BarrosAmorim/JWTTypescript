import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '@models/User'
import authConfig from '@config/authConfig'

class AuthController {
  async authenticate (req: Request, res: Response): Promise<Response> {
    const repository = getRepository(User)
    const { email, password } = req.body
    const user = await repository.findOne({ where: { email } })

    if (!user) {
      return res.status(401).json({ msg: 'Usuário não autorizado' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return res.status(401).json({ msg: 'Usuário não autorizado' })
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: authConfig.expiresIn })

    delete user.password

    return res.json({
      user,
      token
    })
  }
}

export default new AuthController()
