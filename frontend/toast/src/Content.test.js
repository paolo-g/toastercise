import React from 'react';
import { screen, render } from '@testing-library/react';
import Content from './Content';

test('renders Content component', () => {
  render(<Content />);

  const content = screen.getByRole('no-likes-header');
	expect(content).toHaveTextContent('Loading liked submissions');
});
