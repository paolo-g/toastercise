import React from 'react';
import { screen, render } from '@testing-library/react';
import Submission from './Submission';

test('renders submission element', () => {
  let firstName = 'paolo';
  let lastName = 'g';
  let email = 'pao@lo.g';
  let data = {
    'firstName': firstName,
    'lastName': lastName,
    'email': email
  }
  let submission = {
    'data': data
  }
  render(<Submission submission={submission} />);

  const submissionContent = screen.getByRole('submission');
  expect(submissionContent).toHaveTextContent(`${firstName} ${lastName}`);
  expect(submissionContent).toHaveTextContent(email);
});
