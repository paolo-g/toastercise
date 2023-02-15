import { screen, render } from '@testing-library/react';

import Liked from './Liked';

/*
* Tests that the proper notice is shown when there are no likes
*/
test('renders empty list', () => {
  render(<Liked />);

  const content = screen.getByRole('no-likes-header');
  expect(content).toHaveTextContent('Loading liked submissions');
});
