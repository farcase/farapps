import {
  Anchor,
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
} from '@mantine/core'
import { FlattenedCast } from '../types'

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

const Cast = ({ cast }: { cast: FlattenedCast }) => {
  const { classes } = useStyles()
  return (
    <Paper withBorder radius="md" className={classes.cast} sx={{ marginBottom: '20px' }}>
      <Group>
        <Avatar src={cast.avatar_url} radius="xl" />
        <div>
          <Text size="sm">{cast.display_name}</Text>
          <Anchor href={`farcaster://casts/${cast.merkle_root}`} size="xs" color="dimmed">
            {new Date(cast.published_at).toLocaleDateString('en-US')}
          </Anchor>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>{cast.text}</TypographyStylesProvider>
    </Paper>
  )
}

export { Cast }
