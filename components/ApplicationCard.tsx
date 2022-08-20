import { Card, Image, Text, Group, Button, createStyles } from '@mantine/core'
import { url } from 'inspector'
import Link from 'next/link'

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
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

interface BadgeCardProps {
  image: string
  title: string
  description: string
  url: string
}

export function ApplicationCard({ image, title, description, url }: BadgeCardProps) {
  const { classes, theme } = useStyles()

  //   const features = badges.map(badge => (
  //     <Badge
  //       color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
  //       key={badge.label}
  //       leftSection={badge.emoji}
  //     >
  //       {badge.label}
  //     </Badge>
  //   ))

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {title}
          </Text>
        </Group>
        <Text size="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button
          component="a"
          target="_blank"
          rel="noopener noreferrer"
          href={url}
          radius="md"
          style={{ flex: 1 }}
        >
          Go to app
        </Button>
      </Group>
    </Card>
  )
}
