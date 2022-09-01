import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cast } from '../../types'
import { useRouter } from 'next/router'
import { Cast as CastComponent } from '../../components/Cast'
import { Container, Loader, Anchor } from '@mantine/core'

import appsFile from '../../apps.json'

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3>{app?.name} updates</h3>

        <Link href={`/`} passHref>
          <Anchor component="a" size="xs" color="dimmed">
            Back to all apps
          </Anchor>
        </Link>
      </div>

      {loading && (
        <Container my="md">
          <Loader />
        </Container>
      )}

      {casts.map(cast => {
        return <CastComponent cast={cast} key={cast.merkleRoot} />
      })}
    </Container>
  )
}

export default AppUpdates
