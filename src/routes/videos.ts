import { type Response, type Request, Router } from 'express'
import { videosDbRepository } from '../repositories'
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

videosRouter.get('/', async (_: Request, res: Response) => {
  const videos = await videosDbRepository.getAllVideos()
  res.status(STATUS_CODES.OK)
  res.send(videos)
})

videosRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  const video = await videosDbRepository.getVideosById({ videoId: Number(id) })

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
  async (req: Request, res: Response) => {
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction } = req.body || {}

    const createdVideo = await videosDbRepository.postVideos({
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
  async (req: Request, res: Response) => {
    const { id: videoId } = req.params

    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body
    const [updatedVideo] = await Promise.all([
      videosDbRepository.updateVideoById({
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
    ])

    if (!updatedVideo) {
      res.status(STATUS_CODES.NOT_FOUND)
      res.send()
    }

    res.status(STATUS_CODES.NO_CONTENTS)
    res.send()
  }
)

videosRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id: videoId } = req.params

  const result = await videosDbRepository.deletedVideosById({ videoId })

  if (!result) {
    res.status(STATUS_CODES.NOT_FOUND)
    res.send()
  }

  res.status(STATUS_CODES.NO_CONTENTS)
  res.send()
})
