import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const MovieInfo = styled.div`
  transition: height 800ms ease-in-out;
  overflow: auto;
  padding: 1rem;
`;

const MoviePoster = styled.div`
  text-align: center;

  img {
    width: 50%;
  }
`;

const MoviePlot = styled.div`
  margin-top: 1rem !important;
`;

const MovieDetailsItem = styled.div`
  margin-top: 1rem !important;
`;

export default function MovieCard({ movie }) {
  return movie ? (
    <MovieInfo>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} component={MoviePoster}>
          <img alt={`${movie.Title}`} src={movie.Poster} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography component={MoviePlot}>{movie.Plot}</Typography>
          <Typography component={MovieDetailsItem}>
            <b>Rating</b> {movie.imdbRating}
          </Typography>
          <Typography component={MovieDetailsItem}>
            <b>Votes</b> {movie.imdbVotes}
          </Typography>
        </Grid>
      </Grid>
    </MovieInfo>
  ) : null;
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Poster: PropTypes.string,
    Plot: PropTypes.string,
    imdbRating: PropTypes.string,
    imdbVotes: PropTypes.string
  })
};
