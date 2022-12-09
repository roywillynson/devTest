import {
  Box,
  Heading,
  Stack,
  Tag,
  Text,
  TagLeftIcon,
  TagLabel,
  Link,
} from '@chakra-ui/react'
import { TimeIcon } from '@chakra-ui/icons'
import DOMPurify from 'dompurify'
import dayjs from 'dayjs'

interface Props {
  link: string
  title: string
  content: string
  date: Date | string
  id: string
}

export default function AnnouncementCard(props: Props) {
  const date = dayjs(props.date)

  return (
    <Box rounded="lg" boxShadow="xl" p="8" mb={6}>
      <Stack>
        <Link href={props.link} isExternal>
          <Heading size="md">{props.title}</Heading>
        </Link>

        <Box pt={3}>
          <Tag borderRadius="full">
            <TagLeftIcon as={TimeIcon}></TagLeftIcon>
            <TagLabel>{date.toString()}</TagLabel>
          </Tag>
        </Box>

        <Box pt={3}>
          <Text
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props.content),
            }}
          ></Text>
        </Box>
      </Stack>
    </Box>
  )
}
