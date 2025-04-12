// import React from 'react'
// import {Route, Navigate} from "react-router-dom"
//
// function  isAuth () {
//     const token = localStorage.getItem('token')
//     return token !=null
// }
//
// export const ProtectedRoute = ({ component: Component, ...rest }) => (
//     <Route
//         {...rest}
//         render={props =>
//             isAuth() ? (
//                 <Component {...props} />
//             ) : (
//                 <Navigate to="/login" />
//             )
//         }
//     />
// );

//
// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
//
// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const token = localStorage.getItem('token');
//     return (
//         <Route {...rest} render={
//             props => {
//                 if (token) {
//                     return <Component {...rest} {...props} />
//                 } else {
//                     return <Navigate to={
//                         {
//                             pathname: '/login',
//                             state: {
//                                 from: props.location
//                             }
//                         }
//                     }
//                     />
//                 }
//             }
//         }
//         />
//     )
// }
//

// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
//
// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const isAuthenticated = true// ваша логика аутентификации
//     return isAuthenticated ? (
//         <Route {...rest} element={Component} />
//     ) : (
//         <Navigate to="/login" />
//     );
// };
//
// export default ProtectedRoute;


//
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
//
// const ProtectedRoute = (props) => {
//     return (props.isAuthenticated ? <Outlet /> : <Navigate to="/" />)
// }
// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "./useAuth.jsx";

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    // if ({user} !== null) {
    //     return <Navigate to="/" />
    // }
    return children;


};
