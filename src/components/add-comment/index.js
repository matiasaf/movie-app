import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, makeStyles } from '@material-ui/core';
import config from '../../config';
import { Auth } from 'aws-amplify';
import Axios from 'axios';
import { CTX } from '../../Store';

const useStyles = makeStyles((theme) => ({
    form: {
        margin: 'auto',
        maxWidth: 700,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        marginBottom: theme.spacing(12),
    }
}));

export default function AddComment({ movieId }) {
    const { register, errors, handleSubmit } = useForm();
    const [{ loggedUser }, dispatch] = useContext(CTX);
    const classes = useStyles();

    const addComment = async ({ text }) => {
        const data = {
            commentText: text,
            movieId: movieId,
        };
        
        dispatch({ type: 'ADD_COMMENT', payload: { text: text } });
        
        const currentSession = await Auth.currentSession();
        
        if (currentSession) {
            const { res } = await Axios.patch(
                `${config.apiGateway.URL}/movie/comment/${movieId}`,
                data,
                {
                    headers: {
                        Authorization: `${currentSession.idToken.jwtToken}`,
                    },
                }
            );
        }
    };

    return (
        <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit((data) => addComment(data))}
        >
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Comment"
                inputRef={register}
                name="text"
                autoComplete="text"
                autoFocus
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Add
            </Button>
        </form>
    );
}
