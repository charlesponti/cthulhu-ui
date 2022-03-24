import PropTypes from 'prop-types';
import Emoji from '../../components/Emoji';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.wrap}>
      <Emoji kind="information desk lady" size="lg">
        💁‍♀️
      </Emoji>

      <h1>Ponti Fullstack</h1>

      <p className={styles.subtitle}>A boilerplate for professional apps.</p>
    </div>
  );
};

Home.propTypes = {
  path: PropTypes.string,
  caseInsensitive: PropTypes.bool
};

export default Home;
