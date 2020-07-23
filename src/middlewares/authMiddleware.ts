import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import authConfig from '../config/authConfig'

interface TokenPayload {
    id: String
    iat: Number
    exp: Number
}

export default function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ msg: 'Token não localizado!' })
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(token, authConfig.secret)
    const { id } = data as TokenPayload
    req.userId = id

    return next()
  } catch (error) {
    return res.status(401).json({ msg: 'Não autorizado!' })
  }
}
