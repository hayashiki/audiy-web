import { Button, MenuItem, MenuList, Popover } from '@material-ui/core'
import { ReactEventHandler, useState } from 'react'

import { Keys } from '@/hooks/useAudioControls'
import { getStorageData } from '@/lib/localStorage'

type FilterOption<V> = {
  title: string
  values: V
}

const options: FilterOption<number>[] = [
  {
    title: '1.0x',
    values: 1.0,
  },
  {
    title: '1.2x',
    values: 1.2,
  },
  {
    title: '1.5x',
    values: 1.5,
  },
  {
    title: '2.0x',
    values: 2.0,
  },
]

type PlaybackRateMeterProps = {
  changeRate: (val: number) => void
}

const getStorageDataDecorate = () => {
  const val = getStorageData(Keys.Rate, 1.0)
  const valInt = val().toFixed(1)
  return `${valInt}x`
}

const PlaybackRateMeter = ({ changeRate }: PlaybackRateMeterProps) => {
  getStorageDataDecorate()
  const [title, setTitle] = useState(getStorageDataDecorate())
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpen: ReactEventHandler<HTMLElement> = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  const onSelect = (title: string, val: number) => () => {
    setTitle(title)
    changeRate(val)
    handleClose()
  }

  const items = options.map(
    (d) =>
      d && (
        <MenuItem key={d.values} dense color="inherit" onClick={onSelect(d.title, d.values)}>
          {d.title}
        </MenuItem>
      ),
  )

  return (
    <>
      <Button variant="text" size="small" onClick={handleOpen}>
        {title}
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuList>{items}</MenuList>
      </Popover>
    </>
  )
}

export default PlaybackRateMeter
