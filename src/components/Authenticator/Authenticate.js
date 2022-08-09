import React from 'react';
import {Redirect, Route, withRouter} from "react-router-dom";
import {userType} from "../../utils/Identifiers";
import {getUser, loadUserInfo, userLoggedIn, logOutUser, clearStore} from "../../utils/auth";

export const AuthRoute = withRouter(({component: Component, path, authorized, ...rest}) => {

    return <Route path={path} component={Component} {...rest}/>
    // if (userLoggedIn()) {
    //     const user = getUser();
    //     if (!user) {
    //         loadUserInfo();
    //     }

    //     if (authorized.length && user) {
    //         loadUserInfo();

    //         if (!authorized.includes(user.role)) {
    //             clearStore()
    //             return <Redirect from={path} to={`/signin`}/>
    //         }
    //     }

    //     return <Route path={path} component={Component} {...rest}/>
    // } else
    //     return <Redirect from={path} to={`/signin`}/>
});

export const UnAuthRoute = withRouter(({component: Component, path, ...rest}) => {
    // const user = getUser();
   
        return <Route path={path} component={Component} {...rest}/>

});