import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardMedia, CardActions, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginTop: 15,
        width: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function MovieCard({ movie }) {
    const classes = useStyles();
    let history = useHistory();

    const openMovieDetails = () => {
        history.push(`/movie-details/${movie.id}`, movie);
    };

    return (
        <Card className={classes.root} onClick={() => openMovieDetails()}>
            <CardMedia
                className={classes.media}
                image={movie.imageUrl ? movie.imageUrl : ''}
                title="Paella dish"
            />
            <CardContent>
                <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                >
                    {movie.director}
                </Typography>
                <Typography variant="h5" component="h2">
                    {movie.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {movie.year}
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">More details</Button>
            </CardActions> */}
        </Card>
    );
}
