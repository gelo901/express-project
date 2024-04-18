import { type Request, type Response, Router } from 'express'
import { STATUS_CODES } from '../constants/status-codes'
import { blogsDbRepository } from '../repositories/blogs-db-repository'
import { validateDescription, validateName, validateWebsiteUrl } from '../middleware/validateBlogsFields'
import { checkValidateFieldsMiddleware } from '../middleware/check-validate-fields-middleware/checkValidateFieldsMiddleware'
import { basicAuthMiddleware } from '../middleware/authGuard'

export const blogsRouter = Router({})

blogsRouter.get('/', async (_: Request, res: Response) => {
  const blogs = await blogsDbRepository.getAllBlogs()
  res.status(STATUS_CODES.OK)
  res.send(blogs)
})

blogsRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  const blog = await blogsDbRepository.getBlogsById(id.toString())

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
  async (req: Request, res: Response) => {
    const { name, description, websiteUrl } = req.body || {}

    const createdBlogs = await blogsDbRepository.createBlog({ name, description, websiteUrl })

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
  async (req: Request, res: Response) => {
    const { id: blogId } = req.params
    const { name, description, websiteUrl } = req.body || {}

    const updatedBlog = await blogsDbRepository.updateVideoById({ blogId, params: { name, description, websiteUrl } })

    if (!updatedBlog) {
      res.status(STATUS_CODES.NOT_FOUND)
      res.send()
    }

    res.status(STATUS_CODES.NO_CONTENTS)
    res.send()
  }
)

blogsRouter.delete('/:id', basicAuthMiddleware, async (req: Request, res: Response) => {
  const { id: blogId } = req.params

  const result = await blogsDbRepository.deletedBlogById(blogId)

  if (!result) {
    res.status(STATUS_CODES.NOT_FOUND)
    res.send()
  }

  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})
