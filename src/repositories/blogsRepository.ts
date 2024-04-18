import { Blog, BlogsModel } from '../data/models'

export const blogsRepository = {
  getAllBlogs: () => {
    return BlogsModel.list
  },
  getBlogsById: (blogId: string) => {
    if (!blogId || BlogsModel.list.length === 0) {
      return null
    }
    return BlogsModel.list.find((blog: Blog) => blog.id === blogId)
  },
  createBlog: ({ name, description, websiteUrl }: { name: string; description: string; websiteUrl: string }) => {
    let blog = null
    if (BlogsModel.list.length > 0) {
      blog = BlogsModel.list.reduce((maxBlog: Blog, currentBlog: Blog): Blog => {
        if (currentBlog.id > maxBlog.id) {
          return currentBlog
        }
        return maxBlog
      })
    }
    const newBlog = {
      id: blog ? blog.id + 1 : '1',
      name,
      description,
      websiteUrl
    }

    BlogsModel.list.push({ ...newBlog, id: newBlog.id.toString() })

    return newBlog
  },

  updateVideoById: ({
    blogId,
    params
  }: {
    blogId: string
    params: { name: string; description: string; websiteUrl: string }
  }) => {
    const blogById = BlogsModel.list.find((blog: Blog) => blog.id === blogId)

    if (!blogById) {
      return null
    }

    const updatedBlog = {
      ...blogById,
      ...params
    }

    BlogsModel.list = BlogsModel.list.filter((blog: Blog) => blog.id !== updatedBlog.id)
    BlogsModel.list.push(updatedBlog)

    return updatedBlog
  },

  deletedBlogById: (blogId: string) => {
    const blogById = BlogsModel.list.find((blog: Blog) => blog.id === blogId)

    if (!blogById) {
      return null
    }

    BlogsModel.list = BlogsModel.list.filter((blog: Blog) => blog.id !== blogById.id)

    return true
  },

  clearAll: () => {
    BlogsModel.list = []
  }
}
