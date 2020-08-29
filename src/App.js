import React, { useContext, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import SignIn from './pages/signin';
import Login from './pages/login';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CTX } from './Store';
import ListMovies from './components/listmovies';
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
    const [{}, dispatch] = useContext(CTX);

    const checkAuth = async () => {
        const currentSession = await Auth.currentAuthenticatedUser();
        if (currentSession) {
            dispatch({ type: 'SET_AUTH_USER', payload: currentSession });
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline />
                <BottomAppBar />
                <Container fixed>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <PrivateRoute
                            path="/now-playing"
                            component={NowPlayingMovies}
                        />
                        <PrivateRoute
                            path="/top-rated"
                            component={TopRatedMovies}
                        />

                        <PrivateRoute
                            path="/fav-movies"
                            component={ListFavMovies}
                        />
                        <PrivateRoute
                            path="/to-watch"
                            component={ToWatchMovies}
                        />

                        <PrivateRoute
                            path="/search-movie/:movieName?"
                            component={SearchMoviePage}
                        />

                        <PrivateRoute
                            path="/movie-script/:movieName?"
                            component={MovieScript}
                        />

                        <PrivateRoute
                            exact
                            path="/movie-details/:id"
                            component={MovieDetailsPage}
                        />
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
