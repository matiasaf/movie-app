import React, { useContext, useEffect, useState } from 'react';
import {
    Paper,
    Typography,
    makeStyles,
    Grid,
    ButtonBase,
    List,
    ListSubheader,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import Axios from 'axios';
import { CTX } from '../../Store';
import { Auth } from 'aws-amplify';
import BottomAppBar from '../../components/bottom-nav-bar';
import CommentsSection from '../../components/comments-section';

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
        width: '100%',
        height: '100%',
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
}));

export default function MovieDetailsPage({ location, match }) {
    const [{ loader, movieDetail }, dispatch] = useContext(CTX);
    const [movie, setMovie] = useState(location.state);
    const classes = useStyles();

    const getMovie = async (id) => {
        dispatch({ type: 'LOADER_ON' });
        // if (!location.state) {
        const currentSession = await Auth.currentSession();
        if (currentSession) {
            const { data } = await Axios.get(
                `https://wjaf9crgh2.execute-api.us-east-2.amazonaws.com/dev/movie/${id}`,
                {
                    headers: {
                        Authorization: `${currentSession.idToken.jwtToken}`,
                    },
                }
            );
            dispatch({ type: 'SET_DETAIL_MOVIE', payload: data });
        }
        // }
    };
    useEffect(() => {
        getMovie(match.params.id);
    }, []);

    return (
        <div>
            <BottomAppBar />
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img
                                    className={classes.img}
                                    alt="complex"
                                    src={
                                        // movie
                                        //     ? movie.imageUrl
                                        //     : movieDetail.imageUrl
                                        movieDetail ? movieDetail.imageUrl : ''
                                    }
                                />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid
                                item
                                xs
                                container
                                direction="column"
                                spacing={2}
                            >
                                <Grid item xs>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Title:{' '}
                                        {
                                            // movie
                                            //     ? movie.title
                                            //     : movieDetail.title
                                            movieDetail ? movieDetail.title : ''
                                        }
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Director:{' '}
                                        {
                                            /* {movie
                                            ? movie.director
                                            : movieDetail.director} */
                                            movieDetail
                                                ? movieDetail.director
                                                : ''
                                        }
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Synopsis:{' '}
                                        {
                                            /* {movie
                                            ? movie.description
                                            : movieDetail.description} */
                                            movieDetail
                                                ? movieDetail.description
                                                : ''
                                        }
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    {
                                        /* {movie ? movie.year : movieDetail.year} */
                                        movieDetail
                                            ? movieDetail.year
                                            : ''
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

                <CommentsSection movie={movieDetail} />
            </div>
        </div>
    );
}
