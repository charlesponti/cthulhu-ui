import cx from 'classnames';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Container from '@material-ui/core/Container';
import Grid from '@mui/material/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@mui/material/Typography';
import MovieForm from '../../components/movies/MovieForm';
import MovieList from '../../components/movies/MovieList';
import Layout from '../../components/layout';
import MovieService from '../../services/movies';
import styles from './Movies.module.css';

export default function Movies() {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        setSearching(true);
        const data = await MovieService.search(query);
        setTimeout(() => {
          setMovies(data);
          setSearching(false);
        }, 500);
      }
    };

    fetchData();
  }, [query]);

  function onSubmit(event) {
    event.preventDefault();
    setQuery(event.target.elements.namedItem('query').value);
  }

  return (
    <Layout>
      <Helmet>
        <title>Hominem Movies</title>
      </Helmet>

      <Container className={styles.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              Movies
            </Typography>

            <MovieForm query={query} onSubmit={onSubmit} className={cx(styles.form)} />

            {searching ? <LinearProgress className={styles.progress} /> : null}

            {movies.length ? <MovieList movies={movies} /> : null}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
