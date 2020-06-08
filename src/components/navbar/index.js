import React, { useContext } from 'react';
import { Auth } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Link, useHistory } from 'react-router-dom';
import { CTX } from '../../Store';
import './navbar.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    menuIcon: {
        textDecoration: 'none',
        color: 'white',
    },
    logoutButton: {
        marginLeft: 10
    }
}));

export default function ButtonAppBar() {
    let history = useHistory();

    const classes = useStyles();
    const [{ loggedUser }, dispatch] = useContext(CTX);

    const logout = async () => {
        await Auth.signOut();
        dispatch({ type: 'SET_AUTH_USER', payload: '' });
        history.push('/login');
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <Link to="/movies" className={classes.menuIcon}>
                            <MenuIcon />
                        </Link>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Movie App
                    </Typography>
                    {!loggedUser && (
                        <div>
                            <Button color="inherit">
                                <Link to="/login" className="login-link">
                                    Login
                                </Link>
                            </Button>
                            <Button color="inherit">
                                <Link to="/register" className="login-link">
                                    Register
                                </Link>
                            </Button>
                        </div>
                    )}
                    {loggedUser && (
                        <div>
                            <Typography variant="h7" className={classes.title}>
                                Hi, {loggedUser.attributes.name}
                            </Typography>
                            <Button color="inherit" onClick={() => logout()}  className={classes.logoutButton}>
                                Logout
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
