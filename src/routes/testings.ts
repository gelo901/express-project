import { type Response, type Request, Router } from 'express'
import { videosService } from '../services'
import { STATUS_CODES } from '../constants/status-codes'

export const testingRouter = Router({})

testingRouter.delete('/all-data', (req: Request, res: Response) => {
  videosService.clearAll()
  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})
