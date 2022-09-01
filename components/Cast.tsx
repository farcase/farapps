import {
  Anchor,
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
} from '@mantine/core'
import { Cast } from '../types'

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

const Cast = ({ cast }: { cast: Cast }) => {
  const { classes } = useStyles()
  return (
    <Paper withBorder radius="md" className={classes.cast} sx={{ marginBottom: '20px' }}>
      <Group>
        <Avatar src={cast.meta.avatar} radius="xl" />
        <div>
          <Text size="sm">{cast.meta.displayName}</Text>
          <Anchor href={`farcaster://casts/${cast.merkleRoot}`} size="xs" color="dimmed">
            {new Date(cast.body.publishedAt).toLocaleDateString('en-US')}
          </Anchor>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        {cast.body.data.text}
      </TypographyStylesProvider>
    </Paper>
  )
}

export { Cast }
