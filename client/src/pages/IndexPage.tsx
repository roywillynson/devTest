import {
  Box,
  Grid,
  Container,
  Spinner,
  Alert,
  AlertIcon,
  Heading,
  Link,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import useSWR from 'swr'
import AnnouncementCardList from '../components/AnnouncementCardList'
import { ColorModeSwitcher } from '../components/ColorModeSwitcher'
import { fetcher } from '../utils/fetcher'

export default function IndexPage() {
  const { data, error } = useSWR('/api/announcement', fetcher)

  // waiting response
  if (!error && !data) {
    return <Spinner />
  }

  // error response
  if (error) {
    return (
      <Alert status="error" py={4}>
        <AlertIcon />
        Error has happened
      </Alert>
    )
  }

  return (
    <Box fontSize="lg">
      <Grid p={4}>
        <Link href="/other">
          Seacher & Filters <ExternalLinkIcon mx="2px" />
        </Link>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Grid>

      <Container maxW="container.sm">
        <Heading textAlign="center" size="xl" p={4}>
          Bimex Announcements
        </Heading>
        {!error && data && <AnnouncementCardList announcements={data.data} />}
      </Container>
    </Box>
  )
}
