import React, { useContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import Axios from 'axios';
import { Stars } from '@material-ui/icons';

import { CTX } from '../../Store';

import MovieCard from '../../components/moviecard';
import './index.css';

import { CircularProgress, TextField, Button, Grid } from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import config from '../../config';
import { useForm } from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(16),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    loader: {
        marginTop: theme.spacing(4),
    },
    empty: {
        marginTop: theme.spacing(4),
    },
    list: {
        marginTop: theme.spacing(3),
    },
    search: {
        marginTop: theme.spacing(3),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
}));

export default function TopRatedMovies() {
    const classes = useStyles();
    const { register, errors, handleSubmit } = useForm();

    const [{ movies, loggedUser, loader }, dispatch] = useContext(CTX);
    const [page, setPage] = useState(1);

    const getMoviesFromAPI = async () => {
        const { data } = await Axios.get(
            `${config.themovieDB.API_URL}/movie/top_rated${config.themovieDB.API_KEY}`
        );
        console.log(data);
        dispatch({ type: 'SET_MOVIES', payload: data.results });
    };

    const searchForMovie = async ({ title }) => {
        if (title) {
            dispatch({ type: 'LOADER_ON' });
            const { data } = await Axios.get(
                `${config.themovieDB.API_URL}/search/movie${config.themovieDB.API_KEY}&language=en-US&query=${title}&page=1&include_adult=false`
            );
            dispatch({ type: 'SET_MOVIES', payload: data.results });
        }
    };

    const fetchMoreMovies = async () => {
        let _page = page + 1;
        const { data } = await Axios.get(
            `${config.themovieDB.API_URL}/movie/top_rated${config.themovieDB.API_KEY}&page=${_page}`
        );
        dispatch({ type: 'ADD_MOVIES', payload: data.results });
        setPage(_page);
    };

    useEffect(() => {
        getMoviesFromAPI();
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Stars />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Top Rated Movies
                </Typography>
                <form
                    className={classes.search}
                    onSubmit={handleSubmit((data) => searchForMovie(data))}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                label="Title"
                                inputRef={register}
                                name="title"
                                autoComplete="Title"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                color="primary"
                                className={classes.submit}
                            >
                                Search
                            </Button>{' '}
                        </Grid>
                    </Grid>
                </form>
                {loader && <CircularProgress className={classes.loader} />}

                <InfiniteScroll
                    dataLength={movies.length} //This is important field to render the next data
                    next={fetchMoreMovies}
                    hasMore={true}
                    loader={<CircularProgress className={classes.loader} />}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {movies && (
                        <div className={classes.list}>
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    )}
                </InfiniteScroll>
            </div>
        </Container>
    );
}
