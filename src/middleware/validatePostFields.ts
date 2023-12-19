import { body } from 'express-validator'
import constants, { MAX_CONTENT_COUNT } from './constants'
import { blogsService } from '../services'

export const validateTitle = body('title')
  .notEmpty()
  .isLength({ min: constants.POSTS.MIN_COUNT_TITLE, max: constants.POSTS.MAX_COUNT_TITLE })
  .withMessage({
    message: 'error validation',
    field: 'title'
  })

export const validateShortDescription = body('shortDescription')
  .trim()
  .isLength({ min: constants.POSTS.MIN_SHORT_DESCRIPTION_COUNT, max: constants.POSTS.MAX_SHORT_DESCRIPTION_COUNT })
  .withMessage({
    message: 'error validation',
    field: 'shortDescription'
  })

export const validateContent = body('content')
  .trim()
  .isLength({ min: constants.POSTS.MIN_CONTENT_COUNT, max: constants.POSTS.MAX_CONTENT_COUNT })
  .withMessage({
    message: 'error validation',
    field: 'content'
  })

export const validateBlogId = body('blogId')
  .notEmpty()
  .custom((blogId: string) => {
    const blog = blogsService.getBlogsById(blogId)
    if (!blog) {
      throw new Error('error validation')
    }
    return true
  })
  .withMessage({
    message: 'error validation',
    field: 'blogId'
  })
