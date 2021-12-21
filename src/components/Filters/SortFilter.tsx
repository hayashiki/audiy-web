import { Button, MenuItem, MenuList, Popover } from '@material-ui/core'
import SortIcon from '@material-ui/icons/SortTwoTone'
import { useRouter } from 'next/router'
import { ReactEventHandler, useState } from 'react'

import { AudioOrder } from '@/generated/graphql'

type FilterOption<V> = {
  title: string
  values: V
}

const options: FilterOption<AudioOrder>[] = [
  {
    title: 'Newest',
    values: AudioOrder.PublishedAtDesc,
  },
  {
    title: 'Oldest',
    values: AudioOrder.PublishedAtAsc,
  },
]

const getInitialSort = (val: string | string[] | undefined) => {
  const opt = options.find((t) => t.values.toString() == val)
  return opt ? opt.title : 'Sort'
}

const SortFilter = () => {
  const router = useRouter()
  const filter = router.query.filter as string
  const sort = router.query.sort as string
  const [title, setTitle] = useState(getInitialSort(sort))

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpen: ReactEventHandler<HTMLElement> = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  const goto = (title: string, val: string) => () => {
    setTitle(title)
    let q = { sort: val }
    if (filter) {
      q = Object.assign(q, { filter: filter })
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
        <MenuItem key={d.values} dense color="inherit" onClick={goto(d.title, d.values)}>
          {d.title}
        </MenuItem>
      ),
  )

  return (
    <>
      <Button variant="text" size="small" onClick={handleOpen} endIcon={<SortIcon />}>
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

export default SortFilter
