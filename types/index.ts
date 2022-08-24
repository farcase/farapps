export interface App {
  name: string
  slug: string
  description: string
  url: string
  screenshots: string[]
  categories: string[]
  founders_username: string[]
  tag?: string
}

export interface Cast {
  body: {
    publishedAt: number
    data: {
      text: string
    }
  }
  merkleRoot: string
  meta: {
    reactions: {
      count: number
    }
    displayName: string
    avatar: string
    numReplyChildren: number
    replyParentUsername?: {
      address: string
      username: string
    }
  }
}
