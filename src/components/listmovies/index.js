import React, { useContext, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Axios from 'axios';
import { Favorite } from '@material-ui/icons';

import { CTX } from '../../Store';

import MovieCard from '../moviecard';
import './index.css';

import { CircularProgress } from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BottomAppBar from '../bottom-nav-bar';

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
    empty : {
        marginTop: theme.spacing(4),
    }
}));

export default function ListMovies() {
    const classes = useStyles();
    const [{ movies, loggedUser, loader }, dispatch] = useContext(CTX);

    const getMovies = async () => {
        dispatch({ type: 'LOADER_ON' });
        const currentSession = await Auth.currentSession();
        if (currentSession) {
            const { data } = await Axios.get(
                `https://wjaf9crgh2.execute-api.us-east-2.amazonaws.com/dev/movies/${loggedUser.username}`,
                {
                    headers: {
                        Authorization: `${currentSession.idToken.jwtToken}`,
                    },
                }
            );
            dispatch({ type: 'SET_MOVIES', payload: data });
        }
    };
    useEffect(() => {
        getMovies();
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <BottomAppBar />

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Favorite />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Movies
                </Typography>

                {loader && <CircularProgress className={classes.loader} />}

                {!loader && movies.length === 0 && (
                    <Typography component="h1" variant="h5" className={classes.empty}>
                        Not favourites movies yet.
                    </Typography>
                )}
                {movies && movies.map((movie) => <MovieCard movie={movie} />)}
            </div>
        </Container>
    );
}
