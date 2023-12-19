import { type Request, type Response, Router } from 'express'
import { STATUS_CODES } from '../constants/status-codes'
import { postService } from '../services'
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
  const blogs = postService.getAllPosts()
  res.status(STATUS_CODES.OK)
  res.send(blogs)
})

postRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params

  const post = postService.getPostsById(id.toString())

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

    const createdPost = postService.createPost({
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

    const updatedPost = postService.updatePostById({ postId, params: { title, shortDescription, content, blogId } })

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

  const result = postService.deletedPostById(postId)

  if (!result) {
    res.status(STATUS_CODES.NOT_FOUND)
    res.send()
  }

  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})
