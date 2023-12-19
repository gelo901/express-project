export interface Post {
  id: string
  title: string
  shortDescription: string
  content: string
  blogId: string
  blogName: string
}

export interface PostModel {
  list: Post[]
}

export const PostModel: PostModel = {
  list: []
}
