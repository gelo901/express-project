import { body } from 'express-validator'
import {
  MAX_COUNT_TITLE,
  MAX_DESCRIPTION_COUNT,
  MIN_COUNT_TITLE,
  MIN_DESCRIPTION_COUNT,
  MIN_WEBSITE_URL_COUNT
} from './constants'

export const validateName = body('name').trim().isLength({ min: MIN_COUNT_TITLE, max: MAX_COUNT_TITLE }).withMessage({
  message: 'error validation',
  field: 'name'
})

export const validateDescription = body('description')
  .trim()
  .isLength({ min: MIN_DESCRIPTION_COUNT, max: MAX_DESCRIPTION_COUNT })
  .withMessage({
    message: 'error validation',
    field: 'description'
  })

export const validateWebsiteUrl = body('websiteUrl').trim().isLength({ min: MIN_WEBSITE_URL_COUNT }).withMessage({
  message: 'error validation',
  field: 'websiteUrl'
})
