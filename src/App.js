import React, {Component} from 'react';
import "./assets/css/App.css";
//import "./assets/css/Helpers.css";
//import "./assets/css/Colors.css";
import "./assets/css/kul.css";
import "./assets/css/responsive.css";
import "../src/Root.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import FrontBody from "./layouts/FrontBody";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import PageLoader from "./components/Loader/PageLoader/PageLoader";
import {AuthRoute} from "./components/Authenticator/Authenticate";
import ToastContainer from "./components/Popup/ToastContainer";
import {userType} from "./utils/Identifiers";
import AdminBody from "./layouts/AdminBody";
// import SuperAdminBody from "./layouts/SuperAdminBody";
// import SuperTellerBody from "./layouts/SuperTellerBody";
// import TellerBody from "./layouts/TellerBody";
import AccountSettings from "./pages/Common/AccountSettings";
import RecieveContext from "./components/RecieveContext";


import { useSelector } from 'react-redux';
export class App extends Component {
    render() {
        //const birds = useSelector(state => state.birds);
        return (
            <Router>
                <ScrollToTop>
                    <Switch>
    
                        <AuthRoute path="/admin" authorized={[userType.Admin]} component={AdminBody}/>
                        <AuthRoute path="/context" component={RecieveContext}/>
                        
                        <Route component={FrontBody}/>
                        <Route path="/accountsettings" component={AccountSettings}/>
                    </Switch>
                    <PageLoader/>
                    <ToastContainer/>
                </ScrollToTop>
            </Router>
        )
    }
}

export default App
