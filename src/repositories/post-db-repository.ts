import { postsCollection } from './db'

export const postDbRepository = {
  getAllPosts: async () => {
    return postsCollection.find()
  },
  getPostsById: async (postId: string) => {
    if (!postId) {
      return null
    }
    return postsCollection.findOne({ id: { $in: postId } })
  },
  createPost: async ({
    title,
    shortDescription,
    content,
    blogId
  }: {
    title: string
    shortDescription: string
    content: string
    blogId: string
  }) => {
    const params = {
      title,
      shortDescription,
      content,
      blogId,
      blogName: title
    }

    await postsCollection.insertOne({ params })

    return params
  },

  updatePostById: async ({
    postId,
    params
  }: {
    postId: string
    params: {
      title: string
      shortDescription: string
      content: string
      blogId: string
    }
  }) => {
    if (!postId) {
      return null
    }
    const updatedPost = {
      ...params
    }

    await postsCollection.updateOne({ id: { $in: postId } }, { $set: updatedPost })

    return updatedPost
  },

  deletedPostById: async (postId: string) => {
    if (!postId) {
      return null
    }

    await postsCollection.deleteOne({ id: { $in: postId } })

    return true
  },

  clearAll: () => {
    return postsCollection.deleteMany({})
  }
}
