import { Button, TableCell, TableRow } from '@material-ui/core'
import React from 'react'
import { AudioFragment } from '@/generated/graphql'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ChatIcon from '@material-ui/icons/Chat'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import StopIcon from '@material-ui/icons/Stop'

type AudioDetailProps = {
  row: AudioFragment
  selectedId: string
  onPlay?: (id: string) => void
  onPause?: (id: string) => void
  onSelect?: (id: string) => void
}

export const AudioDetail = ({ row, selectedId, onPlay, onPause, onSelect }: AudioDetailProps) => (
  <TableRow key={row.id} hover={true}>
    <TableCell>
      <Button>
        <StopIcon
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      </Button>
    </TableCell>
    <TableCell>
      <FiberManualRecordIcon />
    </TableCell>
    <TableCell>{row.name}</TableCell>
    <TableCell>{row.publishedAt}</TableCell>
    <TableCell>
      <Button onClick={(e) => console.log(row.id)} size="small">
        <ThumbUpIcon fontSize="small" /> {row.likeCount}
      </Button>
      <Button onClick={(e) => console.log(row.id)} size="small">
        <ShowChartIcon fontSize="small" /> 13
      </Button>
      <Button onClick={(e) => console.log(row.id)} size="small">
        <ChatIcon fontSize="small" /> 5
      </Button>
    </TableCell>
  </TableRow>
)
