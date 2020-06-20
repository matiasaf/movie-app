import React, { useContext, useEffect, useState } from 'react';
import {
    Paper,
    Typography,
    makeStyles,
    Grid,
    ButtonBase,
    CircularProgress,
    TextField,
    Button,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {
    Visibility,
    VisibilityOff,
    FavoriteBorder,
    Favorite,
} from '@material-ui/icons';

import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { CTX } from '../../Store';
import { Auth } from 'aws-amplify';
import CommentsSection from '../../components/comments-section';
import { ReactComponent as IMDB } from './imdb-logo.svg';
import { ReactComponent as FAIcon } from './fa-icon.svg';
import config from '../../config';
import { addFilmaffinityId } from '../../services/Movies';
import MovieScript from '../../components/movie-script';
import fun from '../../shared/functions';

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
    fa_icon: {
        height: 30,
        width: 50,
    },
    loader: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        textAlign: 'center',
    },
    form: {
        width: 200,
    },
    submit: {
        marginTop: theme.spacing(3),
    },
    fav: {
        color: 'red',
    },
}));

export default function MovieDetailsPage({ location, match }) {
    const [{ loader, loggedUser, movieDetail }, dispatch] = useContext(CTX);
    const [showScript, setShowScript] = useState(false);
    const classes = useStyles();
    const { register, errors, handleSubmit } = useForm();

    const getMovie = async (id) => {
        dispatch({ type: 'LOADER_ON' });

        // first check if the movie exist on dynamodb
        const currentSession = await Auth.currentSession();
        const user = await Auth.currentAuthenticatedUser();
        try {
            const { data } = await Axios.get(
                `${config.apiGateway.URL}/movie/${id + user.username}`,
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

            const movie = {
                ...data,
                userId: loggedUser.username,
                id: data.id + loggedUser.username,
            };

            dispatch({ type: 'SET_DETAIL_MOVIE', payload: movie });

            // insert on dynamodb the movie.
            try {
                await Axios.post(`${config.apiGateway.URL}/movies`, movie, {
                    headers: {
                        Authorization: `${currentSession.idToken.jwtToken}`,
                    },
                });
            } catch (e) {
                console.log(e);
            }
        }
    };

    const goToImdb = (imdb_link) => {
        window.location.href = imdb_link;
    };

    const goToFA = (fa_link) => {
        // window.location.href = fa_link;
        window.open(fa_link, '_blank');
    };

    const _addFilmaffinityId = async ({ fa_id }) => {
        await addFilmaffinityId(dispatch, movieDetail, fa_id);
    };

    const addFavourite = async () => {
        const movie = { ...movieDetail, is_fav: !movieDetail.is_fav };
        dispatch({
            type: 'SET_DETAIL_MOVIE',
            payload: movie,
        });
        const currentSession = await Auth.currentSession();
        if (currentSession) {
            const { res } = await Axios.patch(
                `${config.apiGateway.URL}/movie/favourite/${movieDetail.id}`,
                movie,
                {
                    headers: {
                        Authorization: `${currentSession.idToken.jwtToken}`,
                    },
                }
            );
        }
    };
    const addToWatch = async () => {
        const movie = { ...movieDetail, setToWatch: !movieDetail.setToWatch };
        dispatch({
            type: 'SET_DETAIL_MOVIE',
            payload: movie,
        });
        const currentSession = await Auth.currentSession();
        if (currentSession) {
            const { res } = await Axios.patch(
                `${config.apiGateway.URL}/movie/to-watch/${movieDetail.id}`,
                movie,
                {
                    headers: {
                        Authorization: `${currentSession.idToken.jwtToken}`,
                    },
                }
            );
        }
    };
    // const castNameScript = (movieName) => {
    //     const names = {
    //         'The Godfather': 'Godfather',
    //         '2001: A Space Odyssey': '2001-A-Space-Odyssey',
    //         'Apocalypse Now': 'Apocalypse-Now',
    //     };
    //     return names[movieName] ? names[movieName] : movieName;
    // };

    useEffect(() => {
        getMovie(match.params.id);
    }, []);

    return (
        <div>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    {loader && (
                        <div className={classes.loader}>
                            {' '}
                            <CircularProgress />{' '}
                        </div>
                    )}
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
                                <IconButton
                                    aria-label="fav"
                                    onClick={() => addFavourite()}
                                >
                                    {!movieDetail.is_fav && (
                                        <FavoriteBorder
                                            className={classes.favIcon}
                                        />
                                    )}
                                    {movieDetail.is_fav && (
                                        <Favorite className={classes.fav} />
                                    )}
                                </IconButton>
                                <IconButton
                                    aria-label="fav"
                                    onClick={() => addToWatch()}
                                >
                                    {!movieDetail.setToWatch && <Visibility />}

                                    {movieDetail.setToWatch && (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
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
                                {movieDetail.fa_id && (
                                    <FAIcon
                                        className={classes.fa_icon}
                                        onClick={() =>
                                            goToFA(
                                                `https://www.filmaffinity.com/es/film${movieDetail.fa_id}.html`
                                            )
                                        }
                                    />
                                )}
                                {!movieDetail.fa_id && (
                                    <form
                                        className={classes.form}
                                        onSubmit={handleSubmit((data) =>
                                            _addFilmaffinityId(data)
                                        )}
                                    >
                                        <Grid container spacing={1}>
                                            <Grid item xs={8}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    label="Filmaffinity Id"
                                                    inputRef={register}
                                                    name="fa_id"
                                                    autoComplete="Filmaffinity Id"
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
                                                    +
                                                </Button>{' '}
                                            </Grid>
                                        </Grid>
                                    </form>
                                )}
                            </Grid>
                            {!loader && !showScript && (
                                <Button
                                    color="primary"
                                    onClick={() => setShowScript(true)}
                                >
                                    Show Script
                                </Button>
                            )}
                        </Grid>
                    )}
                </Paper>
                {!loader && <CommentsSection movie={movieDetail} />}

                {!loader && showScript && (
                    <MovieScript
                        movieName={fun.castNameScript(movieDetail.title)}
                    />
                )}
            </div>
        </div>
    );
}
