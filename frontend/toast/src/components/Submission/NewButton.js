import Button from '@mui/material/Button';

import { createMockFormSubmission } from '../../service/mockServer';

/*
* Renders a New Submission button
*/
const NewButton = () => {
  return (
    <Button
      variant="contained"
      size="small"
      color="secondary"
      onClick={() => createMockFormSubmission()}
    >
      New Submission
    </Button>
  );
}

export default NewButton;
