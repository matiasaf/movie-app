import React, { useContext, useEffect } from 'react';
import Axios from 'axios';
import { CTX } from '../../Store';

import MovieCard from '../../components/moviecard';
import './index.css';

import { CircularProgress, TextField, Button, Grid } from '@material-ui/core';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import config from '../../config';
import { useForm } from 'react-hook-form';

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

export default function SearchMoviePage({ location, match }) {
    const classes = useStyles();
    const { register, errors, handleSubmit } = useForm();
    const [{ movies, loggedUser, loader }, dispatch] = useContext(CTX);

    const searchForMovie = async ({ title }) => {
        if (title) {
            dispatch({ type: 'LOADER_ON' });
            const { data } = await Axios.get(
                `${config.themovieDB.API_URL}/search/movie${config.themovieDB.API_KEY}&language=en-US&query=${title}&page=1&include_adult=false`
            );
            dispatch({ type: 'SET_MOVIES', payload: data.results });
        }
    };
    const checkMovieNameParam = async () => {
        dispatch({ type: 'LOADER_ON' });
        dispatch({ type: 'SET_MOVIES', payload: [] });
        if (match.params.movieName) {
            await searchForMovie({ title: match.params.movieName });
        }
    };

    useEffect(() => {
        checkMovieNameParam();
    }, [match.params.movieName]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
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
                                autoFocus
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

                {!loader && movies && (
                    <div className={classes.list}>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
}
