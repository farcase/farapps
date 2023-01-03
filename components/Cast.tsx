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

  const imgurUrl = 'https://i.imgur.com/'
  let text = cast.text
  let attachment = null

  if (text.includes(imgurUrl)) {
    attachment = imgurUrl + text.split(imgurUrl)[1]
    text = text.split(imgurUrl)[0]
  }

  return (
    <Paper
      withBorder
      shadow="xs"
      radius="md"
      className={classes.cast}
      sx={{ marginBottom: '20px' }}
    >
      <Group>
        <Avatar src={cast.author_pfp_url} radius="xl" />
        <div>
          <Text size="sm">{cast.author_display_name}</Text>
          <Anchor href={`farcaster://casts/${cast.hash}`} size="xs" color="dimmed">
            {new Date(cast.published_at).toLocaleDateString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </Anchor>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        {text}
        {attachment && (
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <a href={attachment} target="_blank" rel="noreferrer">
              <img src={attachment} loading="lazy" alt="" />
            </a>
          </div>
        )}
      </TypographyStylesProvider>
    </Paper>
  )
}

export { Cast }
