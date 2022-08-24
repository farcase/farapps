import Link from 'next/link'
import Image from 'next/image'
import Logo from '../public/logo.png'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import {
  createStyles,
  Title,
  Text,
  Container,
  Grid,
  TextInput,
  Tooltip,
  Center,
  Group,
  Anchor,
} from '@mantine/core'
import { ApplicationCard } from '../components/ApplicationCard'

import { IconInfoCircle } from '@tabler/icons'

import appsFile from '../apps.json'

const useStyles = createStyles(theme => ({
  wrapper: {
    position: 'relative',
    paddingTop: 120,

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  dots: {
    position: 'absolute',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none',
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
  },

  description: {
    textAlign: 'center',
    marginBottom: 40,

    '@media (max-width: 520px)': {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      height: 42,
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  innerFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}))

function HeroText() {
  const { classes } = useStyles()

  return (
    <div className={classes.inner}>
      <Title className={classes.title}>
        The best{' '}
        <Text component="span" className={classes.highlight} inherit>
          Farcaster
        </Text>{' '}
        apps
      </Title>

      <Container p={0} size={600}>
        <Text size="lg" color="dimmed" className={classes.description}>
          Highlighting the best apps and builders on the Farcaster community.
        </Text>
      </Container>
    </div>
  )
}

const Home = () => {
  const { classes } = useStyles()

  const router = useRouter()
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    const { query } = router.query
    setSearch((query as string) || '')
  }, [router.isReady, router.query])

  const filteredApps = appsFile.filter(app => {
    return (
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.description.toLowerCase().includes(search.toLowerCase()) ||
      app.founders_username.join(' ').toLowerCase().includes(search.toLowerCase()) ||
      app.categories.join(' ').toLowerCase().includes(search.toLowerCase())
    )
  })

  const rightSection = (
    <Tooltip
      label="Search by app, description, founder and categories"
      position="top-end"
      withArrow
      transition="pop-bottom-right"
    >
      <Text color="dimmed" sx={{ cursor: 'help' }}>
        <Center>
          <IconInfoCircle size={18} stroke={1.5} />
        </Center>
      </Text>
    </Tooltip>
  )

  return (
    <Container className={classes.wrapper} size={1400}>
      <HeroText />
      <Container p={0} size={600} mb={40}>
        <TextInput
          rightSection={rightSection}
          placeholder="Search for your favorite apps"
          onChange={event => {
            setSearch(event.currentTarget.value)
            router.push(
              {
                query: { query: event.currentTarget.value },
              },
              undefined,
              { shallow: true },
            )
          }}
          value={search}
        />
      </Container>
      <Grid gutter="xl">
        {filteredApps.map(app => {
          return (
            <Grid.Col sm={6} md={4} key={app.name}>
              <ApplicationCard app={app} />
            </Grid.Col>
          )
        })}
      </Grid>

      <div className={classes.footer}>
        <div className={classes.innerFooter}>
          <Link href="/">
            <a>
              <div style={{ width: '180px', height: '70px', position: 'relative' }}>
                <Image src={Logo} alt="Logo" layout="fill" objectFit="contain" />
              </div>
            </a>
          </Link>
          <Group className={classes.links}>
            <Anchor color="dimmed" href="https://github.com/farcase/farapps#apps" target="_blank">
              How to add an app
            </Anchor>
            <Anchor color="dimmed" href="https://github.com/farcase/farapps" target="_blank">
              Github
            </Anchor>
          </Group>
        </div>
      </div>
    </Container>
  )
}

export default Home
