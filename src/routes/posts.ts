import { type Request, type Response, Router } from 'express'
import { STATUS_CODES } from '../constants/status-codes'
import { postDbRepository } from '../repositories'
import { basicAuthMiddleware } from '../middleware/authGuard'
import {
  validateBlogId,
  validateContent,
  validateShortDescription,
  validateTitle
} from '../middleware/validatePostFields'
import { checkValidateFieldsMiddleware } from '../middleware/check-validate-fields-middleware/checkValidateFieldsMiddleware'

export const postRouter = Router({})

postRouter.get('/', async (_: Request, res: Response) => {
  const blogs = await postDbRepository.getAllPosts()
  res.status(STATUS_CODES.OK)
  res.send(blogs)
})

postRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  const post = await postDbRepository.getPostsById(id.toString())

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
  async (req: Request, res: Response) => {
    const { title, shortDescription, content, blogId } = req.body || {}

    const createdPost = await postDbRepository.createPost({
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
  async (req: Request, res: Response) => {
    const { id: postId } = req.params
    const { title, shortDescription, content, blogId } = req.body || {}

    const updatedPost = await postDbRepository.updatePostById({
      postId,
      params: { title, shortDescription, content, blogId }
    })

    if (!updatedPost) {
      res.status(STATUS_CODES.NOT_FOUND)
      res.send()
    }

    res.status(STATUS_CODES.NO_CONTENTS)
    res.send()
  }
)

postRouter.delete('/:id', basicAuthMiddleware, async (req: Request, res: Response) => {
  const { id: postId } = req.params

  const result = await postDbRepository.deletedPostById(postId)

  if (!result) {
    res.status(STATUS_CODES.NOT_FOUND)
    res.send()
  }

  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})
