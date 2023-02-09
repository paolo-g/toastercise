import React from 'react';
import {useState} from 'react';
import Container from '@mui/material/Container';

import GlobalState from './contexts/GlobalState';
import Header from './Header';
import Content from './Content';

function App() {
  const [globalState, setGlobalState] = useState({});

  return (
    <GlobalState.Provider value={[globalState, setGlobalState]}>
      <Header />
      <Container>
        <Content />
      </Container>
    </GlobalState.Provider>
  );
}

export default App;
