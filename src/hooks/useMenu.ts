import { useCallback, useState } from 'react'

type UseMenu = () => [
  null | HTMLElement,
  boolean,
  (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  () => void,
]

export const useMenu: UseMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = useCallback(({ currentTarget }: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(currentTarget)
  }, [])

  const close = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return [anchorEl, Boolean(anchorEl), open, close]
}
