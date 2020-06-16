import Axios from "axios";
import config from "../../config";
import { Auth } from "aws-amplify";


export const addFilmaffinityId = async(dispatch, movieDetail, fa_id) => {
    const currentSession = await Auth.currentSession();

    dispatch({
        type: 'SET_DETAIL_MOVIE',
        payload: { ...movieDetail, fa_id: fa_id },
    });

    const data = { fa_id: fa_id };

    if (currentSession) {
        const { res } = await Axios.patch(
            `${config.apiGateway.URL}/movie/add_fa_id/${movieDetail.id}`,
            data,
            {
                headers: {
                    Authorization: `${currentSession.idToken.jwtToken}`,
                },
            }
        );
    }
}