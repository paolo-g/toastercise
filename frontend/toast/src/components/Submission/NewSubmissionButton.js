import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { createMockFormSubmission } from '../../service/mockServer';

const newButtonTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    button: {
      main: '#fe0d4b',
    },
  },
});

/*
* Renders a New Submission button
*/
const NewSubmissionButton = () => {
  return (
    <ThemeProvider theme={newButtonTheme}>
      <Button
        variant="contained"
        size="small"
        color="button"
        onClick={() => createMockFormSubmission()}
        sx={{padding: 1}}
      >
        <Typography color="primary">
          New Submission
        </Typography>
      </Button>
    </ThemeProvider>
  );
}

export default NewSubmissionButton;
