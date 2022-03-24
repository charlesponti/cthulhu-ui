import Typography from '@mui/material/Typography';
import styles from './NotFound.module.css';
function NotFound() {
  return (
    <div className={styles.wrap}>
      <Typography variant="h3" color="error.main">
        You lost, buddy?
      </Typography>
    </div>
  );
}

NotFound.propTypes = {};

export default NotFound;
