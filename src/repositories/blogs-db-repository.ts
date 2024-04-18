import { blogsCollection } from './db'

export const blogsDbRepository = {
  getAllBlogs: async () => {
    return blogsCollection.find()
  },
  getBlogsById: async (blogId: string) => {
    return blogsCollection.findOne({ id: { $in: blogId } })
  },
  createBlog: async ({ name, description, websiteUrl }: { name: string; description: string; websiteUrl: string }) => {
    const newBlog = {
      name,
      description,
      websiteUrl
    }

    await blogsCollection.insertOne({ newBlog })

    return newBlog
  },

  updateVideoById: async ({
    blogId,
    params
  }: {
    blogId: string
    params: { name: string; description: string; websiteUrl: string }
  }) => {
    if (!blogId) {
      return null
    }

    const updatedBlog = {
      ...params
    }

    await blogsCollection.updateOne({ id: { $in: blogId } }, { $set: updatedBlog })

    return updatedBlog
  },

  deletedBlogById: async (blogId: string) => {
    if (!blogId) {
      return null
    }

    await blogsCollection.deleteOne({ id: { $in: blogId } })

    return true
  },

  clearAll: async () => {
    return blogsCollection.deleteMany({})
  }
}
