import React, { useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import { useHistory } from 'react-router-dom';
import { StarRate } from '@material-ui/icons';
import { yellow } from '@material-ui/core/colors';
import { CTX } from '../../Store';
import Axios from 'axios';
import { Auth } from 'aws-amplify';
import config from '../../config';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: 370,
        marginTop: 15,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        width: 266,
    },
    cover: {
        width: 105,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    favIcon: {
        height: 38,
        width: 38,
    },
    fav: {
        height: 38,
        width: 38,
        color: 'red',
    },
    star: {
        color: '#fdd835',
    },
}));

export default function MovieCard({ movie }) {
    const [{ loggedUser }, dispatch] = useContext(CTX);

    const classes = useStyles();
    const theme = useTheme();
    let history = useHistory();

    const openMovieDetails = () => {
        let id = movie.id;
        if (isNaN(id)) {
            id = id.replace(loggedUser.username, '');
        }
        history.push(`/movie-details/${id}`, movie);
    };
    const addFavourite = async () => {
        const _movie = {
            ...movie,
            userId: loggedUser.username,
            id: movie.id + loggedUser.username,
        };
        const currentSession = await Auth.currentSession();
        if (currentSession) {
            const { res } = await Axios.patch(
                `${config.apiGateway.URL}/movie/favourite/${
                    movie.id + loggedUser.username
                }`,
                _movie,
                {
                    headers: {
                        Authorization: `${currentSession.idToken.jwtToken}`,
                    },
                }
            );
        }
    };

    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {movie.title}
                    </Typography>
                    <StarRate className={classes.star} />{' '}
                    <strong>{movie.vote_average} </strong>({movie.vote_count})
                    <Typography variant="subtitle1" color="textSecondary">
                        Release date : {movie.release_date}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <IconButton aria-label="fav" onClick={() => addFavourite()}>
                        {!movie.is_fav && (
                            <FavoriteBorder className={classes.favIcon} />
                        )}
                        {movie.is_fav && <Favorite className={classes.fav} />}
                    </IconButton>
                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                title={movie.title}
                onClick={() => openMovieDetails()}
            />
        </Card>
    );
}
