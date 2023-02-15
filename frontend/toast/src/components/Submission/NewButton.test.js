import { screen, render } from '@testing-library/react';

import NewButton from './NewButton';

/*
* Tests that the button label
*/
test('renders button text', () => {
  render(<NewButton />);

  const button  = screen.getByRole('button', { name: /New Submission/i});
  expect(button).toBeInTheDocument();
});
