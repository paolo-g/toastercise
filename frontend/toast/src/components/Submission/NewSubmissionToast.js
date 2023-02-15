import React from 'react';
import {useEffect, useContext, useState} from 'react';

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import GlobalState from '../../contexts/GlobalState';
import { onMessage, saveLikedFormSubmission } from '../../service/mockServer';
import './NewSubmissionToast.scss';

// Styles the toast
const newSubmissionTheme = createTheme({
  palette: {
    toast: {
      main: '#8fefef',
    },
  },
});

/*
* A toast to handle onMessage events (new submissions) from mockServer
*/
const NewSubmissionToast = () => {
  const [globalState, setGlobalState] = useContext(GlobalState);
  const [toastBuffer, setToastBuffer] = useState({});
  const [likeBuffer, setLikeBuffer] = useState([]);

  // Toast UI
  const [snackPack, setSnackPack] = useState([]);
	const [open, setOpen] = useState(false);
	const [messageInfo, setMessageInfo] = useState(undefined);
	const vertical = 'bottom';
	const horizontal = 'right';

	/*
	* Handles updates to the MUI Snackbar models
	*/
	useEffect(() => {
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
	* Handles closing of the toast
	*/
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		// Clear the toast buffer
		setToastBuffer({});

		setOpen(false);
	};

	/*
	* Handles like click events in the toast
	*/
	const handleLike = (event, reason) => {
		let key = messageInfo.key;

		// Move the liked submission to the likeBuffer
		let data = toastBuffer[key];
		data['liked'] = true;
		let like = {
		  'id': key,
		  'data': data
		};
		setLikeBuffer([...likeBuffer, like]);

		// Close the toast
		setOpen(false);
	};

	/*
	* Handles exit of the toast
	*/
	const handleExited = () => {
		setMessageInfo(undefined);
	};

	/*
	* Create the toast
	*/
	const createToast = (submission) => {
		let key = submission.id;
		let data = submission.data;
		setToastBuffer(state => ({...state, [key]: data}));

		let message = `${data.firstName} ${data.lastName}\n${data.email}`;
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
  useEffect(() => {
    (async () => {
      if (likeBuffer.length) {
        // Pop an element off the likeBuffer
        let tmpLike = likeBuffer.pop();
        setLikeBuffer(likeBuffer.filter(item => item.id !== tmpLike.id));

        // Attempt to save the like
        saveLikedFormSubmission(tmpLike).then((response) => {
          globalState.likedSubmissions === undefined ?
            setGlobalState(state => ({...state, likedSubmissions: [tmpLike]}))
          :
            setGlobalState(state => ({...state, likedSubmissions: [...globalState.likedSubmissions, tmpLike]}))
        }).catch((error) => {
          console.log(error);

          // Add the like back into the buffer
          setLikeBuffer([...likeBuffer, tmpLike]);
        });
      }
    })();
	}, [likeBuffer, globalState.likedSubmissions, setGlobalState]);

  return (
    <ThemeProvider theme={newSubmissionTheme}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <React.Fragment>
            <Button color="toast" size="small" onClick={handleLike}>
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
    </ThemeProvider>
  );
}

export default NewSubmissionToast;
