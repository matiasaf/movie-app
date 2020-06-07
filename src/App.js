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

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode]
    );
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
                    {/* <SignIn /> */}
                    {/* {!loggedUser && <Login />}
                    {loggedUser && <ListMovies />} */}
                    <Switch>
                        <PrivateRoute exact path="/" component={ListMovies} />
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
