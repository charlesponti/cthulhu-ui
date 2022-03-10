import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { Field, Form, Formik } from 'formik';
import PropTypes, { InferProps } from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import api from '../../services/api';
import * as authService from '../../services/auth';
import FeedbackBlock from '../../components/FeedbackBlock';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  min-width: 350px;
  max-width: 500px;
  padding: 24px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
`;

const StyledCardHeader = styled(CardHeader)`
  padding-left: 0;
`;

const FieldErrorText = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.palette.error.main};
`;

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email()
});

function SignUp({ setCurrentEmail }: InferProps<typeof SignUp.propTypes>) {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const initialValues = useMemo(
    () => ({
      email: ''
    }),
    []
  );

  const onSubmit = useCallback(async ({ email }) => {
    try {
      await api.post('/login', { email });
      setCurrentEmail(email);
      navigate('/authenticate');
    } catch (err) {
      setError(true);
    }
  }, []);

  return (
    <Wrap>
      <StyledCard>
        <CardContent>
          <StyledCardHeader
            title={
              <Typography variant="h5" color="text.primary" gutterBottom>
                Log in
              </Typography>
            }
          />
          {error && <FeedbackBlock>There was a problem! Try again, homie. </FeedbackBlock>}
          <Formik validationSchema={SignUpSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {({ errors }) => (
              <Form>
                <FormControl fullWidth margin="normal" error={!!errors.email}>
                  <Label htmlFor="email">Email</Label>
                  <Field type="email" name="email"></Field>
                  {errors.email && <FieldErrorText>{errors.email}</FieldErrorText>}
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <Button fullWidth type="submit" variant="contained" color="primary">
                    Sign Up
                  </Button>
                </FormControl>
              </Form>
            )}
          </Formik>
        </CardContent>
      </StyledCard>
    </Wrap>
  );
}

SignUp.propTypes = {
  setCurrentEmail: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setCurrentEmail: authService.setCurrentEmail
};

export default connect(null, mapDispatchToProps)(SignUp);
