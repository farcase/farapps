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
  sequence: number
  address: string
  username: string
  text: string
  reply_parent_merkle_root: string | null
  prev_merkle_root: string | null
  signature: string
  merkle_root: string
  thread_merkle_root: string
  display_name: string | null
  avatar_url: string | null
  avatar_verified: boolean
  mentions: JSON | any
  num_reply_children: number | null
  reply_parent_username: string | null
  reply_parent_address: string | null
  reactions: number | null
  recasts: number | null
  watches: number | null
  recasters: JSON | any
  deleted: boolean
  recast: boolean
}
