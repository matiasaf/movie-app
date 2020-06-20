import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Auth } from 'aws-amplify';
import { Grid, makeStyles } from '@material-ui/core';
import './index.css';

const useStyles = makeStyles((theme) => ({
  
}));

export default function MovieScript({movieName}) {
    const [script, setScript] = useState('');
    const classes = useStyles();

    const getScript = async (movieName) => {
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
        }
    };
    useEffect(() => {
        getScript(movieName);
    }, []);

    return (
        <Grid container>
            <Grid item xs={12} sm={3}>
                <div className="script-text">
                    <pre dangerouslySetInnerHTML={{ __html: script }}></pre>
                </div>
            </Grid>
        </Grid>
    );
}
