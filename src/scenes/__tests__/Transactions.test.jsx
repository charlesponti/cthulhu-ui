import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../../../ui/src/store';
import Transactions from '../transactions';

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn(() => ({
    isLoading: false,
    isAuthenticated: true,
    getAccessTokenSilently: jest.fn(() => Promise.resolve('access-token'))
  })),
  withAuthenticationRequired: jest.fn()
}));

describe('<Transactions/>', () => {
  it('renders', () => {
    render(
      <ReduxProvider store={store}>
        <Transactions />
      </ReduxProvider>
    );
  });

  xit('makes a call to the API when the button is clicked', async () => {
    fetch.mockResponseOnce(JSON.stringify({ msg: 'This is the API result' }));

    render(<Transactions />);
    fireEvent.click(screen.getByText('Ping API'));

    await waitFor(() => screen.getByTestId('api-result'));

    expect(await screen.findByText(/This is the API result/)).toBeInTheDocument();
  });
});
