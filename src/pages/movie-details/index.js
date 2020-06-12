import React, { useContext, useEffect, useState } from 'react';
import {
    Paper,
    Typography,
    makeStyles,
    Grid,
    ButtonBase,
    CircularProgress,
} from '@material-ui/core';
import Axios from 'axios';
import { CTX } from '../../Store';
import { Auth } from 'aws-amplify';
import CommentsSection from '../../components/comments-section';
import { ReactComponent as IMDB } from './imdb-logo.svg';
import config from '../../config';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 700,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    image: {
        width: 130,
        // height: '100%',
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    rootComments: {
        margin: 'auto',
        maxWidth: 700,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        marginBottom: theme.spacing(16),
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    imdb: {
        height: 40,
        width: 50,
    },
}));

export default function MovieDetailsPage({ location, match }) {
    const [{ loader, loggedUser, movieDetail }, dispatch] = useContext(CTX);
    const classes = useStyles();

    const getMovie = async (id) => {
        dispatch({ type: 'LOADER_ON' });

        // first check if the movie exist on dynamodb
        const currentSession = await Auth.currentSession();
        try {
            const { data } = await Axios.get(
                `https://wjaf9crgh2.execute-api.us-east-2.amazonaws.com/dev/movie/${id}`,
                {
                    headers: {
                        Authorization: `${currentSession.idToken.jwtToken}`,
                    },
                }
            );
            dispatch({ type: 'SET_DETAIL_MOVIE', payload: data });
        } catch (e) {
            const { data } = await Axios.get(
                `${config.themovieDB.API_URL}/movie/${id}${config.themovieDB.API_KEY}`,
                {
                    headers: {
                        Authorization: `${currentSession.idToken.jwtToken}`,
                    },
                }
            );

            dispatch({ type: 'SET_DETAIL_MOVIE', payload: data });

            const movie = {
                ...data,
                userId: loggedUser.username,
                id: data.id.toString(),
            };
            // insert on dynamodb the movie.
            try {
                await Axios.post(
                    'https://wjaf9crgh2.execute-api.us-east-2.amazonaws.com/dev/movies',
                    movie,
                    {
                        headers: {
                            Authorization: `${currentSession.idToken.jwtToken}`,
                        },
                    }
                );
            } catch (e) {
                console.log(e);
            }
        }
    };
    const goToImdb = (imdb_link) => {
        window.location.href = imdb_link;
    };

    useEffect(() => {
        getMovie(match.params.id);
    }, []);

    return (
        <div>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    {loader && <CircularProgress className={classes.loader} />}
                    {!loader && (
                        <Grid container>
                            <Grid item xs={12} sm={3}>
                                <ButtonBase className={classes.image}>
                                    <img
                                        className={classes.img}
                                        alt="complex"
                                        src={
                                            movieDetail
                                                ? `http://image.tmdb.org/t/p/w185/${movieDetail.poster_path}`
                                                : ''
                                        }
                                    />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography gutterBottom variant="subtitle1">
                                    Title:{' '}
                                    {movieDetail ? movieDetail.title : ''}
                                </Typography>
                                <Typography variant="subtitle1">
                                    {movieDetail
                                        ? movieDetail.release_date
                                        : ''}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Synopsis:{' '}
                                    {movieDetail ? movieDetail.overview : ''}
                                </Typography>
                                <IMDB
                                    className={classes.imdb}
                                    onClick={() =>
                                        goToImdb(
                                            `https://www.imdb.com/title/${movieDetail.imdb_id}`
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                    )}
                </Paper>

                <CommentsSection movie={movieDetail} />
            </div>
        </div>
    );
}
