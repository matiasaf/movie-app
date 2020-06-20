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
import MovieDetailsPage from './pages/movie-details';
import BottomAppBar from './components/bottom-nav-bar';
import ListPopularMovies from './components/list-popular-movies';
import TopRatedMovies from './pages/top-rated-movies';
import ListFavMovies from './pages/list-fav-movies';
import ToWatchMovies from './pages/to-watch-movies';
import NowPlayingMovies from './pages/now-playing-movies';
import MovieScript from './components/movie-script';
import SearchMoviePage from './pages/search-movie';

function App() {
    const theme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });
    const [{}, dispatch] = useContext(CTX);

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
                {/* <Navbar /> */}
                <BottomAppBar />
                <Container fixed>
                    <Switch>
                        <PrivateRoute path="/movies" component={ListMovies} />
                        <Route path="/popular" component={ListPopularMovies} />
                        <Route path="/top-rated" component={TopRatedMovies} />

                        <Route path="/fav-movies" component={ListFavMovies} />
                        <Route path="/to-watch" component={ToWatchMovies} />
                        <Route path="/now-playing" component={NowPlayingMovies} />
                        <Route path="/movie-script" component={MovieScript} />
                        <Route path="/search-movie" component={SearchMoviePage} />

                        <Route
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
