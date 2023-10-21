import { type Video, VideosModel } from '../data/models'

export interface PostVideoParams {
  title: string
  author: string
  canBeDownloaded?: boolean
  minAgeRestriction?: number | null
  createdAt?: string
  publicationDate?: string
  availableResolutions: string[]
}

interface VideoParams {
  videoId: number | string
}

interface UpdateVideoByIdParams {
  videoId: number | string
  params: PostVideoParams
}

export const videosService = {
  getAllVideos: () => {
    return VideosModel.list
  },
  getVideosById: ({ videoId }: VideoParams) => {
    if (!videoId || VideosModel.list.length === 0) {
      return null
    }
    return VideosModel.list.find((video: Video) => video.id === Number(videoId))
  },
  postVideos: ({
    title,
    author,
    availableResolutions,
    minAgeRestriction,
    canBeDownloaded = false
  }: PostVideoParams) => {
    let video = null

    if (VideosModel.list.length > 0) {
      video = VideosModel.list.reduce((maxVideo: Video, currentVideo: Video) => {
        if (currentVideo.id > maxVideo.id) {
          return currentVideo
        }
        return maxVideo
      })
    }

    // TODO: remove this mock when we do connect to mongoDB
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 2)

    const newVideo = {
      id: video ? video.id + 1 : 1,
      title,
      author,
      availableResolutions,
      canBeDownloaded: Boolean(canBeDownloaded),
      minAgeRestriction: minAgeRestriction || null,
      createdAt: currentDate.toISOString(),
      publicationDate: currentDate.toISOString()
    }

    VideosModel.list.push(newVideo)

    return newVideo
  },

  updateVideoById: ({ videoId, params }: UpdateVideoByIdParams) => {
    const videoById = VideosModel.list.find((video: Video) => video.id === Number(videoId))

    if (!videoById) {
      return null
    }

    const updatedVideo = {
      ...videoById,
      ...params
    }

    VideosModel.list = VideosModel.list.filter((video: Video) => video.id !== updatedVideo.id)
    VideosModel.list.push(updatedVideo)

    return updatedVideo
  },

  deletedVideosById: ({ videoId }: VideoParams) => {
    const videoById = VideosModel.list.find((video: Video) => video.id === Number(videoId))

    if (!videoById) {
      return null
    }

    VideosModel.list = VideosModel.list.filter((video: Video) => video.id !== videoById.id)

    return 204
  },

  clearAll: () => {
    VideosModel.list = []
  }
}
