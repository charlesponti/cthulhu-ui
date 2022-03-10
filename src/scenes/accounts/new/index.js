import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './TransactionForm.module.scss';

function ExpenseForm({ onSubmit }) {
  function handleSubmit(event) {
    const {
      target: {
        elements: [payee, amount, description, date]
      }
    } = event;

    onSubmit({
      payee: payee.value,
      description: description.value,
      amount: amount.value,
      date: date.value
    });
  }

  return (
    <FormControl className={styles.container} fullWidth>
      <form onSubmit={handleSubmit}>
        <FormGroup className={styles.formGroup}>
          <TextField label="Description" aria-label="expense description" variant="standard" />
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <TextField
            label="Amount"
            id="expense-amount"
            aria-label="expense amount"
            variant="standard"
          />
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <TextField
            id="expense-date"
            label="Date"
            aria-label="expense date"
            type="date"
            variant="standard"
            defaultValue="2017-05-24"
            // className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormGroup>
        <FormGroup>
          <Button role="button" type="submit">
            Submit
          </Button>
        </FormGroup>
      </form>
    </FormControl>
  );
}

ExpenseForm.propTypes = {
  onSubmit: PropTypes.func
};

export default ExpenseForm;
