import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import './Liked.scss';
import Submission from '../Submission/Submission';

const Liked = ({submissions}) => {
	const [likedSubmissions, setLikedSubmissions] = React.useState([]);

	/*
	* Takes the input submissions data and creates Submission entities
	*/
	useEffect(() => {
    if (submissions === undefined || submissions.length == 0)
      return

    let stack = [];
    submissions.forEach((item) => {
      stack.push(
        <Submission submission={item} />
      )
    });
    setLikedSubmissions(stack);
	}, [submissions]);

  return (
    <Box>
			<Typography role="submission-header" data-testid="liked-heading" variant="h3">
				Liked Form Submissions
			</Typography>
			{
				likedSubmissions
			}
		</Box>
  );
}

export default Liked;
