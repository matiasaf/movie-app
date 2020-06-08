import React, { useContext, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Axios from 'axios';
import { Favorite } from '@material-ui/icons';

import { CTX } from '../../Store';

import MovieCard from '../moviecard';
import './index.css';

import { CircularProgress } from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BottomAppBar from '../bottom-nav-bar';

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
    loader: {
        marginTop: theme.spacing(4),
    },
}));

export default function ListMovies() {
    const classes = useStyles();
    const [{ movies, loader }, dispatch] = useContext(CTX);

    const getMovies = async () => {
        dispatch({ type: 'LOADER_ON' });

        const _currentsession = await Auth.currentSession();
        if (_currentsession) {
            const { data } = await Axios.get(
                `https://wjaf9crgh2.execute-api.us-east-2.amazonaws.com/dev/movies`,
                {
                    headers: {
                        Authorization: `${_currentsession.idToken.jwtToken}`,
                    },
                }
            );
            dispatch({ type: 'SET_MOVIES', payload: data });
        }
    };
    useEffect(() => {
        getMovies();
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <BottomAppBar />

            <div className={classes.paper}>

                <Avatar className={classes.avatar}>
                    <Favorite />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Movies
                </Typography>

                {loader && <CircularProgress className={classes.loader} />}

                {movies && movies.map((movie) => <MovieCard movie={movie} />)}

            </div>
        </Container>
    );
}

// import React, { useContext, useEffect } from 'react';
// import { Typography, CircularProgress } from '@material-ui/core';
// import { Favorite } from '@material-ui/icons';

// import { CTX } from '../../Store';
// import Axios from 'axios';
// import { Auth } from 'aws-amplify';
// import MovieCard from '../moviecard';
// import './index.css';

// export default function ListMovies() {
//     const [{ movies, loader }, dispatch] = useContext(CTX);

//     const getMovies = async () => {
//         dispatch({ type: 'LOADER_ON' });

//         const _currentsession = await Auth.currentSession();
//         if (_currentsession) {
//             const { data } = await Axios.get(
//                 `https://wjaf9crgh2.execute-api.us-east-2.amazonaws.com/dev/movies`,
//                 {
//                     headers: {
//                         Authorization: `${_currentsession.idToken.jwtToken}`,
//                     },
//                 }
//             );
//             dispatch({ type: 'SET_MOVIES', payload: data });
//         }
//     };
//     useEffect(() => {
//         getMovies();
//     }, []);
//     return (
//         <div className="container">
//             <div>
//                 <Favorite/>
//                 <Typography>movies</Typography>
//             </div>

//             {loader && <CircularProgress />}

//             {movies && movies.map((movie) => <MovieCard movie={movie} />)}
//         </div>
//     );
// }
