import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import App from './App';
import { server } from './mocks/server';

test('renders App', async () => {
  render(<App />);

  // Tips to find actual elements
  // screen.debug();
  // screen.getByRole('')

  const element = screen.getByText(/ADD/i);
  expect(element).toBeInTheDocument();

  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();

  // wait for server response
  expect(await screen.findByRole('list')).toBeInTheDocument();

  // normal getXX() is okay after await
  expect(screen.getByRole('list')).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.getAllByRole('checkbox')).toHaveLength(2);
});

describe('check App input and output', () => {
  it('add update and delete new todo', async () => {
    render(<App />);

    // make sure no TypeScript before start
    expect(await screen.findAllByRole('listitem')).toHaveLength(2);
    expect(screen.queryByText(/TypeScript/)).not.toBeInTheDocument();

    // Create New Task
    await userEvent.type(screen.getByRole('textbox'), 'TypeScript');
    expect(screen.getByRole('textbox')).toHaveValue('TypeScript');

    await userEvent.click(screen.getByRole('button', { name: /Add/ }));

    // wait for server response
    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(3)
    );

    expect(screen.getByText(/TypeScript/)).toBeInTheDocument();

    const items = screen.getAllByRole('listitem');

    expect(items[0]).toHaveTextContent('TypeScript');
    expect(items[1]).toHaveTextContent('次にやるやつ');
    expect(items[2]).toHaveTextContent('はじめにやるやつ');

    const boxes = screen.getAllByRole('checkbox');

    expect(boxes[0]).toHaveProperty('checked', false);
    expect(boxes[1]).toHaveProperty('checked', false);
    expect(boxes[2]).toHaveProperty('checked', true);

    // Update Task
    await userEvent.click(boxes[0]);

    // wait for server response and verify
    await waitFor(() =>
      expect(boxes[0]).toHaveProperty('checked', true)
    );

    // Delete Task
    await userEvent.click(screen.getAllByLabelText('delete')[0]);

    // wait for server response
    await waitForElementToBeRemoved(boxes[0]);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});

describe('check error case', () => {
  it('show message of network error', async () => {
    const baseURL = "http://localhost:3000"
    server.use(
      rest.get(`${baseURL}/todo`, (req, res, ctx) => {
        return res(
          ctx.status(404, 'Fake Error'),
        );
      }),
    );

    render(<App />);

    expect(await screen.findByText(/fake error/i)).toBeInTheDocument();
  });
});
