import { type Response, type Request, Router } from 'express'
import { videosDbRepository, blogsDbRepository, postDbRepository } from '../repositories'
import { STATUS_CODES } from '../constants/status-codes'

export const testingRouter = Router({})

testingRouter.delete('/all-data', (_: Request, res: Response) => {
  videosDbRepository.clearAll()
  blogsDbRepository.clearAll()
  postDbRepository.clearAll()
  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})

testingRouter.delete('/all-data/videos', (_: Request, res: Response) => {
  videosDbRepository.clearAll()
  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})

testingRouter.delete('/all-data/blogs', (_: Request, res: Response) => {
  blogsDbRepository.clearAll()
  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})

testingRouter.delete('/all-data/posts', (_: Request, res: Response) => {
  postDbRepository.clearAll()
  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})
