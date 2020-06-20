import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Auth } from 'aws-amplify';
import { Grid, makeStyles, Container, CircularProgress } from '@material-ui/core';
import './index.css';

const useStyles = makeStyles((theme) => ({}));

export default function MovieScript({ movieName, match }) {
    const [script, setScript] = useState('');
    const [loader, setLoader] = useState(false);
    const classes = useStyles();

    const getScript = async (movieName) => {
        setLoader(true);
        const currentSession = await Auth.currentSession();
        if (currentSession) {
            const { data } = await Axios.get(
                `https://wjaf9crgh2.execute-api.us-east-2.amazonaws.com/dev/movie/script/${movieName}`,
                {
                    headers: {
                        Authorization: `${currentSession.idToken.jwtToken}`,
                    },
                }
            );
            setScript(data);
            setLoader(false);
        }
    };
    useEffect(() => {
        getScript(match.params.movieName);
    }, [match.params.movieName]);

    return (
        <Container maxWidth="sm">
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <div className="script-text">
                        {loader && <CircularProgress className="loader" />}
                        {!loader && (
                            <pre
                                dangerouslySetInnerHTML={{ __html: script }}
                            ></pre>
                        )}
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}
