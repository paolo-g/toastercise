import React from 'react';
import { screen, render } from '@testing-library/react';
import Submission from './Submission';

test('renders submission element', () => {
  let data = {
  	'firstName': 'paolo'
  }
	let submission = {
		'data': data
	}
  render(<Submission submission={submission} />);

  const submissionContent = screen.getByRole('submission');
  expect(submissionContent).toHaveTextContent('paolo');
});
