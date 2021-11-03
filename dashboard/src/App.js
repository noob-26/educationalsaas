import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { ThemeProvider, useTheme } from '@material-ui/core/styles'
import {
  CssBaseline,
  StyledEngineProvider,
  createTheme,
} from '@material-ui/core'

// routing
import Routes from './routes'

// defaultTheme
import themes from './themes'

// project imports
import NavigationScroll from './layout/NavigationScroll'
import './App.css'

// ===========================|| APP ||=========================== //

const App = () => {
  const customization = useSelector((state) => state.customization)
  const theme = useTheme()
  const colorMode = localStorage.getItem('colorMode')
    ? JSON.parse(localStorage.getItem('colorMode'))
    : theme.palette.mode

  useEffect(() => {
    localStorage.setItem('colorMode', JSON.stringify(colorMode))
  }, [colorMode])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        {/* <ThemeProvider theme={theme}> */}
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
