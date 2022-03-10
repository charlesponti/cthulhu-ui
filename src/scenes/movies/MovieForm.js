import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import TextField from '@material-ui/core/TextField';

import { Button } from '@material-ui/core';
import styles from './MovieForm.module.scss';

export default function MovieForm({ onSubmit, query }) {
  return (
    <form onSubmit={onSubmit} className={cx(styles.form)}>
      <TextField
        type="text"
        name="query"
        size="medium"
        placeholder=" Search "
        defaultValue={query}
        className={cx(styles.textField)}
        style={{ width: '70%' }}
      />
      <Button color="primary" variant="outlined" type="submit">
        
        Search
      </Button>
    </form>
  );
}

MovieForm.propTypes = {
  onSubmit: PropTypes.func,
  query: PropTypes.string
};
