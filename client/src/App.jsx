import { useState } from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import theme from './theme'
import { ThemeProvider } from '@mui/material/styles';
import MainRouter from './MainRouter'

function App() {
  
  return (
    <Router>
      <ThemeProvider theme={theme}>
          <MainRouter/>
      </ThemeProvider>
    </Router>
  )
}

export default App
