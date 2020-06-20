import React, { useState, useEffect } from 'react';
import fun from '../../shared/functions';
import './index.css';
import { useHistory } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemText,
    ListItemLink,
    makeStyles,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function LastedScriptsAdded() {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [scripts, setScripts] = useState(Object.keys(fun.listScripts()));
    const [paginateScripts, setPaginatedScripts] = useState([]);
    let history = useHistory();
    const searchForMovie = (movieName) => {
        const _movieName = fun.castNameScript(movieName);
        history.push(`/movie-script/${_movieName}`);
    };
    const handleChangePage = (event, newPage) => {
        console.log(paginate(scripts, pageSize, newPage));
        setPage(newPage);
        setPaginatedScripts(paginate(scripts, pageSize, newPage));
    };

    const paginate = (array, page_size, page_number) => {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        return array.slice(
            (page_number - 1) * page_size,
            page_number * page_size
        );
    };

    useEffect(() => {
        setPaginatedScripts(paginate(scripts, pageSize, 1));
    }, []);
    return (
        <div className="lasted-scripts">
            <List component="nav" aria-label="secondary mailbox folders">
                <h1 className="title-scripts">Lasted scripts added</h1>

                {paginateScripts.map((movie) => (
                    <ListItem button onClick={() => searchForMovie(movie)}>
                        <ListItemText primary={movie} />
                    </ListItem>
                ))}

                <Pagination
                    count={scripts.length / pageSize}
                    page={page}
                    onChange={handleChangePage}
                />

                {/* <ListItemLink href="#simple-list">
                    <ListItemText primary="Spam" />
                </ListItemLink> */}
            </List>
        </div>
    );
}
