import { App } from './App';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('should render the app', async () => {
    render(<App />);
    const body = document.body;
    expect(body).toBeDefined();
  });
});
