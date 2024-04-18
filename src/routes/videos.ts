import { type Response, type Request, Router } from 'express'
import { videosRepository } from '../repositories'
import {
  validateAuthor,
  validateAvailableResolutions,
  validateCanBeDownloaded,
  validateMinAgeRestriction,
  validatePublicationDate,
  validateTitle
} from '../middleware/validateVideoFields'
import { STATUS_CODES } from '../constants/status-codes'
import { checkValidateFieldsMiddleware } from '../middleware/check-validate-fields-middleware/checkValidateFieldsMiddleware'

export const videosRouter = Router({})

videosRouter.get('/', (_: Request, res: Response) => {
  const videos = videosRepository.getAllVideos()
  res.status(STATUS_CODES.OK)
  res.send(videos)
})

videosRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params

  const video = videosRepository.getVideosById({ videoId: Number(id) })

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

    const createdVideo = videosRepository.postVideos({
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

    const updatedVideo = videosRepository.updateVideoById({
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

  const result = videosRepository.deletedVideosById({ videoId })

  if (!result) {
    res.status(STATUS_CODES.NOT_FOUND)
    res.send()
  }

  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})
