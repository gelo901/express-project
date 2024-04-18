import { type Request, type Response, Router } from 'express'
import { STATUS_CODES } from '../constants/status-codes'
import { blogsRepository } from '../repositories/blogsRepository'
import { validateDescription, validateName, validateWebsiteUrl } from '../middleware/validateBlogsFields'
import { checkValidateFieldsMiddleware } from '../middleware/check-validate-fields-middleware/checkValidateFieldsMiddleware'
import { basicAuthMiddleware } from '../middleware/authGuard'

export const blogsRouter = Router({})

blogsRouter.get('/', (_: Request, res: Response) => {
  const blogs = blogsRepository.getAllBlogs()
  res.status(STATUS_CODES.OK)
  res.send(blogs)
})

blogsRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params

  const blog = blogsRepository.getBlogsById(id.toString())

  if (!blog) {
    res.status(STATUS_CODES.NOT_FOUND)
    res.send()
  }

  res.status(STATUS_CODES.OK)
  res.send(blog)
})

blogsRouter.post(
  '/',
  basicAuthMiddleware,
  validateName,
  validateDescription,
  validateWebsiteUrl,
  checkValidateFieldsMiddleware,
  (req: Request, res: Response) => {
    const { name, description, websiteUrl } = req.body || {}

    const createdBlogs = blogsRepository.createBlog({ name, description, websiteUrl })

    res.status(STATUS_CODES.CREATED)
    res.send(createdBlogs)
  }
)

blogsRouter.put(
  '/:id',
  basicAuthMiddleware,
  validateName,
  validateDescription,
  validateWebsiteUrl,
  checkValidateFieldsMiddleware,
  (req: Request, res: Response) => {
    const { id: blogId } = req.params
    const { name, description, websiteUrl } = req.body || {}

    const updatedBlog = blogsRepository.updateVideoById({ blogId, params: { name, description, websiteUrl } })

    if (!updatedBlog) {
      res.status(STATUS_CODES.NOT_FOUND)
      res.send()
    }

    res.status(STATUS_CODES.NO_CONTENTS)
    res.send()
  }
)

blogsRouter.delete('/:id', basicAuthMiddleware, (req: Request, res: Response) => {
  const { id: blogId } = req.params

  const result = blogsRepository.deletedBlogById(blogId)

  if (!result) {
    res.status(STATUS_CODES.NOT_FOUND)
    res.send()
  }

  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})
