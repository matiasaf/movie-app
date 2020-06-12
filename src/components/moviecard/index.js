import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { useHistory } from 'react-router-dom';

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
}));

export default function MovieCard({ movie }) {
    const classes = useStyles();
    const theme = useTheme();
    let history = useHistory();

    const openMovieDetails = () => {
        history.push(`/movie-details/${movie.id}`, movie);
    };

    return (
        <Card className={classes.root} onClick={() => openMovieDetails()}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {movie.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Release date : {movie.release_date}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <IconButton aria-label="play/pause">
                        <FavoriteBorder className={classes.favIcon} />
                    </IconButton>
                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                title={movie.title}
            />
        </Card>
    );
}
