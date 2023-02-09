import React from 'react';
import { screen, render } from '@testing-library/react';
import Liked from './Liked';

test('renders list heading', () => {
  render(<Liked />);

  const likedContent = screen.getByRole('submission-header');
  expect(likedContent).toHaveTextContent('Liked Form Submissions');
});
