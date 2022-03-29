import React from 'react';
import renderer from 'react-test-renderer';
import { test, expect, vi } from 'vitest';
import Profile from '.';

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(() => ({
    loading: false,
    user: {
      name: 'Test user',
      email: 'test@user.com',
      picture: 'https://avatar.com'
    }
  })),
  withAuthenticationRequired: vi.fn()
}));

test('Profile', () => {
  test('renders when loading = true', () => {
    const div = renderer.create(<Profile />, div);
    expect(div.toJSON()).toMatchSnapshot();
  });
});
