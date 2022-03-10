import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import numberFormat from 'number-format.js';

// Form
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core//InputLabel';
import Button from '@material-ui/core/Button';
import Grid from '@mui/material/Grid';
import Layout from '../../components/layout';
import BudgetTable from './BudgetTable';

import styles from './Budget.module.scss';

export default function Budget() {
  const [income, setIncome] = useState(0);
  const [filingType, setFilingType] = useState('single');
  const [taxRate, setTaxRate] = useState(0.5);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register('filingType'); // Register Material UI Select field
    setValue('filingType', filingType); // Set default value
  }, [filingType, register, setValue]);

  async function onSubmit(record) {
    const { data } = await axios.get('/api/tax-bracket', {
      params: {
        filingType: record.filingType,
        income: record.income
      }
    });

    setIncome(data.after_tax);
    setTaxRate(data.taxRate);
  }

  return (
    <Layout home={false}>
      <Helmet>
        <title> Budget </title>
      </Helmet>

      <h2 className={styles.header}> Budget </h2>

      <Grid container justify="center">
        <Grid item style={{ width: '70%' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl className={styles.formControl}>
              <TextField
                id="income"
                name="income"
                label="Yearly Income"
                variant="outlined"
                type="number"
                inputRef={register}
              />
            </FormControl>
            <FormControl className={styles.formControl}>
              <InputLabel id="filing-type-label">Filing Type</InputLabel>
              <Select
                labelId="filing-type-label"
                id="filingType"
                name="filingType"
                defaultValue={filingType}
                onChange={({ target: { value } }) => {
                  setValue('filingType', value);
                  setFilingType(value);
                }}>
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="married_joint">Married, filing jointly</MenuItem>
                <MenuItem value="married_separate">Married, filing separately</MenuItem>
                <MenuItem value="head_of_household">Head of Household</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={styles.formControl}>
              <Button variant="outlined" color="primary" type="submit">
                Get Budget
              </Button>
            </FormControl>
          </form>
        </Grid>
      </Grid>

      {income > 0 ? (
        <>
          <div className={styles.afterTaxContainer}>
            <h5>Federal Tax Rate</h5>
            <p className={styles.afterTaxIncome}>{`${taxRate * 100} %`}</p>
          </div>
          <div className={styles.afterTaxContainer}>
            <h5>After Tax Income</h5>
            <p className={styles.afterTaxIncome}>{numberFormat('$ ###,###,###.##', income)}</p>
          </div>
        </>
      ) : null}
      {income > 0 ? <BudgetTable income={income} /> : null}
    </Layout>
  );
}
