import React, { useContext, useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import SignIn from './pages/signin';
import Login from './pages/login';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CTX } from './Store';
import PrivateRoute from './components/private-route';
import BottomAppBar from './components/bottom-nav-bar';
import MovieScript from './components/movie-script';
import MovieDetailsPage from './pages/movie-details';
import TopRatedMovies from './pages/top-rated-movies';
import ListFavMovies from './pages/list-fav-movies';
import ToWatchMovies from './pages/to-watch-movies';
import NowPlayingMovies from './pages/now-playing-movies';
import SearchMoviePage from './pages/search-movie';
import HomePage from './pages/home';

function App() {
    const theme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });
    const [{ loggedUser }, dispatch] = useContext(CTX);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const currentSession = await Auth.currentAuthenticatedUser();
            dispatch({ type: 'SET_AUTH_USER', payload: currentSession });
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    if (loading) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BottomAppBar />
                <Container fixed>
                    <h1>Loading...</h1>
                </Container>
            </ThemeProvider>
        );
    } else {
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <CssBaseline />
                    <BottomAppBar />
                    <Container fixed>
                        <Switch>
                            <Route path="/login">
                                <Login />
                            </Route>

                            <Route path="/register">
                                <SignIn />
                            </Route>

                            <Route exact path="/" component={HomePage} />

                            <PrivateRoute
                                path="/now-playing"
                                component={NowPlayingMovies}
                                isAuthenticated={!!loggedUser}
                            />
                            <PrivateRoute
                                path="/top-rated"
                                component={TopRatedMovies}
                                isAuthenticated={!!loggedUser}
                            />

                            <PrivateRoute
                                path="/fav-movies"
                                component={ListFavMovies}
                                isAuthenticated={!!loggedUser}
                            />

                            <PrivateRoute
                                path="/to-watch"
                                component={ToWatchMovies}
                                isAuthenticated={!!loggedUser}
                            />

                            <PrivateRoute
                                path="/search-movie/:movieName?"
                                component={SearchMoviePage}
                                isAuthenticated={!!loggedUser}
                            />

                            <PrivateRoute
                                path="/movie-script/:movieName?"
                                component={MovieScript}
                                isAuthenticated={!!loggedUser}
                            />

                            <PrivateRoute
                                path="/movie-details/:id"
                                component={MovieDetailsPage}
                                isAuthenticated={!!loggedUser}
                            />
                        </Switch>
                    </Container>
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;
