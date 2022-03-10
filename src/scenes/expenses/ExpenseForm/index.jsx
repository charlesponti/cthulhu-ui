import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import styles from './ExpenseForm.module.scss';

const Form = styled.form``;
const FormGroup = styled(FormControl)``;

function ExpenseForm({ onSubmit }) {
  const { register, handleSubmit, reset } = useForm();

  function onFormSubmit(record) {
    onSubmit({
      name: record.name,
      amount: parseFloat(record.amount)
    });
    reset();
  }

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <FormGroup>
          <TextField
            label="Name"
            aria-label="expense name"
            variant="outlined"
            name="name"
            inputRef={register}
            color="primary"
          />
        </FormGroup>
        <FormGroup>
          <TextField
            label="Amount"
            aria-label="expense amount"
            variant="outlined"
            type="float"
            name="amount"
            inputRef={register}
          />
        </FormGroup>
        <FormGroup>
          <Button role="button" variant="outlined" type="submit">
            Submit
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
}

ExpenseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ExpenseForm;
