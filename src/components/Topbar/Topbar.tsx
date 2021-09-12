import { AppBar, Box, IconButton, Toolbar, makeStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useRouter } from 'next/router'
import React, { MouseEvent, useState } from 'react'

import useGoogleAuth from '@/hooks/useLogin'
import { useMenu } from '@/hooks/useMenu'
import { UserInfo } from '@/types/userInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    // TODO: 黒に近い色にしたくもある
    // backgroundColor: 'rgb(51, 51, 51)',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  userInfoContainer: {
    display: 'flex',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: theme.spacing(2),
  },
  userCaption: {
    marginLeft: theme.spacing(2),
  },
  userButton: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
  },
  userMenuIcon: {
    marginRight: theme.spacing(1),
  },
}))

export type TopBarProps = {
  userInfo: UserInfo
}

const TopBar = ({ userInfo }: TopBarProps): JSX.Element => {
  const classes = useStyles()
  const [anchorEl, menuOpen, openMenu, closeMenu] = useMenu()

  const { signOut } = useGoogleAuth()
  const router = useRouter()
  const signOutProcess = async () => {
    await signOut()
    await router.push('/login')
  }
  const userInfoView = (
    <div className={classes.userInfoContainer}>
      <div className={classes.userInfo}>
        <Avatar className={classes.avatar} src={userInfo.imageUrl} />
        <div className={classes.userCaption}>
          <Typography variant="body1">{userInfo.name}</Typography>
          <Typography variant="caption">{userInfo.email}</Typography>
        </div>
      </div>
      <IconButton
        // className={classes.userButton}
        aria-label="menu"
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={openMenu}
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Menu id="user-menu" anchorEl={anchorEl} keepMounted open={menuOpen} onClose={closeMenu}>
        <MenuItem onClick={closeMenu}>
          <AccountCircleIcon className={classes.userMenuIcon} />
          My Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenu()
            signOutProcess()
          }}
        >
          <ExitToAppIcon className={classes.userMenuIcon} /> Logout
        </MenuItem>
      </Menu>
    </div>
  )

  return (
    <AppBar className={classes.root} elevation={0} color="inherit">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Audiy
        </Typography>
        <span style={{ flex: 1 }} />
        {userInfoView}
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
