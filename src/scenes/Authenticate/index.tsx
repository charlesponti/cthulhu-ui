import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { Field, Form, Formik } from 'formik';
import PropTypes, { InferProps } from 'prop-types';
import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { RootState, store } from '../../services/store';
import { authenticateAsync, authSelectors, setCurrentEmail } from '../../services/auth';
import FeedbackBlock from '../../components/FeedbackBlock';

import styles from './Authenticate.module.css';

const AuthenticateSchema = Yup.object().shape({
  emailToken: Yup.string().length(8)
});

const StyledCard = styled(Card)`
  width: 350px;
  padding: 24px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
`;

const StyledCardHeader = styled(CardHeader)`
  padding-left: 0;
`;

function Authenticate({
  authenticateError,
  loginEmail = ''
}: InferProps<typeof Authenticate.propTypes>) {
  const navigate = useNavigate();
  const initialValues = useMemo(
    () => ({
      emailToken: ''
    }),
    []
  );

  const onSubmit = useCallback(async ({ emailToken }) => {
    if (loginEmail) {
      await store.dispatch(authenticateAsync({ email: loginEmail, emailToken }));
      // Remove current email from state
      setCurrentEmail(null);
      navigate('/transactions');
    }
  }, []);

  useEffect(() => {
    // If there is no login email set, user will need to request a new email token
    if (!loginEmail) {
      console.log({ loginEmail });
      navigate('/login');
    }
  }, []);

  return (
    loginEmail && (
      <div className={styles.wrap}>
        <StyledCard>
          <CardContent>
            <StyledCardHeader
              title={
                <Typography variant="h5" color="text.primary" gutterBottom>
                  Authenticate
                </Typography>
              }
            />
            {authenticateError && <FeedbackBlock>There was a problem, boo boo.</FeedbackBlock>}
            <Formik
              validationSchema={AuthenticateSchema}
              initialValues={initialValues}
              onSubmit={onSubmit}>
              <Form>
                <FormControl fullWidth color="primary" margin="normal">
                  <Label htmlFor="emailToken">Code</Label>
                  <Field type="string" name="emailToken"></Field>
                </FormControl>
                <FormControl margin="normal">
                  <Button type="submit" color="primary" variant="outlined">
                    Log In
                  </Button>
                </FormControl>
              </Form>
            </Formik>
          </CardContent>
        </StyledCard>
      </div>
    )
  );
}

Authenticate.propTypes = {
  authenticateError: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  loginEmail: PropTypes.string,
  user: PropTypes.any
};

const mapStateToProps = (state: RootState) => ({
  authenticateError: authSelectors.getAuthenticateError(state),
  loginEmail: authSelectors.getLoginEmail(state),
  user: authSelectors.getUser(state)
});

const mapDispatchToProps = {
  authenticateAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate as React.FC);
