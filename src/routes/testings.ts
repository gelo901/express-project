import { type Response, type Request, Router } from 'express'
import { videosService } from '../services'

export const testingRouter = Router({})

testingRouter.delete('/all-data', (req: Request, res: Response) => {
  videosService.clearAll()
  res.status(204)
  res.send()
})
