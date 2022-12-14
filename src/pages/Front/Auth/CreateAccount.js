import React from "react";
import { Component } from "react";
import $ from "jquery";
import Bitmap from "../../../assets/images/NewTeller1.jpg";
import BitmapSuperTeller from "../../../assets/images/NewSuperTeller.jpg";
import BitmapAdmin from "../../../assets/images/NewSuperAdmin.jpg";
import remove_red_eye from "../../../assets/images/remove_red_eye.svg";
import * as Unicons from '@iconscout/react-unicons';
import KulLoader from "../../../components/Loader/PageLoader/KulPayLoader";
import { enquireScreen } from "enquire-js";
import logo from "../../../assets/images/17.png";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import { loginUser } from "../../../utils/auth";
import Endpoint from "../../../utils/endpoint";
import {handleFormSubmissionError} from "../../../utils/helpers";
import { Modal, Button, Space, Alert } from "antd";
import { Link } from "react-router-dom";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import VerifyIdentity from "./VerifyIdentity";
import VerifyAccount from "./VerifyAccount";



var Teller = {
    height: "100vh",
    backgroundImage: `url(${Bitmap})`,
    backgroundSize: "cover",
};
var SuperTeller = {
    height: "100vh",
    backgroundImage: `url(${BitmapSuperTeller})`,
    backgroundSize: "cover",
};
var SuperAdmin = {
    height: "100vh",
    backgroundImage: `url(${BitmapAdmin})`,
    backgroundSize: "cover",
};

var SuperAdminMobile = {
    height: "38vh",
    backgroundImage: `url(${BitmapAdmin})`,
    backgroundSize: "cover",
    marginTop: "0px",
};
function error() {
    Modal.error({
        title: "This is an error message",
        content: "some messages...some messages...",
    });
}
class CreateAccount extends Component {
    state = {
        resolveRole: this.props.location?.state?.identifier,
        verify_identity:false,
        create_account:true,
        mockObj: {
            emailAddress: "miracleoghenemado@gmail.com",
            id: "2d948261-05c7-4e73-a074-47d1fada7866",
            isEmail: false,
            isPhoneNo: false,
            phoneNo: "08068247820",


            // emailAddress: "miracle.speed@yahoo.com",
            // id: "8c1d0f3b-ca83-47a6-a113-2ec07c27d3f8",
            // isEmail: false,
            // isPhoneNo: false,
            // phoneNo: "07088582107"
        }
        // verify_account:true
    };
    handleInput = (event) => {
        this.setState({validationError:false})
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };
    onChangeEmail = (e) => {
        if(!e.target.value.includes("@")){
            this.setState({isEmailInvalid:true, isEmailValid:false})
        }
        if(e.target.value.includes("@")){
            this.setState({isEmailInvalid:false, isEmailValid:true, email: e.target.value})
        }
    }

