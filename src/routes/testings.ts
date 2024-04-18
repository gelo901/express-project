import { type Response, type Request, Router } from 'express'
import { videosRepository, blogsRepository, postRepository } from '../repositories'
import { STATUS_CODES } from '../constants/status-codes'

export const testingRouter = Router({})

testingRouter.delete('/all-data', (_: Request, res: Response) => {
  videosRepository.clearAll()
  blogsRepository.clearAll()
  postRepository.clearAll()
  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})

testingRouter.delete('/all-data/videos', (_: Request, res: Response) => {
  videosRepository.clearAll()
  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})

testingRouter.delete('/all-data/blogs', (_: Request, res: Response) => {
  blogsRepository.clearAll()
  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})

testingRouter.delete('/all-data/posts', (_: Request, res: Response) => {
  postRepository.clearAll()
  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})
