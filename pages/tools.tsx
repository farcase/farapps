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
  Table,
  ActionIcon,
  Badge,
} from '@mantine/core'

import { IconInfoCircle, IconBrandGithub } from '@tabler/icons'

import toolsFile from '../tools.json'

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
        tools
      </Title>

      <Container p={0} size={600}>
        <Text size="lg" color="dimmed" className={classes.description}>
          Highlighting the best tools and builders on the Farcaster community.
          <br />
          Looking for apps built with these tools?{' '}
          <Link href="/" passHref>
            <Anchor component="a">We've got you covered.</Anchor>
          </Link>
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

  const filteredTools = toolsFile.filter(tool => {
    return (
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      tool.founders_username.join(' ').toLowerCase().includes(search.toLowerCase()) ||
      tool.categories.join(' ').toLowerCase().includes(search.toLowerCase())
    )
  })

  const rightSection = (
    <Tooltip
      label="Search by tool, description, founder and categories"
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

  const badges = (tool: { categories: string[] }) => {
    return tool.categories.map(badge => (
      <Badge key={badge} sx={{ marginRight: '10px' }}>
        {badge}
      </Badge>
    ))
  }

  return (
    <Container className={classes.wrapper} size={1400}>
      <HeroText />
      <Container p={0} size={600} mb={40}>
        <TextInput
          rightSection={rightSection}
          placeholder="Search for your favorite tools"
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
        <Grid.Col span={12}>
          <Table verticalSpacing="md">
            <tbody>
              {filteredTools.map(item => {
                return (
                  <tr key={item.slug}>
                    <td>
                      <Group spacing="sm">
                        <div>
                          <Text size="sm" weight={500}>
                            <Anchor href={item.url} target="_blank">
                              {item.name}
                            </Anchor>
                          </Text>
                          <Text color="dimmed" size="xs">
                            by {item.founders_username.join(', ')}
                          </Text>
                        </div>
                      </Group>
                    </td>
                    <td>
                      <Text size="sm">{item.description}</Text>
                    </td>
                    <td style={{ minWidth: '200px' }}>
                      <Text size="sm">{badges(item)}</Text>
                    </td>

                    <td>
                      <Group spacing={0} position="right">
                        <ActionIcon component="a" href={item.url} target="_blank">
                          <IconBrandGithub size={16} stroke={1.5} />
                        </ActionIcon>
                      </Group>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Grid.Col>
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
