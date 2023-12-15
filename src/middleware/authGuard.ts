import { Request, Response, NextFunction } from 'express'
import { STATUS_CODES } from '../constants/status-codes'

const AUTH_ERROR = 'Unauthorized'
export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    return res.status(STATUS_CODES.UNAUTHORIZED).send(AUTH_ERROR)
  }

  const encodedCredentials = authHeader.split(' ')[1]
  const decodedCredentials = atob(encodedCredentials)
  const [username, password] = decodedCredentials.split(':')

  if (username === 'admin' && password === 'qwerty') {
    next()
  } else {
    res.status(STATUS_CODES.UNAUTHORIZED).send(AUTH_ERROR)
  }
}
