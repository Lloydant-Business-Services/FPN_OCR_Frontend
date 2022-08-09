import React from "react";
import { Component } from "react";
import $ from "jquery";
import Bitmap from "../../../assets/images/NewTeller1.jpg";
import BitmapSuperTeller from "../../../assets/images/NewSuperTeller.jpg";
import BitmapAdmin from "../../../assets/images/NewSuperAdmin.jpg";
import logo from "../../../assets/images/17.png";
import KulLoader from "../../../components/Loader/PageLoader/KulPayLoader";
import { enquireScreen } from "enquire-js";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import { loginUser, userLoggedIn, USER_KEY } from "../../../utils/auth";
import { Modal, Button, Space, Alert } from "antd";
import Endpoint from "../../../utils/endpoint";
import {handleFormSubmissionError} from "../../../utils/helpers";
import NEKEDE_LOGO from "../../../assets/images/nekedLogo.png";

var Teller = {
    
    height: "100vh",
    // backgroundImage: `url(${Bitmap})`,
    backgroundSize: "cover",
};
var SuperTeller = {
    
    height: "100vh",
    // backgroundImage: `url(${BitmapSuperTeller})`,
    backgroundSize: "cover",
};
var SuperAdmin = {
    
    height: "100vh",
    background:"#032d88",
    // backgroundImage: `url(${BitmapAdmin})`,
    backgroundSize: "cover",
};
var SuperAdminMobile = {
    
    height: "38vh",
    // backgroundImage: `url(${BitmapAdmin})`,
    background:"blue",
    backgroundSize: "cover",
    marginTop:'0px'
};
function error() {
    Modal.error({
        title: "This is an error message",
        content: "some messages...some messages...",
    });
}
class SignIn extends Component {
    state = {
        resolveRole: this.props.location?.state?.identifier,
        isVerified: this.props.location?.state?.redirectProps,
        email:this.props.location?.state?.email,
        payLoad: JSON.parse(localStorage.getItem(USER_KEY)),
    };
    handleInput = (event) => {
        this.setState({isVerified:null})
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };
    isLoadedFunc = () => {
        var image = document.querySelector("img");
        var isLoaded = image.complete && image.naturalHeight !== 0;
        if (isLoaded) {
            setTimeout(() => {
                $("#preloader").delay(450).fadeOut("slow");
            }, 1000);
        }
    };

    
    handleSignIn = () => {
        if(this.state.email == null || this.state.pass == null){
            //this.setState({promptEnter:true})
            $("#emptyFields").fadeIn();
            return;
        }
        $("#preloader").fadeIn("slow");
        const payload = {
                "userName": this.state.email,
                "password": this.state.pass
        }
        Endpoint.login(payload)
        .then((res) => {
            console.log(res)
            console.log(res.data)
            if(res.status == 200 && res.data.token != null){
                loginUser(res.data.authToken, res.data, true);               
            }
            else{
                $("#preloader").fadeOut("slow");
                $("#invalidLogin").fadeIn();
                    return
               
            }
            
                $("#preloader").fadeOut("slow");
            
        })
        .catch((error) => {
            //handleFormSubmissionError(error, this);

            this.setState({
                loginMessage:error.statusText
            })
            console.log(error, "error")
         
            $("#preloader").fadeOut("slow");
                $("#invalidLogin").fadeIn();
        })
        // setTimeout(() => {
        //     var status = loginUser("token", this.state.email, true);
        //     if (!status) {
                
        //         $("#invalidLogin").fadeIn();

        //         this.setState({
        //             invalidLogin: true,
        //         });
        //         $("#preloader").fadeOut("slow");
        //     }
        // }, 1000);
    };

    InitializeUser(){
        if(userLoggedIn()){
            loginUser(this.state.payLoad?.authToken, this.state.payLoad, true);   
        }
        else{
            //alert("f")
        }
    }
    clearInputFields(){
        document.getElementById("user").value = "";
        document.getElementById("pass").value = "";
    }
    componentDidMount() {
      this.InitializeUser();
        setTimeout(() => {
            this.isLoadedFunc();
            this.clearInputFields();
        }, 1500);

        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }

