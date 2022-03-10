import { useState } from 'react';
import Head from 'next/head';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemText } from '@material-ui/core';

import styles from './Expenses.module.scss';
import Layout from '../../components/layout';
import ExpenseForm from './ExpenseForm';

function Expenses() {
  const [expenses, setExpenses] = useState([{ name: 'Housing', amount: 3886.0 }]);

  async function onSubmit(expense) {
    return setExpenses([...expenses, expense]);
  }

  return (
    <>
      <Head>
        <title>Expenses</title>
      </Head>
      <Layout>
        <Grid container spacing={1} justify="center">
          <Grid item xs={12}>
            <Typography variant="h3" className={styles.title}>
              Expenses
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <ExpenseForm onSubmit={onSubmit} />
          </Grid>
          <Grid item xs={8}>
            <List dense>
              {expenses.map(({ name, amount }) => (
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
                        color: 'red'
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export default Expenses;
