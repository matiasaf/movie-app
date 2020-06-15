import React, { useContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import Axios from 'axios';
import { AddToQueue } from '@material-ui/icons';

import { CTX } from '../../Store';

import MovieCard from '../../components/moviecard';
import './index.css';

import { CircularProgress } from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import config from '../../config';

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

export default function ToWatchMovies() {
    const classes = useStyles();
    const [{ movies, loader }, dispatch] = useContext(CTX);

    const getToWatchMovies = async () => {
        dispatch({ type: 'LOADER_ON' });
        const user = await Auth.currentAuthenticatedUser();
        const { data } = await Axios.get(
            `${config.apiGateway.URL}/movies/to-watch/${user.username}`
        );
        console.log(data);
        dispatch({ type: 'SET_MOVIES', payload: data });
    };

    useEffect(() => {
        getToWatchMovies();
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AddToQueue />
                </Avatar>
                <Typography component="h1" variant="h5">
                    To Watch Movies
                </Typography>

                {loader && <CircularProgress className={classes.loader} />}

                {movies && (
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
