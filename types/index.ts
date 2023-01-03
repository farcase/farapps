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

export interface FlattenedCast {
  type: 'text-short'
  published_at: Date
  author_username: string
  text: string
  thread_hash: string | null
  parent_hash: string | null
  hash: string
  author_fid: string | null
  author_display_name: string | null
  author_pfp_url: string | null
  author_pfp_verified: boolean
  mentions: JSON | any
  replies_count: number | null
  parent_author_username: string | null
  parent_author_fid: string | null
  reactions_count: number | null
  recasts_count: number | null
  watches_count: number | null
  deleted: boolean
  recast: boolean
}
