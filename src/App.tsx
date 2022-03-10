import Grid from '@mui/material/Grid';
import { Route, Routes } from 'react-router-dom';

import Home from './scenes/Home';
import Authenticate from './scenes/Authenticate';
import SignUp from './scenes/SignUp';
import Profile from './scenes/Profile';
import Accounts from './scenes/accounts';

import NavBar from './components/NavBar';
import NotFound from './scenes/NotFound';
import { connect } from 'react-redux';
import { useProfile } from './services/hooks';
import { CircularProgress } from '@mui/material';
import { userPropType } from './services/utils/propTypes';
import { authSelectors } from './services/auth';
import { RootState } from './services/store';
import { FC } from 'react';

function App() {
  const { loading } = useProfile();

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Grid className="flex-grow-1 mt-5">
        <Routes>
          <Route path="authenticate" element={<Authenticate />} />
          <Route path="login" element={<SignUp />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Grid>
    </div>
  );
}

App.propTypes = {
  user: userPropType
};

const mapStateToProps = (state: RootState) => ({
  user: authSelectors.getUser(state)
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App as FC);
