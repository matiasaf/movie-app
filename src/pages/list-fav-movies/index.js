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

export default function ListFavMovies() {
    const classes = useStyles();
    const { register, errors, handleSubmit } = useForm();

    const [{ movies, loggedUser, loader }, dispatch] = useContext(CTX);
    const [page, setPage] = useState(1);

    const getFavsMovies = async () => {
        const user = await Auth.currentAuthenticatedUser();
        const { data } = await Axios.get(`${config.apiGateway.URL}/movies/fav/${user.username}`);
        console.log(data);
        dispatch({ type: 'SET_MOVIES', payload: data });
    };

    // const fetchMoreMovies = async () => {
    //     let _page = page + 1;
    //     const { data } = await Axios.get(
    //         `${config.themovieDB.API_URL}/movie/top_rated${config.themovieDB.API_KEY}&page=${_page}`
    //     );
    //     dispatch({ type: 'ADD_MOVIES', payload: data.results });
    //     setPage(_page);
    // };

    useEffect(() => {
        getFavsMovies();
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Stars />
                </Avatar>
                <Typography component="h1" variant="h5">
                    My Favs Movies
                </Typography>

                {loader && <CircularProgress className={classes.loader} />}

                {/* <InfiniteScroll
                    dataLength={movies.length} //This is important field to render the next data
                    next={fetchMoreMovies}
                    hasMore={true}
                    loader={<CircularProgress className={classes.loader} />}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                > */}
                {movies && (
                    <div className={classes.list}>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                )}
                {/* </InfiniteScroll> */}
            </div>
        </Container>
    );
}
