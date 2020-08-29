import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CTX } from '../../Store';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     const [state, dispatch] = useContext(CTX);
//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 !state.loggedUser ? (
//                     <Redirect to="/login" />
//                 ) : (
//                     <Component {...props} />
//                 )
//             }
//         />
//     );
// };

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}
export default PrivateRoute;
