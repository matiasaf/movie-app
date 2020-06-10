import React, { useContext } from 'react';
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { CTX } from '../../Store';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MovieCreation from '@material-ui/icons/MovieCreation';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    colorLink: {
        color: 'white',
    },
}));

export default function NewMoviePage() {
    const classes = useStyles();
    let history = useHistory();
    const { register, errors, handleSubmit } = useForm();
    const [{loggedUser}, dispatch] = useContext(CTX);

    const saveMovie = async ({ title, year, director, imageUrl }) => {
        const currentSession = await Auth.currentSession();
        const movie = {
            title,
            year,
            director,
            imageUrl,
            userId: loggedUser.username,
        };

        const res = await axios.post(
            'https://wjaf9crgh2.execute-api.us-east-2.amazonaws.com/dev/movies',
            movie,
            {
                headers: {
                    Authorization: `${currentSession.idToken.jwtToken}`,
                },
            }
        );
        history.push('/movies')
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <MovieCreation />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add a movie
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit((data) => saveMovie(data))}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Title"
                        inputRef={register}
                        name="title"
                        autoComplete="title"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        inputRef={register}
                        name="director"
                        label="Director"
                        autoComplete="director"
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        inputRef={register}
                        name="year"
                        label="Year"
                        autoComplete="year"
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        inputRef={register}
                        name="imageUrl"
                        label="ImageUrl"
                        autoComplete="imageUrl"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Add it
                    </Button>
                </form>
            </div>
        </Container>
    );
}
