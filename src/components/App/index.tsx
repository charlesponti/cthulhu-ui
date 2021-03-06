import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { FC } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { authSelectors } from '../../services/auth';
import { useProfile } from '../../services/hooks';
import { RootState } from '../../services/store';
import { userPropType } from '../../services/utils/propTypes';

import Authenticate from '../../scenes/Authenticate';
import Home from '../../scenes/Home';
import Login from '../../scenes/Login';
import NotFound from '../../scenes/NotFound';
import Profile from '../../scenes/Profile';

import NavBar from './components/Navbar';

import styles from './App.module.css';

function App() {
  const { loading } = useProfile();

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Grid className={styles.wrap}>
        <Routes>
          <Route path="authenticate" element={<Authenticate />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
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
