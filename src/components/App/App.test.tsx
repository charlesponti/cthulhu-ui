import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { test, expect } from 'vitest';

import { store } from '../../services/store';
import App from '.';

test('renders learn react link', () => {
  const component = renderer.create(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const instance = component.toJSON();
  expect(instance).toMatchSnapshot();
});
