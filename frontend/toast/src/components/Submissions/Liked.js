import { useEffect, useContext, useState } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import GlobalState from '../../contexts/GlobalState';
import { fetchLikedFormSubmissions } from '../../service/mockServer';
import Submission from '../Submission/Submission';


/*
* Renders a list of Liked Submissions using data in globalState.likedSubmissions
*/
const Liked = () => {
  const [globalState, setGlobalState] = useContext(GlobalState);
  const [likedStatus, setLikedStatus] = useState('Loading liked submissions...');
  const [liked, setLiked] = useState([]);

  /*
  * Updates the liked array when the global context is updated
  */
  useEffect(() => {
    if (globalState.likedSubmissions === undefined)
      return

    let stack = [];
    globalState.likedSubmissions.forEach((item) => {
      stack.push(
        <Submission submission={item} />
      )
    });
    setLiked(stack);
  }, [globalState.likedSubmissions]);

  /*
  * Attempts to fetch the liked submissions from the server when we first load this component
  */
  useEffect(() => {
    (async () => {
      fetchLikedFormSubmissions().then((response) => {
        if (response.formSubmissions === undefined || response.formSubmissions.length === 0) {
          setLikedStatus('No liked submissions.');
          return
        }

        setGlobalState(state => ({...state, likedSubmissions: response.formSubmissions}));
      }).catch((error) => {
        console.log(error);

        if (globalState.likedSubmissions === undefined) {
          setLikedStatus('There seems to be a problem with the server. Try refreshing the page.');
        }
      });
    })();
  }, [globalState.likedSubmissions, setGlobalState]);

  return (
    <Box>
    {
      (globalState.likedSubmissions !== undefined && globalState.likedSubmissions.length) ?
        <Box>
          <Typography role="submission-header" variant="h5">
          Liked Form Submissions
          </Typography>
          <List sx={{ width: '100%', maxWidth: 360 }}>
          {
            liked
          }
          </List>
        </Box>
      :
        <Typography role="no-likes-header" variant="body1" sx={{fontStyle: 'italic'}}>
        {
          likedStatus
        }
        </Typography>
    }
    </Box>
  );
}

export default Liked;
