import { type Request, type Response, Router } from 'express'
import { STATUS_CODES } from '../constants/status-codes'
import { blogsService } from '../services/blogsService'
import { validateDescription, validateName, validateWebsiteUrl } from '../middleware/validateBlogsFields'
import { checkValidateFieldsMiddleware } from '../middleware/check-validate-fields-middleware/checkValidateFieldsMiddleware'
import { basicAuthMiddleware } from '../middleware/authGuard'

export const blogsRouter = Router({})

blogsRouter.get('/', (_: Request, res: Response) => {
  const blogs = blogsService.getAllBlogs()
  res.status(STATUS_CODES.OK)
  res.send(blogs)
})

blogsRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params

  const blog = blogsService.getBlogsById(id.toString())

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

    const createdBlogs = blogsService.createBlog({ name, description, websiteUrl })

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

    const updatedBlog = blogsService.updateVideoById({ blogId, params: { name, description, websiteUrl } })

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

  const result = blogsService.deletedBlogById(blogId)

  if (!result) {
    res.status(STATUS_CODES.NOT_FOUND)
    res.send()
  }

  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})