    render() {
        require("antd/dist/antd.css");
        // window.addEventListener("load", (event) => {
        //     var image = document.querySelector("img");
        //     var isLoaded = image.complete && image.naturalHeight !== 0;
        //     if (isLoaded) {
        //         setTimeout(() => {
        //             $("#preloader").delay(450).fadeOut("slow");
        //         }, 2000);
        //     }
        // });
        let screen_height = $(window).height();
        const { isMobile } = this.state;

        return (
            <div>
                <div id="preloader">
                    <div id="status">
                        <StageSpinner color="#fff" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>

                {/* <KulLoader/> */}
                <div className="row">
                    {!isMobile ? (
                        <div className="col-sm-6" style={this.state.resolveRole === "Teller" ? Teller : this.state.resolveRole == "SuperTeller" ? SuperTeller : SuperAdmin}>
                            <center style={{ marginTop: "20vh" }}>
                                <img src={NEKEDE_LOGO} style={{ width: "27em", opacity:"0.6" }} />
                                {/* <img style={{position:'absolute', left:'84rem', top:'4rem', fontSize:"11em", color:"#ffffff0f", width:"25rem", opacity:"0.3"}} src={NEKEDE_LOGO}/> */}
                                <br />
                                {this.state.resolveRole === "Teller" ? 
                                 <p style={{ color: "#FFF" }} className="manrope-text">
                                    Teller
                                </p> : 
                                this.state.resolveRole == "SuperTeller" ? 
                                <p style={{ color: "#FFF" }} className="manrope-text">
                                Super Teller
                            </p> : 
                            <>
                             <img style={{position:'absolute', left:'84rem', top:'4rem', fontSize:"11em", color:"#ffffff0f", width:"25rem", opacity:"0.3"}} src={NEKEDE_LOGO}/>
                             <h2 className="mt-2 maitree" style={{color:"#ffffffe6", fontSize:"53px"}}>FPNO <span style={{fontSize:"25px"}}>Optical Character Recognition Software</span></h2>
                            </>
                            
                            }

                                {/* <p style={{ color: "#FFF" }} className="manrope">
                                    Teller
                                </p> */}
                            </center>
                        </div>
                    ) : 
                    
                    <div className="container" style={SuperAdminMobile}>
                    <center style={{ marginTop: "100px" }}>
                        <img src={logo} style={{ width: "100.24px" }} />
                        <br />
                        {this.state.resolveRole === "Teller" ? 
                         <p style={{ color: "#FFF" }} className="manrope-text">
                            Teller
                        </p> : 
                        this.state.resolveRole == "SuperTeller" ? 
                        <p style={{ color: "#FFF" }} className="manrope-text">
                        Super Teller
                    </p> : null}

                        {/* <p style={{ color: "#FFF" }} className="manrope">
                            Teller
                        </p> */}
                    </center>
                </div>}
                    <div className="col-sm-12 col-lg-6" style={!isMobile ? { background: "#FFF", minHeight: "100vh" } : { background: "#FFF", minHeight: "60vh" }}>
                        <div className={isMobile ? "container-fluid" : "cust-container3"}>
                            <div class="custom-form col-sm-10" style={!isMobile ? {marginTop:'5vh'} : null}>
                                <center>
                                <h2 class="text-center" style={!isMobile ? { fontSize: "25px", fontWeight:"800" } : { fontSize: "28px", marginTop:'20px' }} className=" maitree">
                                   FPNO OCR Solution
                                </h2>
                                <br/>
                                </center>
                                <h2 style={!isMobile ? { fontSize: "19px" } : { fontSize: "28px", marginTop:'20px' }} className="manrope-text mt-3">
                                    Sign In
                                </h2>
                                <div id="invalidLogin" style={{display:'none'}}>
                                    <Alert closable={true} onClose={() => $("#invalidLogin").fadeOut()} message="Invalid login credentials!" description={<p style={!isMobile ? {fontSize:'12px'} : null}>{this.state.loginMessage}</p>} type="error" showIcon className="manrope" />
                                </div>
                                <div id="emptyFields" style={{display:'none'}}>
                                    <Alert closable={true} onClose={() => $("#emptyFields").fadeOut()} message="Login Failed!" description={<p style={!isMobile ? {fontSize:'12px'} : null}>Enter an email address and password!</p>} type="error" showIcon className="manrope" />
                                </div>
                                 {this.state.isVerified != null && this.state.isVerified == "verified" ? (
                                    <Alert closable={true} onClose={() => this.setState({invalidLogin:false})} message="Verification successful!" description={<p style={!isMobile ? {fontSize:'12px'} : null}>Your account was successfully verified. You may login to continue</p>} type="success" showIcon className="manrope" />
                                ) : null}
                                <br />

                                <div class="form-group">
                                    <input type="text" defaultValue={this.state.email} class="form-control manrope-text" style={{ fontSize: "13px" }} name="email" onChange={this.handleInput} id="user" />
                                    <label for="user" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                        Email address
                                    </label>
                                </div>
                                <div className={!isMobile ? "form-group mt-5" : "form-group mt-4"}>
                                    <input type="password" class="form-control manrope-text" name="pass" id="pass" style={{ fontSize: "13px" }} onChange={this.handleInput} />
                                    <label for="pass" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                        Password
                                    </label>
                                </div>
                                <div class="form-group">
                                    <div className="row">
                                        <div className="col-sm-12 col-lg-6">
                                            <p className="manrope-text" style={{ fontSize: "14px", color: "#0e408f" }}>
                                                Forgot password?
                                            </p>
                                        </div>
                                        <div className="col-sm-12 col-lg-6">
                                            <button className="btn btn-primary manrope-text btn-mobile" type="button" onClick={this.handleSignIn} style={{ width: "164px", padding: "11px, 24px, 11px, 24px", fontSize: "14px", height: "48px" }}>
                                                Sign In
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;