    passwordCompare = (e) => {
        if(e.target.value != this.state.password){
            this.setState({passwordMismatch:true, passwordMatch:false})
        }
        if(e.target.value === this.state.password){
            this.setState({passwordMismatch:false, passwordMatch: true, confirm_password:e.target.value})
        }        
    }
    isLoadedFunc = () => {
        var image = document.querySelector("img");
        var isLoaded = image.complete && image.naturalHeight !== 0;
        if (isLoaded) {
            setTimeout(() => {
                $("#preloader").delay(450).fadeOut("slow");
            }, 1000);
        }
    };
    handleValidation = () => {
        let isAgreed = document.getElementById("isAgreed");
        if(this.state.first_name == null || this.state.last_name == null){           
            this.setState({validationError:true, validationMessage:"Enter First name and Last name"})
            return false;
        }
        if(this.state.email == null || !this.state.email.includes("@")){
            this.setState({validationError:true, validationMessage:"Enter a valid email address"})
            return false;
        }
        if(this.state.confirm_password != this.state.password){
            this.setState({validationError:true, validationMessage:"Password and confirm password mismatch!"})
            return false;
        }
        if(!isAgreed.checked){
            this.setState({validationError:true, validationMessage:"Agree to our terms and conditions."})
            return false;
        }
        return true;
    }
    handleCreateAccount = () => {
        setTimeout(() => {
            this.setState({                       
                //responseData:res.data,
                //create_account:false,
                //verify_identity:true,
            })
                $("#preloader").fadeOut("slow");
            
        }, 1000);
        const isValidated = this.handleValidation();
        if(isValidated){
            $("#preloader").fadeIn("slow");
            const payload = {
                "firstName": this.state.first_name,
                "lastName": this.state.last_name,
                "emailAddress": this.state.email,
                "phoneNo": this.state.phone,
                "password": this.state.password
            }

            Endpoint.schoolSignUp(payload)
            .then((res) => {
                console.log(res)
                console.log(res.data)
                setTimeout(() => {
                    this.setState({                       
                        responseData:res.data,
                        create_account:false,
                        verify_identity:true,
                    })
                        $("#preloader").fadeOut("slow");
                    
                }, 1000);
            })
            .catch((error) => {
                console.log(error.data.message, "Error")
                this.setState({
                    validationError:true,
                    validationMessage: error.data.message
                })
                handleFormSubmissionError(error, this);
            })
            
        }
      
    };
    componentDidMount() {
        setTimeout(() => {
            this.isLoadedFunc();
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
                        <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} />
                        <StageSpinner color="#05EEC0" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>

                {/* <KulLoader/> */}
                <div className="row" style={isMobile ? { paddingLeft: "10px" } : null}>
                    {!isMobile ? (
                        <div className="col-sm-6" style={SuperAdmin}>
                            <center style={{ marginTop: "420px" }}>
                                <img src={logo} style={{ width: "173.24px" }} />
                                <br />
                                {this.state.resolveRole === "Teller" ? (
                                    <p style={{ color: "#FFF" }} className="manrope-text">
                                        Teller
                                    </p>
                                ) : this.state.resolveRole == "SuperTeller" ? (
                                    <p style={{ color: "#FFF" }} className="manrope-text">
                                        Super Teller
                                    </p>
                                ) : null}

                                {/* <p style={{ color: "#FFF" }} className="manrope">
                                    Teller
                                </p> */}
                            </center>
                        </div>
                    ) : (
                        <div className="container" style={SuperAdminMobile}>
                            <center style={{ marginTop: "100px" }}>
                                <img src={logo} style={{ width: "100.24px" }} />
                                <br />
                                {this.state.resolveRole === "Teller" ? (
                                    <p style={{ color: "#FFF" }} className="manrope-text">
                                        Teller
                                    </p>
                                ) : this.state.resolveRole == "SuperTeller" ? (
                                    <p style={{ color: "#FFF" }} className="manrope-text">
                                        Super Teller
                                    </p>
                                ) : null}

                                {/* <p style={{ color: "#FFF" }} className="manrope">
                            Teller
                        </p> */}
                            </center>
                        </div>
                    )}
                    {this.state.create_account ? <div className="col-sm-12 col-lg-6" style={{ background: "#FFF", minHeight: "100vh" }}>
                        <div className={isMobile ? "mobile-container-fluid" : "cust-container4"}>
                            <div className={!isMobile ? "custom-form col-sm-10" : "custom-form col-sm-10 mt-4"}>
                                <h2 style={!isMobile ? { fontSize: "36px" } : { fontSize: "31px" }} className="manrope-text">
                                    Create an account
                                </h2>
                                <p className="manrope-text" style={{ fontSize: "14px", marginTop: "-10px" }}>
                                    Already have an account?{" "}
                                    <span style={{ color: "#0e408f", cursor: "pointer" }}>
                                        <Link style={{ color: "#0e408f" }} to={{ pathname: "/signin" }}>
                                            Sign in
                                        </Link>
                                    </span>
                                </p>
                                <br />

                                {/* {this.state.error ?
                                                    <div className="bg-danger border-rad-full text-center p-2 mb-3">
                                                        <p className="small text-white mb-0">
                                                            <Unicons.UilBell size="20"/> {this.state.errorMessage}
                                                        </p>
                                                    </div>
                                                    : null
                                                } */}
                                                <br/>
                                {/* {this.state.invalidLogin ? (
                                    <Alert closable={true} onClose={() => this.setState({invalidLogin:false})} message="Invalid login credentials!" description={<p style={!isMobile ? {fontSize:'12px'} : null}>Your email and password could not be validated. Kindly double check and try again</p>} type="error" showIcon className="manrope" />
                                ) : null} */}
                                {this.state.validationError ? (
                                    <Alert closable={true} onClose={() => this.setState({validationError:false})} message="Validation error!" description={<p style={!isMobile ? {fontSize:'12px'} : null}>{this.state.validationMessage}</p>} type="error" showIcon className="manrope" />
                                ) : null}
                                <br />

                                <div class="row">
                                    <div class="col-xl-6 col-sm-12">
                                        <div class="form-group">
                                            <input type="text" class="form-control manrope-text drk-text" style={{ fontSize: "13px" }} name="first_name" onChange={this.handleInput} id="first_name" />
                                            <label for="first_name" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                First name
                                            </label>
                                        </div>
                                    </div>
                                    <br />
                                    <div className={!isMobile ? "col-xl-6 col-sm-12" : "col-xl-6 col-sm-12 mt-3"}>
                                        <div class="form-group">
                                            <input type="text" onChange={this.handleInput} class="form-control manrope-text drk-text" name="last_name" id="last_name" style={{ fontSize: "13px" }} />
                                            <label for="last_name" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Last name
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-xl-12 col-sm-12">
                                        <div class="form-group">
                                            <input type="email" class="form-control manrope-text drk-text" style={{ fontSize: "13px" }} name="email" onChange={this.onChangeEmail} id="email" />
                                            <label for="email" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Email address
                                            </label>
                                        
                                        </div>
                                        <div style={{marginTop:'-15px'}}>
                                        {this.state.isEmailValid ? <small className="text-success">Email address is valid &nbsp; <i className="fa fa-check"/></small> : null}
                                        {this.state.isEmailInvalid ? <small className="text-danger">Email address is not valid. Keep going  <i className="fa fa-times"/></small> : null}
                                        </div>
                                    </div>
                                </div>
                                <br />
                               
                                <div class="row mt-3">
                                    <div class="col-xl-12 col-sm-12">
                                        <div class="form-group">
                                            <input type="number" class="form-control manrope-text drk-text" value={this.state.phone} style={{ fontSize: "13px" }} name="phone" onChange={this.handleInput} id="phone" />
                                            <label for="phone" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Phone Number
                                            </label>
                                        
                                        </div>
                                        {/* <div style={{marginTop:'-15px'}}>
                                        {this.state.isEmailValid ? <small className="text-success">Email address is valid &nbsp; <i className="fa fa-check"/></small> : null}
                                        {this.state.isEmailInvalid ? <small className="text-danger">Email address is not valid. Keep going  <i className="fa fa-times"/></small> : null}
                                        </div> */}
                                    </div>
                                </div>
                                <br />
                                <div class="row mt-3">
                                    <div class="col-xl-12 col-sm-12">
                                        <div class="form-group">
                                            {/* <div className="row" 
                                    style={{borderBottom:"1px solid #EBEAED"}}
                                    > */}
                                            {/* <div className="col-sm-12"> */}
                                            <input
                                                type="password"
                                                class="form-control manrope-text drk-text"
                                                style={{
                                                    fontSize: "13px",
                                                    // borderBottom:'none'
                                                }}
                                                name="password"
                                                onChange={this.handleInput}
                                                id="password"
                                            />
                                            {/* </div> */}
                                            {/* <div className="col-sm-2">
                                    {!isMobile ? <img src={remove_red_eye} style={!isMobile ? {minWidth:'16px', marginTop:'-30px'} : null}/> : null}
                                    </div> */}

                                            <label for="password" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Password
                                            </label>
                                        </div>

                                        {/* </div> */}
                                    </div>
                                    <br />
                                    <div class="col-xl-12 col-sm-12 mt-3">
                                        <div class="form-group">
                                            {/* <div className="row" 
                                    style={{borderBottom:"1px solid #EBEAED"}}
                                    > */}
                                            {/* <div className="col-sm-12"> */}
                                            <input
                                                type="password"
                                                class="form-control manrope-text drk-text"
                                                style={{
                                                    fontSize: "13px",
                                                    // borderBottom:'none'
                                                }}
                                                name="confirm_password"
                                                onChange={this.passwordCompare}
                                                id="confirm_password"
                                            />
                                            {/* </div> */}
                                            {/* <div className="col-sm-2">
                                    {!isMobile ? <img src={remove_red_eye} style={!isMobile ? {minWidth:'16px', marginTop:'-30px'} : null}/> : null}
                                    </div> */}

                                            <label for="confirm_password" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Confirm password
                                            </label>
                                        </div>
                                        <div style={{marginTop:'-15px'}}>
                                        {this.state.passwordMatch ? <small className="text-success">Password match! &nbsp; <i className="fa fa-check"/></small> : null}
                                        {this.state.passwordMismatch ? <small className="text-danger">Password mismatch!  <i className="fa fa-times"/></small> : null}
                                        </div>

                                        {/* </div> */}
                                    </div>
                                    {/* </div> */}
                                </div>
                                <div className="row mt-3">
                                    <div className="col-sm-1">
                                        <input type="checkbox" id="isAgreed" name="terms" className="" style={{ marginRight: "10px" }} />
                                    </div>
                                    <div className="col-sm-10">
                                        <div className="form-inline">
                                            <label className="label-control manrope-text-light" style={{ color: "#84818A", fontSize: "12px" }}>
                                                <p className="manrope-text-light" style={{ color: "#84818A", fontSize: "12px" }}>
                                                    By clicking Create account, I agree that I have read and accepted the <span style={{ color: "#0e408f" }}>Terms of Use</span> and <span style={{ color: "#0e408f" }}>Privacy Policy</span>.
                                                </p>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div className="row">
                                        {/* <div className="col-sm-12 col-lg-6">
                                            <p className="manrope-text" style={{ fontSize: "14px", color: "#0e408f" }}>
                                                Forgot password?
                                            </p>
                                        </div> */}
                                        <div className="col-sm-12 col-lg-12">
                                            <button className="btn btn-primary manrope-text" type="button" onClick={this.handleCreateAccount} style={{ width: "100%", padding: "11px, 24px, 11px, 24px", fontSize: "14px", height: "48px" }}>
                                                Create account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null}
                   
                    {this.state.verify_identity ?  <div className="col-sm-12 col-lg-6" style={{ background: "#FFF", minHeight: "100vh" }} id="verify_identity">
                        <VerifyIdentity email={this.state.email} 
                    propData={this.state.responseData}
                    //propData={this.state.mockObj}
                    /> </div>: null}

                    {/* {this.state.verify_account ?  <div className="col-sm-12 col-lg-6" style={{ background: "#FFF", minHeight: "100vh" }} id="verify_identity"><VerifyAccount email={this.state.email}/> </div>: null}
                     */}
               
                </div>
            </div>
        );
    }
}

export default CreateAccount;
