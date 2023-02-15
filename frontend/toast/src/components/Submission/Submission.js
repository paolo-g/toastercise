import { useState } from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './Submission.scss';

const avatarColor = red[400];
const submissionTheme = createTheme({
  palette: {
    fav: {
      main: avatarColor,
    },
  },
});

/*
* Renders a Submission object
*/
const Submission = ({submission}) => {
  const [name] = useState(`${submission.data.firstName} ${submission.data.lastName}`);
  const [email] = useState(`${submission.data.email}`);

  return (
    <ThemeProvider theme={submissionTheme}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FavoriteIcon color="fav"/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText role="submission" primary={name} secondary={`${email}`} />
      </ListItem>
    </ThemeProvider>
  );
}

export default Submission;
