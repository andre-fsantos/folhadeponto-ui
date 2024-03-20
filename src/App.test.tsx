import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('<App />', () => {
  it('should render the application correclty', () => {
    const application = render(<App />);

    expect(application).toBeDefined();
  });

  it('should display the Vite + React within a heading h1', () => {
    const { getByRole } = render(<App />);

    const text = getByRole('heading', {
      level: 1,
    });

    expect(text.textContent).toBe('Vite + React');
  });
});
