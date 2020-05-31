import React, { useEffect, useState } from 'react';
import {
    FormControl,
    InputLabel,
    Button,
    Input,
    Container
} from '@material-ui/core';
import axios from 'axios';
import './App.css';
import MovieCard from './components/moviecard';
import Navbar from './components/navbar';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

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

    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState(null);
    const [year, setYear] = useState(null);
    const [director, setDirector] = useState(null);
    const getMovies = async () => {
        const { data } = await axios.get(
            `https://wjaf9crgh2.execute-api.us-east-2.amazonaws.com/dev/movies`
        );
        setMovies(data);
    };
    useEffect(() => {
        getMovies();
    }, []);

    const handleChangeTitle = (e) => setTitle(e.target.value);
    const handleChangeYear = (e) => setYear(e.target.value);
    const handleChangeDirector = (e) => setDirector(e.target.value);

    const saveMovie = async () => {
        const movie = {
            title,
            year,
            director,
        };
        const res = await axios.post(
            'https://wjaf9crgh2.execute-api.us-east-2.amazonaws.com/dev/movies',
            movie
        );
        console.log(res);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Navbar />
            <Container fixed>
                <div>
                    <header className="App-header">Movies</header>
                    {movies &&
                        movies.map((movie) => <MovieCard movie={movie} />)}
                </div>
                <FormControl>
                    <InputLabel htmlFor="my-input">Titulo:</InputLabel>
                    <Input onChange={(e) => handleChangeTitle(e)} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Año:</InputLabel>
                    <Input onChange={(e) => handleChangeYear(e)} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Director:</InputLabel>
                    <Input onChange={(e) => handleChangeDirector(e)} />
                </FormControl>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => saveMovie()}
                >
                    Guardar
                </Button>
            </Container>
        </ThemeProvider>
    );
}

export default App;
