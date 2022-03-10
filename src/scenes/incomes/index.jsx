import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemText } from '@material-ui/core';

import styles from './Incomes.module.scss';
import Layout from '../../components/layout';
import IncomeForm from './IncomeForm';

function Incomes() {
  const [incomes, setIncomes] = useState([{ name: 'Salary', amount: 10000 }]);

  async function onSubmit(income) {
    return setIncomes([...incomes, income]);
  }

  return (
    <Layout>
      <Grid container spacing={1} justify="center">
        <Grid item xs={12}>
          <Typography variant="h3" className={styles.title}>
            Incomes
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <IncomeForm onSubmit={onSubmit} />
        </Grid>
        <Grid item xs={8}>
          <List dense>
            {incomes.map(({ name, amount }) => (
              <ListItem key={name} label={name}>
                <ListItemText
                  primary={name}
                  primaryTypographyProps={{
                    style: {
                      fontSize: '1.5rem'
                    }
                  }}
                  secondary={new Intl.NumberFormat('en-EN', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(amount)}
                  secondaryTypographyProps={{
                    style: {
                      color: 'green'
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Incomes;
