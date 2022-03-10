import PropTypes from 'prop-types';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <>
      <Hero />
    </>
  );
};

Home.propTypes = {
  path: PropTypes.string,
  caseInsensitive: PropTypes.bool
};

export default Home;
