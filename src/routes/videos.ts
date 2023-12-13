import { type Response, type Request, Router } from 'express'
import { videosService } from '../services'
import {
  checkValidateFieldsMiddleware,
  validateAuthor,
  validateAvailableResolutions,
  validateCanBeDownloaded,
  validateMinAgeRestriction,
  validatePublicationDate,
  validateTitle
} from '../middleware/validate'
import { STATUS_CODES } from '../constants/status-codes'

export const videosRouter = Router({})

videosRouter.get('/', (_: Request, res: Response) => {
  const videos = videosService.getAllVideos()
  res.status(STATUS_CODES.OK)
  res.send(videos)
})

videosRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params

  const video = videosService.getVideosById({ videoId: Number(id) })

  if (!video) {
    res.status(STATUS_CODES.NOT_FOUND)
    res.send()
  }

  res.status(STATUS_CODES.OK)
  res.send(video)
})

videosRouter.post(
  '/',
  validateTitle,
  validateAuthor,
  validateAvailableResolutions,
  validateCanBeDownloaded,
  validateMinAgeRestriction,
  validatePublicationDate,
  checkValidateFieldsMiddleware,
  (req: Request, res: Response) => {
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction } = req.body || {}

    const createdVideo = videosService.postVideos({
      title,
      author,
      availableResolutions,
      canBeDownloaded,
      minAgeRestriction
    })

    res.status(STATUS_CODES.CREATED)
    res.send(createdVideo)
  }
)

videosRouter.put(
  '/:id',
  validateTitle,
  validateAuthor,
  validateAvailableResolutions,
  validateCanBeDownloaded,
  validateMinAgeRestriction,
  validatePublicationDate,
  checkValidateFieldsMiddleware,
  (req: Request, res: Response) => {
    const { id: videoId } = req.params

    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body

    const updatedVideo = videosService.updateVideoById({
      videoId,
      params: {
        title,
        author,
        availableResolutions,
        canBeDownloaded,
        minAgeRestriction,
        publicationDate
      }
    })

    if (!updatedVideo) {
      res.status(STATUS_CODES.NOT_FOUND)
      res.send()
    }

    res.status(STATUS_CODES.NO_CONTENTS)
    res.send()
  }
)

videosRouter.delete('/:id', (req: Request, res: Response) => {
  const { id: videoId } = req.params

  const result = videosService.deletedVideosById({ videoId })

  if (!result) {
    res.status(STATUS_CODES.NOT_FOUND)
    res.send()
  }

  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})
