import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskInput from './TaskInput';

test('renders component', () => {
  const mock = jest.fn();
  render(<TaskInput createTask={mock} />);

  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});

describe('check component output', () => {
  it('should callback the title of new todo', async () => {
    const mock = jest.fn();
    render(<TaskInput createTask={mock} />);

    expect(screen.queryByDisplayValue(/JavaScript/)).not.toBeInTheDocument();

    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');

    expect(screen.getByDisplayValue(/JavaScript/)).toBeInTheDocument();

    expect(mock).toHaveBeenCalledTimes(0);

    await userEvent.click(screen.getByRole('button'));

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith('JavaScript');
  });
});
