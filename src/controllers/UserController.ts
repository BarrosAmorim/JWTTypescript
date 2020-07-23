import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import User from '@models/User'

class UserController {
  index (req: Request, res: Response) {
    return res.send({ userId: req.userId })
  }

  async store (req: Request, res: Response): Promise<Response> {
    const repository = getRepository(User)
    const { email, password } = req.body
    const userExistis = await repository.findOne({ where: { email } })

    if (userExistis) {
      return res.status(409).json({ msg: 'Usuário já possui cadastro!' })
    }

    const user = repository.create({ email, password })
    await repository.save(user)

    return res.json(user)
  }
}

export default new UserController()
