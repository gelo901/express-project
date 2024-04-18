import { Post, PostModel } from '../data/models'

export const postRepository = {
  getAllPosts: () => {
    return PostModel.list
  },
  getPostsById: (postId: string) => {
    if (!postId || PostModel.list.length === 0) {
      return null
    }
    return PostModel.list.find((post: Post) => post.id === postId)
  },
  createPost: ({
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
    let post = null
    if (PostModel.list.length > 0) {
      post = PostModel.list.reduce((maxBlog: Post, currentBlog: Post): Post => {
        if (currentBlog.id > maxBlog.id) {
          return currentBlog
        }
        return maxBlog
      })
    }
    const newPost = {
      id: post ? post.id + 1 : '1',
      title,
      shortDescription,
      content,
      blogId,
      blogName: title
    }

    PostModel.list.push({ ...newPost, id: newPost.id.toString() })

    return newPost
  },

  updatePostById: ({
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
    const postById = PostModel.list.find((post: Post) => post.id === postId)

    if (!postById) {
      return null
    }

    const updatedPost = {
      ...postById,
      ...params
    }

    PostModel.list = PostModel.list.filter((post: Post) => post.id !== updatedPost.id)
    PostModel.list.push(updatedPost)

    return updatedPost
  },

  deletedPostById: (postId: string) => {
    const postById = PostModel.list.find((post: Post) => post.id === postId)

    if (!postById) {
      return null
    }

    PostModel.list = PostModel.list.filter((post: Post) => post.id !== postById.id)

    return true
  },

  clearAll: () => {
    PostModel.list = []
  }
}
