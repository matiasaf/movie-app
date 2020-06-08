import React, { useContext, useEffect } from 'react';
import { Container, CircularProgress } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import SignIn from './pages/signin';
import Login from './pages/login';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CTX } from './Store';
import ListMovies from './components/listmovies';
import PrivateRoute from './components/private-route';
import NewMoviePage from './pages/newmovie';

function App() {
    const theme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });
    const [{ loggedUser }, dispatch] = useContext(CTX);

    const checkAuth = async () => {
        const currentSession = await Auth.currentAuthenticatedUser();
        dispatch({ type: 'SET_AUTH_USER', payload: currentSession });
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline />
                <Navbar />
                <Container fixed>
                    <Switch>
                        <PrivateRoute path="/movies" component={ListMovies} />
                        <PrivateRoute path="/newmovie" component={NewMoviePage} />

                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <SignIn />
                        </Route>
                    </Switch>
                </Container>
            </Router>
        </ThemeProvider>
    );
}

export default App;
