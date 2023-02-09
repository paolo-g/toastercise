import React, {useEffect, useContext, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import GlobalState from './contexts/GlobalState';
import Liked from './components/Submissions/Liked';
import { onMessage, fetchLikedFormSubmissions, saveLikedFormSubmission } from './service/mockServer';

export default function Content() {
  // Global context for storing liked submissions
  const [globalState, setGlobalState] = useContext(GlobalState);

  // Flag whether we have any liked submissions
  const [hasLikedSubmissions, setHasLikedSubmissions] = useState(false);
  const [likedStatus, setLikedStatus] = useState('Loading liked submissions...')

	// Submission queues
	const [submissions, setSubmissions] = React.useState({});
	const [queuedLikes, setQueuedLikes] = React.useState([]);
	const [liked, setLiked] = React.useState([]);

  // Toast UI
  const [snackPack, setSnackPack] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [messageInfo, setMessageInfo] = React.useState(undefined);

	/*
	* Handles updates to the MUI Snackbar models
	*/
	React.useEffect(() => {
		if (snackPack.length && !messageInfo) {
			// Set a new snack when we don't have an active one
			setMessageInfo({ ...snackPack[0] });
			setSnackPack((prev) => prev.slice(1));
			setOpen(true);
		} else if (snackPack.length && messageInfo && open) {
			// Close an active snack when a new one is added
			setOpen(false);
		}
	}, [snackPack, messageInfo, open]);

	/*
	* Handles close of the MUI Snackbar element
	*/
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		// Delete ignored toasts
		let key = messageInfo.key;
		delete submissions[key];
		setSubmissions(submissions);

		setOpen(false);
	};

	/*
	* Handles like events in the MUI Snackbar element
	*/
	const handleLike = (event, reason) => {
		let key = messageInfo.key;

		// Move the liked submission to the like queue
		let data = submissions[key];
		data['liked'] = true;
		let like = {
		  'id': key,
		  'data': data
		};
		setQueuedLikes(queuedLikes.concat([like]));
		delete submissions[key];
		setSubmissions(submissions);

		// Close the toast notif
		setOpen(false);
	};

	/*
	* Handles exit of the MUI Snackbar element
	*/
	const handleExited = () => {
		setMessageInfo(undefined);
	};

	/*
	* Create toast notif
	*/
	const createToast = (submission) => {
		let key = submission.id;
		submissions[key] = submission.data;
		setSubmissions(submissions);

		let firstName = submission.data.firstName;
		let lastName = submission.data.lastName;
		let email = submission.data.email;
		let message = `${firstName} ${lastName} ${email}`;

		setSnackPack((prev) => [...prev, { message, key: key }]);
	}

	/*
	* Handle new toasts
	*/
	const toaster = (data) => {
		createToast(data);
	}

	/*
	* Pass the toast handler to the mockServer
	*/
	onMessage(toaster);

	/*
	* Attempts to save like submissions to the server
	*/
  useEffect(async () => {
    while (queuedLikes.length > 0) {
      let queue = queuedLikes;
      let like = queue.pop();
      setQueuedLikes(queue);

      saveLikedFormSubmission(like).then((response) => {
        setLiked(liked.concat([like]));
      }).catch((error) => {
        console.log(error);

        // Add the like back onto the queue
        setQueuedLikes(queuedLikes.concat([like]));
      });

    }
	}, [queuedLikes]);

	/*
	* Attempts to fetch the liked submissions from the server
	*/
	useEffect(async () => {
    fetchLikedFormSubmissions().then((response) => {
      if (response.formSubmissions === undefined || response.formSubmissions.length == 0) {
        setLikedStatus('No liked submissions.');
      }
      setGlobalState(state => ({...state, likedSubmissions: response.formSubmissions}));
    }).catch((error) => {
      console.log(error);
      setLikedStatus('There seems to be a problem with the server. Try refreshing the page.');
    });
	}, [liked]);

	/*
	* UI toggle to show the list of liked submissions if any exist
	*/
	useEffect(() => {
  	if (globalState.likedSubmissions) {
			globalState.likedSubmissions.length ? setHasLikedSubmissions(true) : setHasLikedSubmissions(false)
		}
	}, [globalState.likedSubmissions]);

  return (
    <Box sx={{marginTop: 3}}>
      {hasLikedSubmissions ?
      	<Liked submissions={globalState.likedSubmissions}/>
      	:
      	<Typography role="no-likes-header" variant="body1" sx={{fontStyle: 'italic'}}>
      	{
      	  likedStatus
      	}
      	</Typography>
      }
			<Snackbar
				key={messageInfo ? messageInfo.key : undefined}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				TransitionProps={{ onExited: handleExited }}
				message={messageInfo ? messageInfo.message : undefined}
				action={
					<React.Fragment>
						<Button color="secondary" size="small" onClick={handleLike}>
							LIKE
						</Button>
						<IconButton
							aria-label="close"
							color="inherit"
							sx={{ p: 0.5 }}
							onClick={handleClose}
						>
							<CloseIcon />
						</IconButton>
					</React.Fragment>
				}
			/>
    </Box>
  );
}
