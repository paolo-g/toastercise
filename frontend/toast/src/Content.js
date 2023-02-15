import Box from '@mui/material/Box';

import Liked from './components/Submissions/Liked';
import NewSubmissionToast from './components/Submission/NewSubmissionToast';

/*
* Main content body
*
* This being an exercise, I'm skippng the addition of a router + containers.
*/
export default function Content() {
  return (
    <Box sx={{marginTop: 3}}>
      <Liked />
      <NewSubmissionToast />
    </Box>
  );
}
