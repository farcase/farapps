import { createStyles, Title, Container } from '@mantine/core'
import { ApplicationCard } from '../components/ApplicationCard'

import { IconInfoCircle } from '@tabler/icons'

import appsFile from '../apps.json'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

const count = appsFile.reduce((p: any, x) => {
  x.categories.map(category => {
    if (!p.hasOwnProperty(category)) {
      p[category] = 0
    }

    p[category]++
  })
  return p
}, {})

const keys = Object.keys(count)

const data = keys.map(key => {
  return {
    category: key.charAt(0).toUpperCase() + key.slice(1),
    count: count[key],
    fullMark: 150,
  }
})

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
      <Title className={classes.title}>Stats</Title>
    </div>
  )
}

const Home = () => {
  const { classes } = useStyles()

  return (
    <Container className={classes.wrapper} size={1400}>
      <HeroText />
      <Container p={0} size={800} mb={40}>
        <ResponsiveContainer width="100%" height={600}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis />
            <Radar
              name="Categories"
              dataKey="count"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Container>
    </Container>
  )
}

export default Home
