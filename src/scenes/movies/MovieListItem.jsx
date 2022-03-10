import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@mui/material/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@mui/material/Typography';
import MovieService from '../../services/movies';
import MovieCard from './MovieCard';
import styles from './MovieListItem.module.scss';

export default function MovieListItem({ movie }) {
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(false);

  /**
   * Handle click event on element
   * @param {SyntheticEvent} event
   */
  function onClick() {
    MovieService.searchById(movie.imdbID).then((response) => {
      // Delay response to reduce page jitter
      setTimeout(() => {
        setInfo(response);
        setLoading(false);
      }, 500);
    });

    setLoading(true);
  }

  function onCloseButtonClick() {
    setInfo(null);
  }

  if (!movie) return null;

  return (
    <li>
      <Grid container justify="space-between">
        <Grid item style={{ maxWidth: '85%' }}>
          <Typography variant="h5" className={cx(styles.movieTitle)}>
            {movie.Title}
          </Typography>
          <Typography variant="subtitle1" className={cx(styles.movieYear)}>
            {movie.Year}
          </Typography>
        </Grid>
        <Grid item>
          {info ? (
            <Button color="primary" onClick={onCloseButtonClick}>
              Close
            </Button>
          ) : (
            <Button color="primary" onClick={onClick}>
              Open
            </Button>
          )}
        </Grid>
      </Grid>
      {loading ? <LinearProgress /> : null}
      {info ? <MovieCard movie={info} /> : null}
    </li>
  );
}

MovieListItem.defaultProps = {
  movie: {}
};

MovieListItem.propTypes = {
  movie: PropTypes.shape({
    Year: PropTypes.string,
    Title: PropTypes.string,
    Poster: PropTypes.string,
    Plot: PropTypes.string,
    imdbID: PropTypes.string,
    imdbRating: PropTypes.string,
    imdbVotes: PropTypes.string
  })
};
