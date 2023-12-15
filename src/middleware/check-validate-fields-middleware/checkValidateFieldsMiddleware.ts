import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { STATUS_CODES } from '../../constants/status-codes'

export const checkValidateFieldsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const errorsArray = errors.array()
    const errorsMessages = errorsArray.map((error) => error.msg)
    res.status(STATUS_CODES.BAD_REQUEST).json({ errorsMessages })
    return
  }

  next()
}
