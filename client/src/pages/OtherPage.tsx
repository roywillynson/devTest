import useSWR from 'swr'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  HStack,
  InputGroup,
  Input,
  InputLeftElement,
  Container,
  Grid,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { ColorModeSwitcher } from '../components/ColorModeSwitcher'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { fetcher } from '../utils/fetcher'
import dayjs from 'dayjs'

//const websocket = new WebSocket('')
export default function OtherPage() {
  const { data, error } = useSWR('/api/announcement', fetcher)
  const [search, setSearch] = useState('')
  const [dataFiltered, setDataFiltered] = useState([])

  const filterAnnouncements = useCallback(() => {
    if (!error && data) {
      const { data: announcements } = data
      const searchLower = search.toLowerCase()

      setDataFiltered(
        !!search
          ? announcements.filter(
              (x: any) =>
                String(x.id).includes(search) ||
                x.title.toLowerCase().includes(searchLower) ||
                x.date.toLowerCase().includes(searchLower.toLowerCase())
            )
          : announcements
      )
    }
  }, [data, error, search])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event

    setSearch(value)

    // filter data
    filterAnnouncements()
  }

  useEffect(() => {
    filterAnnouncements()
  }, [data, error, filterAnnouncements])

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
    <>
      <Grid p={4}>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Grid>

      <Container maxW="container.sm">
        <HStack>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleChange}
            />
          </InputGroup>
        </HStack>

        <TableContainer py={6}>
          <Table variant="simple">
            <TableCaption>Announcements</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th textTransform="uppercase">Title</Th>
                <Th textTransform="uppercase">Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataFiltered.map((announcement: any) => (
                <Tr key={announcement.id}>
                  <Td>{announcement.id}</Td>
                  <Td>{announcement.title}</Td>
                  <Td>{dayjs(announcement.date).toString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}
