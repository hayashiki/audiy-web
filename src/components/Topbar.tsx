import React, { MouseEvent, useState } from 'react'
import { AppBar, Box, IconButton, Toolbar, makeStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useMenu } from '@/hooks/useMenu'

const useStyles = makeStyles((theme) => ({
  root: {
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

const TopBar = (): JSX.Element => {
  const classes = useStyles()
  const [anchorEl, menuOpen, openMenu, closeMenu] = useMenu()

  const viewer = {
    name: 'hoge',
    photo: 'https://avatars.githubusercontent.com/u/3266316?s=60&v=4',
    email: 'email',
  }

  const initials = 'https://avatars.githubusercontent.com/u/3266316?s=60&v=4'

  const userInfo = (
    <div className={classes.userInfoContainer}>
      <div className={classes.userInfo}>
        <Avatar className={classes.avatar} src={viewer.photo}>
          {!viewer.photo && initials}
        </Avatar>
        <div className={classes.userCaption}>
          <Typography variant="body1">{viewer.name}</Typography>
          <Typography variant="caption">{viewer.email}</Typography>
        </div>
      </div>
      <IconButton
        className={classes.userButton}
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
            window.location.href = '/auth/logout'
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
        <Box flexGrow={1} />
        {userInfo}
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
