import { body, validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { STATUS_CODES } from '../constants/status-codes'

const MIN_COUNT_TITLE = 2
const MAX_COUNT_TITLE = 20

export const validateTitle = body('title').trim().isLength({ min: MIN_COUNT_TITLE, max: MAX_COUNT_TITLE }).withMessage({
  message: 'error validation',
  field: 'title'
})

export const validateAuthor = body('author')
  .trim()
  .isLength({ min: MIN_COUNT_TITLE, max: MAX_COUNT_TITLE })
  .withMessage({
    message: 'error validation',
    field: 'author'
  })

export const validateAvailableResolutions = body('availableResolutions')
  .trim()
  .isLength({ min: MIN_COUNT_TITLE })
  .withMessage({
    message: 'error validation',
    field: 'availableResolutions'
  })

export const validateCanBeDownloaded = body('canBeDownloaded').optional().isBoolean().withMessage({
  message: 'error validation',
  field: 'canBeDownloaded'
})

export const validateMinAgeRestriction = body('minAgeRestriction')
  .optional()
  .custom((minAgeRestriction: number) => {
    if (minAgeRestriction && minAgeRestriction > 21) {
      throw new Error('error validation')
    }
    return true
  })
  .withMessage({
    message: 'error validation',
    field: 'minAgeRestriction'
  })

export const validatePublicationDate = body('publicationDate').optional().isISO8601().withMessage({
  message: 'error validation',
  field: 'publicationDate'
})

export const checkValidateFieldsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(STATUS_CODES.BAD_REQUEST).json(errors.array())
    return
  }

  next()
}
