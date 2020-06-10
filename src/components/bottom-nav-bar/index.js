import React, { useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import matchSorter from 'match-sorter';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Favorite from '@material-ui/icons/Favorite';
import Visibility from '@material-ui/icons/Visibility';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { CTX } from '../../Store';
import { Auth } from 'aws-amplify';
import Axios from 'axios';
import { Menu, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function BottomAppBar() {
    const classes = useStyles();
    let history = useHistory();
    const [{ movies, loggedUser }, dispatch] = useContext(CTX);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToNewMovie = () => {
        history.push('/newmovie');
    };

    const goToFavsMovies = () => {
        history.push('/movies');
    };

    const logout = async () => {
        await Auth.signOut();
        dispatch({ type: 'SET_AUTH_USER', payload: '' });
        history.push('/login');
    };

    const filterMovies = async (e) => {
        if (!e.target.value) {
            dispatch({ type: 'LOADER_ON' });
            const currentSession = await Auth.currentSession();
            if (currentSession) {
                const { data } = await Axios.get(
                    `https://wjaf9crgh2.execute-api.us-east-2.amazonaws.com/dev/movies/${loggedUser.username}`,
                    {
                        headers: {
                            Authorization: `${currentSession.idToken.jwtToken}`,
                        },
                    }
                );
                dispatch({ type: 'SET_MOVIES', payload: data });
            }
        } else {
            const moviesFiltered = matchSorter(movies, e.target.value, {
                keys: ['title', 'director', 'year'],
            });
            dispatch({ type: 'SET_MOVIES', payload: moviesFiltered });
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />

            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => goToFavsMovies()}
                    >
                        <Favorite />
                    </IconButton>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => goToFavsMovies()}
                    >
                        <Visibility />
                    </IconButton>
                    <Fab
                        color="secondary"
                        aria-label="add"
                        className={classes.fabButton}
                    >
                        <AddIcon onClick={() => goToNewMovie()} />
                    </Fab>

                    <div className={classes.grow} />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={filterMovies}
                        />
                    </div>
                    <IconButton edge="end" color="inherit" onClick={handleClick}>
                        <MoreIcon />
                    </IconButton>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem> */}
                        <MenuItem onClick={() => logout()}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
