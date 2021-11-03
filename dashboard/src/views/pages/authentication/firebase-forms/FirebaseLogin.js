import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Snackbar,
} from '@material-ui/core'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

// project imports
import useScriptRef from 'hooks/useScriptRef'
import AnimateButton from 'ui-component/extended/AnimateButton'

// assets
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import CloseIcon from '@material-ui/icons/Close'
import Google from 'assets/images/icons/social-google.svg'
// import { useNavigate } from "react-router";
import { auth } from '../../../../Firebase/index'
import { WindowSharp } from '@material-ui/icons'
import { isWindows } from 'react-device-detect'

// style constant
const useStyles = makeStyles((theme) => ({
  redButton: {
    fontSize: '1rem',
    fontWeight: 500,
    backgroundColor: theme.palette.grey[50],
    border: '1px solid',
    borderColor: theme.palette.grey[100],
    color: theme.palette.grey[700],
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
  },
  signDivider: {
    flexGrow: 1,
  },
  signText: {
    cursor: 'unset',
    margin: theme.spacing(2),
    padding: '5px 56px',
    borderColor: `${theme.palette.grey[100]} !important`,
    color: `${theme.palette.grey[900]}!important`,
    fontWeight: 500,
  },
  loginIcon: {
    marginRight: '16px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '8px',
    },
  },
  loginInput: {
    ...theme.typography.customInput,
  },
  input: {
    backgroundColor: `${
      theme.palette.mode === 'light' ? '#fff !important' : '#1a223f'
    }`,
  },
}))

//= ===========================|| FIREBASE - LOGIN ||============================//

const FirebaseLogin = (props, { ...others }) => {
  const classes = useStyles()
  //   const navigate = useNavigate();
  const theme = useTheme()

  const customization = useSelector((state) => state.customization)
  const scriptedRef = useScriptRef()
  const [checked, setChecked] = React.useState(true)

  const googleHandler = async () => {
    console.error('Login')
  }

  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const initialState = { email: '', password: '' }
  const [formData, setFormData] = useState(initialState)
  const handleLogin = (e) => {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(() => {
        auth.onAuthStateChanged(async function (user) {
          if (user) {
            sessionStorage.setItem('userName', user.displayName)
            sessionStorage.setItem('userEmail', user.email)
            sessionStorage.setItem('userId', user.uid)
            // navigate("", { replace: true });
            window.location.href = '/dashboard/default'
          }
        })
      })
      .catch(function (error) {
        handleClickSnack()
        setMessage(error.message)
      })
  }
  const [message, setMessage] = useState('')
  const [openSnack, setOpenSnack] = useState(false)
  const handleClickSnack = () => {
    setOpenSnack(true)
  }
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnack(false)
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleCloseSnack}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
      <Grid container direction='column' justifyContent='center' spacing={2}>
        <Grid
          item
          xs={12}
          container
          alignItems='center'
          justifyContent='center'
        >
          <Box
            sx={{
              mb: 2,
            }}
          >
            <Typography variant='subtitle1'>
              Sign in with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <FormControl
        style={{ backgroundColor: 'red !important' }}
        fullWidth
        className={classes.loginInput}
      >
        <InputLabel htmlFor='outlined-adornment-email-login'>
          Email Address
        </InputLabel>
        <OutlinedInput
          style={{ backgroundColor: 'red !important' }}
          id='outlined-adornment-email-login'
          type='email'
          name='email'
          label='Email Address'
          value={formData.email}
          inputProps={{
            className: classes.input,
          }}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </FormControl>

      <FormControl fullWidth className={classes.loginInput}>
        <InputLabel htmlFor='outlined-adornment-password-login'>
          Password
        </InputLabel>
        <OutlinedInput
          sx={{
            backgroundColor: `${
              theme.palette.mode === 'light' ? '#fff !important' : '#1a223f'
            }`,
          }}
          id='outlined-adornment-password-login'
          type={showPassword ? 'text' : 'password'}
          name='password'
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label='Password'
          inputProps={{
            className: classes.input,
          }}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </FormControl>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        spacing={1}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
              name='checked'
              color='primary'
            />
          }
          label='Remember me'
        />
        <Typography
          variant='subtitle1'
          component={Link}
          to='/pages/forgot-password/forgot-password3'
          color='secondary'
          sx={{ textDecoration: 'none' }}
        >
          Forgot Password?
        </Typography>
      </Stack>

      <Box
        sx={{
          mt: 2,
        }}
      >
        <AnimateButton>
          <Button
            disableElevation
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            color='secondary'
            onClick={handleLogin}
          >
            Sign in
          </Button>
        </AnimateButton>
      </Box>

      <Grid item xs={12}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Divider className={classes.signDivider} orientation='horizontal' />
          <AnimateButton>
            <Button
              variant='outlined'
              className={classes.signText}
              sx={{ borderRadius: `${customization.borderRadius}px` }}
              disableRipple
              disabled
            >
              OR
            </Button>
          </AnimateButton>
          <Divider className={classes.signDivider} orientation='horizontal' />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <AnimateButton>
          <Button
            style={{
              backgroundColor: `${
                theme.palette.mode === 'light' ? '#fff !important' : '#1a223f'
              }`,
            }}
            disableElevation
            fullWidth
            className={classes.redButton}
            onClick={googleHandler}
            size='large'
          >
            <img
              src={Google}
              alt='google'
              width='20px'
              className={classes.loginIcon}
            />{' '}
            Sign in with Google
          </Button>
        </AnimateButton>
      </Grid>
      <Grid item xs={12}>
        <AnimateButton>
          <Button
            disableElevation
            fullWidth
            className={classes.redButton}
            onClick={googleHandler}
            size='large'
            style={{
              marginTop: '10px',
              backgroundColor: `${
                theme.palette.mode === 'light' ? '#fff !important' : '#1a223f'
              }`,
            }}
            variant='contained'
          >
            <img
              src='https://img.icons8.com/fluency/50/000000/facebook-new.png'
              alt='facebook'
              width='20px'
              className={classes.loginIcon}
            />
            Sign in with Facebook
          </Button>
        </AnimateButton>
      </Grid>
    </>
  )
}

export default FirebaseLogin
