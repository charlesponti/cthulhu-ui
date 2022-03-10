import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import FeedbackBlock from '../../components/FeedbackBlock';
import { useAccounts } from '../../services/hooks';

const Header = styled(Typography)`
  margin-bottom: 16px;
`;

const Accounts = () => {
  const { isLoading, error, data } = useAccounts();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={11} md={8}>
        <Header variant="h5">Accounts</Header>
        {isLoading && <CircularProgress />}
        {!isLoading && error && <FeedbackBlock>{error}</FeedbackBlock>}
        {!isLoading && !error && data && data.length ? (
          data.map(({ id, name, type }) => (
            <Card key={id}>
              <CardContent>
                <Grid container>
                  <Grid item xs={6}>
                    {name}
                  </Grid>
                  <Grid item xs={6}>
                    {type}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))
        ) : (
          <div> No Accounts </div>
        )}
      </Grid>
    </Grid>
  );
};

export default Accounts;
