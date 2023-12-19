import { type Response, type Request, Router } from 'express'
import { videosService, blogsService, postService } from '../services'
import { STATUS_CODES } from '../constants/status-codes'

export const testingRouter = Router({})

testingRouter.delete('/all-data', (_: Request, res: Response) => {
  videosService.clearAll()
  blogsService.clearAll()
  postService.clearAll()
  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})

testingRouter.delete('/all-data/videos', (_: Request, res: Response) => {
  videosService.clearAll()
  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})

testingRouter.delete('/all-data/blogs', (_: Request, res: Response) => {
  blogsService.clearAll()
  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})

testingRouter.delete('/all-data/posts', (_: Request, res: Response) => {
  postService.clearAll()
  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})
