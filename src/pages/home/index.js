import React from 'react';
import { Container, makeStyles, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: '2rem',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: '1.5rem',
        textAlign: 'center',
    },
}));

function HomePage() {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />

            <h1 className={classes.title}>
                Welcome to the best cinema related app.
            </h1>
            <h2 className={classes.subtitle}>
                Please login o register if you are not.
            </h2>
        </Container>
    );
}

export default HomePage;
