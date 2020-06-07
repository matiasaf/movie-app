import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginTop: 15,
        width: '100%'
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

    return (
        <Card className={classes.root}>
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
                <Button size="small">More info</Button>
            </CardActions> */}
        </Card>
    );
}
