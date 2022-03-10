import numberFormat from 'number-format.js';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CATEGORIES } from '../../../services/utils/constants';

const useStyles = makeStyles({
  table: {
    maxWidth: 650
  },
  tableContainer: {
    background: 'none'
  },
  tableCell: {
    color: 'white'
  },
  tableRow: {
    '& td, th': {
      color: 'white'
    }
  }
});

const BudgetTable = ({ income }) => {
  const classes = useStyles();
  const categories = useMemo(CATEGORIES, []);

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" className={classes.tableCell}>
              Category
            </TableCell>
            <TableCell align="right" className={classes.tableCell}>
              Percentage
            </TableCell>
            <TableCell align="right" className={classes.tableCell}>
              Yearly
            </TableCell>
            <TableCell align="right" className={classes.tableCell}>
              Monthly
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map(({ percentage, name }) => {
            const recommended = numberFormat('$ ##,###.##', income * percentage);
            const recommendedMonthly = numberFormat('$ ##,###.##', (income * percentage) / 12);

            return (
              <TableRow key={name} className={classes.tableRow}>
                <TableCell component="th" scope="row" align="right">
                  {name}
                </TableCell>
                <TableCell align="right">{percentage * 100}%</TableCell>
                <TableCell align="right">{recommended}</TableCell>
                <TableCell align="right">{recommendedMonthly}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

BudgetTable.propTypes = {
  income: PropTypes.number.isRequired
};

export default BudgetTable;
