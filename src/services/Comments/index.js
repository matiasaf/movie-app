import { Auth } from 'aws-amplify';
import Axios from 'axios';
import config from '../../config';

export const deleteComment = async (dispatch, commentId, movieId) => {
    dispatch({ type: 'REMOVE_COMMENT', payload: commentId });
    const currentSession = await Auth.currentSession();
    const { res } = await Axios.patch(
        `${config.apiGateway.URL}/movie/delete/comment/${commentId}`,
        { movieId },
        {
            headers: {
                Authorization: `${currentSession.idToken.jwtToken}`,
            },
        }
    );
};
