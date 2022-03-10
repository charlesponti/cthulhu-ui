import PropTypes from 'prop-types';
import React from 'react';
import TransactionListItem from './TransactionListItem';
import propTypes from '../../services/utils/propTypes';
import List from '../List';

const TransactionList = ({ transactions }) => (
  <List>
    {transactions.map((transaction) => (
      <TransactionListItem
        key={transaction._id} // eslint-disable-line
        transaction={transaction}
      />
    ))}
  </List>
);

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(propTypes.transactionPropType).isRequired
};

export default TransactionList;
