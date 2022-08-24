import { Card, Image, Text, Group, Button, createStyles, Badge } from '@mantine/core'
import { App } from '../types'

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    marginBottom: '20px',
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}))

export function ApplicationCard({ app }: { app: App }) {
  const { classes, theme } = useStyles()

  const badges = app.categories.map(badge => (
    <Badge color={theme.colorScheme === 'dark' ? 'dark' : 'gray'} key={badge}>
      {badge}
    </Badge>
  ))

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <a target="_blank" rel="noopener noreferrer" href={app.url}>
          <Image src={app.screenshots[0]} alt={app.name} height={180} />
        </a>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {app.name}
          </Text>
        </Group>
        <Text size="sm" mt="xs">
          {app.description}
          {app.founders_username && (
            <Text color="dimmed">
              by{' '}
              {app.founders_username.map((username, i) => {
                return (
                  <span key={username}>
                    <b>{username}</b>
                    {i < app.founders_username.length - 1 ? ', ' : ''}
                  </span>
                )
              })}
            </Text>
          )}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} color="dimmed">
          Categories
        </Text>
        <Group spacing={7} mt={5}>
          {badges}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Button
          component="a"
          target="_blank"
          rel="noopener noreferrer"
          href={app.url}
          radius="md"
          style={{ flex: 1 }}
        >
          Go to app
        </Button>
      </Group>
    </Card>
  )
}
