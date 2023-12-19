import { Request, Response, NextFunction } from 'express'
import { STATUS_CODES } from '../constants/status-codes'

const AUTH_ERROR = 'Unauthorized'
export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    return res.status(STATUS_CODES.UNAUTHORIZED).send(AUTH_ERROR)
  }

  const tokenType = authHeader.split(' ')[0]

  if (tokenType !== 'Basic') {
    res.status(STATUS_CODES.UNAUTHORIZED).send(AUTH_ERROR)
  }

  const encodedCredentials = authHeader.split(' ')[1]

  try {
    const decodedCredentials = atob(encodedCredentials)
    const [username, password] = decodedCredentials.split(/[\\/:\\s]+/)

    if (username === 'admin' && password === 'qwerty') {
      next()
    } else {
      res.status(STATUS_CODES.UNAUTHORIZED).send(AUTH_ERROR)
    }
  } catch (error) {
    res.status(STATUS_CODES.UNAUTHORIZED).send(AUTH_ERROR)
  }
}
