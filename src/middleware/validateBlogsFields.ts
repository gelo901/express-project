import { body } from 'express-validator'
import constants from './constants'

export const validateName = body('name')
  .trim()
  .isLength({ min: constants.BLOGS.MIN_COUNT_TITLE, max: constants.BLOGS.MAX_COUNT_TITLE })
  .withMessage({
    message: 'error validation',
    field: 'name'
  })

export const validateDescription = body('description')
  .trim()
  .isLength({ min: constants.BLOGS.MIN_DESCRIPTION_COUNT, max: constants.BLOGS.MAX_DESCRIPTION_COUNT })
  .withMessage({
    message: 'error validation',
    field: 'description'
  })

export const validateWebsiteUrl = body('websiteUrl')
  .trim()
  .isURL({ protocols: ['http', 'https'] })
  .withMessage({
    message: 'error validation',
    field: 'websiteUrl'
  })
