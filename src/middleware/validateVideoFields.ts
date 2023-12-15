import { body } from 'express-validator'
import { MAX_COUNT_TITLE, MIN_COUNT_TITLE } from './constants'

const isInvalidString = (inputString: string) => {
  const regex = /^[A-Z].*\d$/
  return regex.test(inputString)
}

const isValidDateFormat = (inputString: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
  return regex.test(inputString)
}

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

export const validateCanBeDownloaded = body('canBeDownloaded').optional().isBoolean().withMessage({
  message: 'error validation',
  field: 'canBeDownloaded'
})

export const validateAvailableResolutions = body('availableResolutions')
  .optional()
  .custom((availableResolutions: string[]) => {
    if (availableResolutions?.length) {
      const checkAvailableResolutionsItem = availableResolutions.filter((resolution) => isInvalidString(resolution))
      if (availableResolutions.length !== checkAvailableResolutionsItem?.length) {
        throw new Error('error validation')
      }
    }
    return true
  })
  .withMessage({
    message: 'error validation',
    field: 'availableResolutions'
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

export const validatePublicationDate = body('publicationDate')
  .optional()
  .custom((publicationDate: string) => {
    if (publicationDate && !isValidDateFormat(publicationDate)) {
      throw new Error('error validation')
    }
    return true
  })
  .withMessage({
    message: 'error validation',
    field: 'publicationDate'
  })
