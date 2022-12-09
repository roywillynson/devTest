import AnnouncementCard from './AnnouncementCard'

interface Props {
  announcements: Array<any>
}

export default function AnnouncementCardList({ announcements }: Props) {
  return (
    <>
      {announcements.map((announcement: any) => {
        return <AnnouncementCard key={announcement.id} {...announcement} />
      })}
    </>
  )
}
