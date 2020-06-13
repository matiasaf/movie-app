import React from 'react';
import {
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    makeStyles,
} from '@material-ui/core';
import AddComment from '../add-comment';

const useStyles = makeStyles((theme) => ({
    rootComments: {
        margin: 'auto',
        maxWidth: 700,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        marginBottom: theme.spacing(4),
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
}));

export default function CommentsSection({ movie }) {
    const classes = useStyles();
    const { comments, id } = movie;
    return (
        <div>
            <List className={classes.rootComments} subheader={<li />}>
                <li key={`section-1`} className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader>{`Comments Sections`}</ListSubheader>
                        {comments &&
                            comments.map((item) => (
                                <ListItem key={`item-${item.id}`}>
                                    <ListItemText primary={`${item.text}`} />
                                </ListItem>
                            ))}
                    </ul>
                </li>
            </List>
            <AddComment movieId={id} />
        </div>
    );
}
