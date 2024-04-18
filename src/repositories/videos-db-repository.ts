import { videosCollection } from './db'

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

export const videosDbRepository = {
  getAllVideos: async () => {
    return videosCollection.find()
  },
  getVideosById: async ({ videoId }: VideoParams) => {
    if (!videoId) {
      return null
    }
    return videosCollection.findOne({ id: { $in: videoId } })
  },
  postVideos: async ({
    title,
    author,
    availableResolutions,
    minAgeRestriction,
    canBeDownloaded = false
  }: PostVideoParams) => {
    const newVideo = {
      title,
      author,
      availableResolutions,
      canBeDownloaded: Boolean(canBeDownloaded),
      minAgeRestriction: minAgeRestriction || null
    }

    await videosCollection.insertOne({ newVideo })

    return newVideo
  },

  updateVideoById: async ({ videoId, params }: UpdateVideoByIdParams) => {
    const videoById = await videosCollection.findOne({ id: { $in: videoId } })

    if (!videoById) {
      return null
    }

    const updatedVideo = {
      ...params
    }

    await videosCollection.updateOne({ id: { $in: videoId } }, { $set: updatedVideo })

    return updatedVideo
  },

  deletedVideosById: async ({ videoId }: VideoParams) => {
    const videoById = await videosCollection.findOne({ id: { $in: videoId } })

    if (!videoById) {
      return null
    }

    await videosCollection.deleteOne({ id: { $in: videoId } })

    return 204
  },

  clearAll: () => {
    return videosCollection.deleteMany({})
  }
}
