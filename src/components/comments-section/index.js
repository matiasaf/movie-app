import React, { useContext } from 'react';
import {
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    makeStyles,
    Button,
} from '@material-ui/core';
import AddComment from '../add-comment';
import { CTX } from '../../Store';
import { deleteComment } from '../../services/Comments';

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
    const [{}, dispatch] = useContext(CTX);
    const classes = useStyles();
    const { comments, id } = movie;

    const _delete = async (commentId) => {
        await deleteComment(dispatch, commentId, movie.id);
    };
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
                                    <Button onClick={() => _delete(item.id)}>
                                        x
                                    </Button>
                                </ListItem>
                            ))}
                    </ul>
                </li>
            </List>
            <AddComment movieId={id} />
        </div>
    );
}
