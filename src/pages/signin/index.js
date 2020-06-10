import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Create from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BottomAppBar from '../../components/bottom-nav-bar';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    colorLink: {
        color: 'white',
    },
}));

export default function Register() {
    const classes = useStyles();
    let history = useHistory();
    const { register, errors, handleSubmit } = useForm();

    const sendRegistration = async ({ username, password, email }) => {
        const res = await Auth.signUp({
            username,
            password,
            attributes: {
                email: email,
                name: 'Matias',
            },
        });
        history.push('/login');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <BottomAppBar />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Create />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit((data) => sendRegistration(data))}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        inputRef={register}
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        inputRef={register}
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        inputRef={register}
                        name="email"
                        label="Email"
                        autoComplete="Email"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create Account
                    </Button>
                </form>
            </div>
        </Container>
    );
}

// import React, { useState } from 'react';
// import { Auth } from 'aws-amplify';

// function Register() {
//     const [username, setUsername] = useState(null);
//     const [password, setPassword] = useState(null);
//     const [email, setEmail] = useState(null);
//     const sendRegistration = async (e) => {
//         const res = await Auth.signUp({
//             username,
//             password,
//             attributes: {
//                 email: email,
//                 name: 'Matias',
//             },
//         });
//         console.log(res);
//     };
//     return (
//         <div>
//             <h1>Registrarse</h1>
//             <label>Usuario:</label>
//             <input type="text" onChange={(e) => setUsername(e.target.value)} />
//             <label>Contraseña:</label>
//             <input type="text" onChange={(e) => setPassword(e.target.value)} />
//             <label>Email:</label>
//             <input type="text" onChange={(e) => setEmail(e.target.value)} />
//             <button onClick={() => sendRegistration()}>OK</button>
//         </div>
//     );
// }

// export default SignIn;
