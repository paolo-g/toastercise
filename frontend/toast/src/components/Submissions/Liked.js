import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Submission from '../Submission/Submission';

const Liked = ({submissions}) => {
	const [likedSubmissions, setLikedSubmissions] = React.useState([]);

	/*
	* Takes the input submissions data and creates Submission entities
	*/
	useEffect(() => {
		if (!submissions)
  		return

    setLikedSubmissions([]);

    submissions.map((item, idx) => (
      likedSubmissions.push(
  			<Submission submission={item} />
      )
    ));

    setLikedSubmissions(likedSubmissions);
	}, []);

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
