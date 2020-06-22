import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Stars from '@material-ui/icons/Stars';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Visibility from '@material-ui/icons/Visibility';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    let history = useHistory();
    const [value, setValue] = React.useState(0);

    const handleChange = (e, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 'now-playing':
                history.push('/now-playing');
                break;
            case 'favourites':
                history.push('/fav-movies');
                break;
            case 'top-rated':
                history.push('/top-rated');
                break;
            case 'to-watch':
                history.push('/to-watch');
                break;
            default:
                break;
        }
    };

    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction
                label="Now Playing"
                value="now-playing"
                icon={<PlayArrow />}
            />
            <BottomNavigationAction
                label="Top Rated"
                value="top-rated"
                icon={<Stars />}
            />
            <BottomNavigationAction
                label="Favorites"
                value="favourites"
                icon={<FavoriteIcon />}
            />
            <BottomNavigationAction
                label="To Watch"
                value="to-watch"
                icon={<Visibility />}
            />
        </BottomNavigation>
    );
}
