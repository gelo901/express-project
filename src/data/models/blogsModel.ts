export interface Blog {
  id: string
  name: string
  description: string
  websiteUrl: string
}

export interface BlogsModel {
  list: Blog[]
}

export const BlogsModel: BlogsModel = {
  list: []
}
