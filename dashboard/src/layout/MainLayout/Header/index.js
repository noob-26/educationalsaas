import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'

// redux import
import { useDispatch } from 'react-redux'
import { SET_THEME_MODE } from 'store/actions'

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles'
import { Avatar, Box, ButtonBase, Button, IconButton } from '@material-ui/core'
import { Brightness4, Brightness7 } from '@material-ui/icons'

// project imports
import LogoSection from '../LogoSection'
import SearchSection from './SearchSection'
import ProfileSection from './ProfileSection'
import NotificationSection from './NotificationSection'

// assets
import { IconMenu2 } from '@tabler/icons'

// style constant
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  headerAvatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    transition: 'all .2s ease-in-out',
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
      background: theme.palette.secondary.dark,
      color: theme.palette.secondary.light,
    },
  },
  boxContainer: {
    width: '228px',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
  },
}))

// ===========================|| MAIN NAVBAR / HEADER ||=========================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()

  const [mode, setMode] = useState(theme.palette.mode)
  const toggleColorMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    dispatch({ type: SET_THEME_MODE, mode })
  }, [dispatch, mode])

  return (
    <>
      {/* logo & toggler button */}
      <div className={classes.boxContainer}>
        <Box
          component='span'
          sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
        >
          Evanalin
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant='rounded'
            className={classes.headerAvatar}
            onClick={handleLeftDrawerToggle}
            color='inherit'
          >
            <IconMenu2 stroke={1.5} size='1.3rem' />
          </Avatar>
        </ButtonBase>
      </div>

      {/* header search */}
      <SearchSection theme='light' />
      <div className={classes.grow} />
      <div className={classes.grow} />

      {/* toggle between light and dark mode */}
      <IconButton sx={{ mr: 1 }} onClick={toggleColorMode} color='inherit'>
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>

      {/* notification & profile */}
      <Button variant='outlined'>Upgrade Plan</Button>
      <Button style={{ marginLeft: '20px' }} variant='contained'>
        Invite People
      </Button>

      <NotificationSection />
      <ProfileSection />
    </>
  )
}

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
}

export default Header
