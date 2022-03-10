import Grid from '@mui/material/Grid';
import { InferProps } from 'prop-types';
import { connect } from 'react-redux';

import { authSelectors } from '../services/auth';
import { RootState } from '../services/store';
import { userPropType } from '../services/utils/propTypes';

function Profile({ user }: InferProps<typeof Profile.propTypes>) {
  if (!user) {
    return null;
  }

  return (
    <Grid container>
      <Grid item>
        {user.avatar && (
          <Grid md={2}>
            <img
              src={user.avatar}
              alt="Profile"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            />
          </Grid>
        )}
        <Grid md>
          <h2>{user?.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Grid>
      </Grid>
      <Grid>{JSON.stringify(user, null, 2)}</Grid>
    </Grid>
  );
}

Profile.propTypes = {
  user: userPropType
};

const mapStateToProps = (state: RootState) => ({
  user: authSelectors.getUser(state)
});

export default connect(mapStateToProps)(Profile);
