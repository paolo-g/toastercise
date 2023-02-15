import React from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import NewSubmissionButton from './components/Submission/NewSubmissionButton';

const headerTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    headerBar: {
      main: '#4535b0',
    },
  },
});

export default function Header() {
  return (
    <ThemeProvider theme={headerTheme}>
      <Box sx={{flexGrow: 1}}>
        <AppBar
          position="static"
          color="headerBar"
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{marginRight: 2}}
            >
              <MenuIcon color="primary" />
            </IconButton>
            <Typography
              color="common.white"
              variant="h6"
              sx={{flexGrow: 1}}
            >
              Toastercise
            </Typography>
            <NewSubmissionButton />
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
