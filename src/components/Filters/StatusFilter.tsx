import { Button, MenuItem, MenuList, Popover } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList'
import { useRouter } from 'next/router'
import { ReactEventHandler, useState } from 'react'

import { FeedEvent } from '@/generated/graphql'

type FilterOption<V> = {
  title: string
  values: V
}

const options: FilterOption<FeedEvent>[] = [
  {
    title: 'Unplayed',
    values: FeedEvent.Unplayed,
  },
  {
    title: 'Liked',
    values: FeedEvent.Liked,
  },
  {
    title: 'Bookmark',
    values: FeedEvent.Stared,
  },
  {
    title: 'Clear(未実装)',
    values: FeedEvent.All,
  },
]

const getInitialFilter = (val: string | string[] | undefined) => {
  const opt = options.find((t) => t.values.toString() == val)
  return opt ? opt.title : 'Filter'
}

const StatusFilter = () => {
  const router = useRouter()
  const filter = router.query.filter as string
  const sort = router.query.sort as string
  const [title, setTitle] = useState(getInitialFilter(filter))
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpen: ReactEventHandler<HTMLElement> = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  const goto = (val: string) => () => {
    setTitle(title)
    let q = { filter: val }
    if (sort) {
      q = Object.assign(q, { sort: sort })
    }
    router
      .push({
        pathname: '/',
        query: q,
      })
      .then(() => handleClose())
  }

  const items = options.map(
    (d) =>
      d && (
        <MenuItem key={d.values} dense color="inherit" onClick={goto(d.values)}>
          {d.title}
        </MenuItem>
      ),
  )

  return (
    <>
      <Button variant="text" size="small" onClick={handleOpen} endIcon={<FilterListIcon />}>
        Filter
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

export default StatusFilter
