import React, { useState } from 'react';

function newMoviePage() {
    const [title, setTitle] = useState(null);
    const [year, setYear] = useState(null);
    const [director, setDirector] = useState(null);

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
        <div>
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
        </div>
    );
}
