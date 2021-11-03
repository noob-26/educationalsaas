// material-ui
import { styled } from '@material-ui/styles'

// ===========================|| AUTHENTICATION 1 WRAPPER ||=========================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
  backgroundColor: `${
    theme.palette.mode === 'light' ? theme.palette.primary.light : '#073d64'
  }`,
  minHeight: '100vh',
}))

export default AuthWrapper1
