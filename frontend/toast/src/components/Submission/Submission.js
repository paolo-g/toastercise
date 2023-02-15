import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import './Submission.scss';

/*
* Renders a Submission object
*/
const Submission = ({submission}) => {
  return (
    <Box sx={{marginTop: 1}}>
    	<Typography role="submission" variant="body1" sx={{fontStyle: 'bold', marginTop: 1}}>
			{
				`${submission.data.firstName} ${submission.data.lastName} ${submission.data.email}`
			}
			</Typography>
		</Box>
  );
}

export default Submission;
