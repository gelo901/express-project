import { type Request, type Response, Router } from 'express'
import { STATUS_CODES } from '../constants/status-codes'
import { postRepository } from '../repositories'
import { basicAuthMiddleware } from '../middleware/authGuard'
import {
  validateBlogId,
  validateContent,
  validateShortDescription,
  validateTitle
} from '../middleware/validatePostFields'
import { checkValidateFieldsMiddleware } from '../middleware/check-validate-fields-middleware/checkValidateFieldsMiddleware'

export const postRouter = Router({})

postRouter.get('/', (_: Request, res: Response) => {
  const blogs = postRepository.getAllPosts()
  res.status(STATUS_CODES.OK)
  res.send(blogs)
})

postRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params

  const post = postRepository.getPostsById(id.toString())

  if (!post) {
    res.status(STATUS_CODES.NOT_FOUND)
    res.send()
  }

  res.status(STATUS_CODES.OK)
  res.send(post)
})

postRouter.post(
  '/',
  basicAuthMiddleware,
  validateTitle,
  validateShortDescription,
  validateContent,
  validateBlogId,
  checkValidateFieldsMiddleware,
  (req: Request, res: Response) => {
    const { title, shortDescription, content, blogId } = req.body || {}

    const createdPost = postRepository.createPost({
      title,
      shortDescription,
      content,
      blogId
    })

    res.status(STATUS_CODES.CREATED)
    res.send(createdPost)
  }
)

postRouter.put(
  '/:id',
  basicAuthMiddleware,
  validateTitle,
  validateShortDescription,
  validateContent,
  validateBlogId,
  checkValidateFieldsMiddleware,
  (req: Request, res: Response) => {
    const { id: postId } = req.params
    const { title, shortDescription, content, blogId } = req.body || {}

    const updatedPost = postRepository.updatePostById({ postId, params: { title, shortDescription, content, blogId } })

    if (!updatedPost) {
      res.status(STATUS_CODES.NOT_FOUND)
      res.send()
    }

    res.status(STATUS_CODES.NO_CONTENTS)
    res.send()
  }
)

postRouter.delete('/:id', basicAuthMiddleware, (req: Request, res: Response) => {
  const { id: postId } = req.params

  const result = postRepository.deletedPostById(postId)

  if (!result) {
    res.status(STATUS_CODES.NOT_FOUND)
    res.send()
  }

  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})
