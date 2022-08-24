import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Cast } from '../../types'
import { useRouter } from 'next/router'
import {
  Container,
  Loader,
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
} from '@mantine/core'

import appsFile from '../../apps.json'

const useStyles = createStyles(theme => ({
  cast: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
    whiteSpace: 'pre-line',
  },
}))

interface CastProps {
  postedAt: number
  body: string
  authorName: string
  authorImage: string
}

export function Cast({ postedAt, body, authorName, authorImage }: CastProps) {
  const { classes } = useStyles()
  return (
    <Paper withBorder radius="md" className={classes.cast} sx={{ marginBottom: '20px' }}>
      <Group>
        <Avatar src={authorImage} radius="xl" />
        <div>
          <Text size="sm">{authorName}</Text>
          <Text size="xs" color="dimmed">
            {new Date(postedAt).toLocaleDateString('en-US')}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>{body}</TypographyStylesProvider>
    </Paper>
  )
}

const AppUpdates: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [casts, setCasts] = useState<Cast[]>([])

  const router = useRouter()
  const { slug } = router.query

  const app = appsFile.filter(map => {
    return map.slug == slug
  })[0]

  useEffect(() => {
    async function fetchCasts() {
      setLoading(true)

      const casts = []
      for (const founder of app.founders_username) {
        const url = `/api/username/${founder}/casts`

        const response = await fetch(url, {
          headers: {
            Accept: 'application/json',
          },
        })
        const jsonResponse: Cast[] = await response.json()

        casts.push(...jsonResponse)
      }

      const filteredCasts = casts.filter(cast => {
        return cast.body.data.text.toLowerCase().includes(app.tag?.toLowerCase() as string)
      })

      const orderedCasts = filteredCasts.sort((a, b) => {
        return b.body.publishedAt - a.body.publishedAt
      })

      setCasts(orderedCasts)
      setLoading(false)
    }

    if (slug) {
      fetchCasts()
    }
  }, [slug, app])

  return (
    <Container my="md">
      <h3>{app?.name} updates</h3>

      {loading && (
        <Container my="md">
          <Loader />
        </Container>
      )}

      {casts.map(cast => {
        return (
          <Cast
            postedAt={cast.body.publishedAt}
            body={cast.body.data.text}
            authorName={cast.meta.displayName}
            authorImage={cast.meta.avatar}
            key={cast.merkleRoot}
          />
        )
      })}
    </Container>
  )
}

export default AppUpdates
