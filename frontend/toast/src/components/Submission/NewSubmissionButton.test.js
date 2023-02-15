import { screen, render } from '@testing-library/react';

import NewSubmissionButton from './NewSubmissionButton';

/*
* Tests that the button label
*/
test('renders button text', () => {
  render(<NewSubmissionButton />);

  const button  = screen.getByRole('button', { name: /New Submission/i});
  expect(button).toBeInTheDocument();
});
