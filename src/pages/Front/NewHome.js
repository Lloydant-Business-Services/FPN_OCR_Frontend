import React, { Component } from "react";
import { Parallax, OverPack } from "rc-scroll-anim";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
// import * as pageData from "./data";
import ListImg from "../../assets/images/List.jpg";
import pie from "../../assets/images/pie.png";
import dots from "../../assets/images/dots.png";
import check from "../../assets/images/check.png";
import squares from "../../assets/images/Icon2.png";
import bitmap1 from "../../assets/images/man1.jpg";
import syncIcon from "../../assets/images/sync.png";
import womImg from "../../assets/images/man2.jpg";
import iconCheck from "../../assets/images/iconCheck.png";
import bottomBanner from "../../assets/images/Group1582.png";
import blueBottom from "../../assets/images/downBann.png";
import LogoKul from "../../assets/images/LogoKul.png";
import nekedLogo from "../../assets/images/nekedLogo.png";
import twitter from "../../assets/images/tw.png";
import instagram from "../../assets/images/inst.png";
import linkden from "../../assets/images/linkden.png";
import googleIcon from "../../assets/images/gg.png";
import { enquireScreen } from "enquire-js";
import oval from "../../assets/images/Oval.png";
import oval2 from "../../assets/images/Oval2.png";
import Banner from "../Front/Banner";
import Header from "../Front/Header";
import Page1 from "./Page1";
import logo from "../../assets/images/17.png";
import KulLoader from "../../components/Loader/PageLoader/KulPayLoader";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import { Link } from "react-router-dom";
import dashSvg from "../../assets/images/dash-svg.svg";
import notificatiionSvg from "../../assets/images/Notification.svg";
import trans_white from "../../assets/images/transac_white.svg";
import logOutSvg from "../../assets/images/dashprofile-icon.svg";
import settingsTop from "../../assets/images/settings_applications.svg";
import dashTopSvg from "../../assets/images/dash-svg.svg";
import $ from "jquery";
// import '../../assets/static/style';

import { Input } from "antd";
import { Collapse, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Form, InputGroupAddon, InputGroupText, InputGroup, Media, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const { Search } = Input;
// const { page2 } = pageData;
const scrollElements = document.querySelectorAll(".js-scroll");

// const elementInView = (el, dividend = 1) => {
//   const elementTop = el.getBoundingClientRect().top;

//   return (
//     elementTop <=
//     (window.innerHeight || document.documentElement.clientHeight) / dividend
//   );
// };

// const elementOutofView = (el) => {
//   const elementTop = el.getBoundingClientRect().top;

//   return (
//     elementTop > (window.innerHeight || document.documentElement.clientHeight)
//   );
// };

// const displayScrollElement = (element) => {
//   element.classList.add("scrolled");
// };

// const hideScrollElement = (element) => {
//   element.classList.remove("scrolled");
// };

// const handleScrollAnimation = () => {
//   scrollElements.forEach((el) => {
//     if (elementInView(el, 1.25)) {
//       displayScrollElement(el);
//     } else if (elementOutofView(el)) {
//       hideScrollElement(el)
//     }
//   })
// }

// window.addEventListener("scroll", () => {
//   handleScrollAnimation();
// });
export default class Page2 extends Component {
    state = {};
    componentDidMount() {
        window.scroll(0, 0);
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }
    render() {
        window.addEventListener("load", (event) => {
            var image = document.querySelector("img");
            var isLoaded = image.complete && image.naturalHeight !== 0;
            if (isLoaded) {
                setTimeout(() => {
                    $("#preloader").delay(450).fadeOut("slow");
                }, 1000);
            }
        });
        //require('antd/dist/antd.css')
        const { isMobile } = this.state;
        let screen_height = $(window).height();

        return (
            // <OverPack playScale="0.2">
            <div style={{ background: "#FFF" }}>
                <div id="preloader">
                    <div id="status">
                        {/* <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} /> */}
                        <StageSpinner color="#fff" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>
                {/* <KulLoader/> */}

                <div className={!isMobile ? "cust-container" : "container-fluid"}>
                    <nav className="home-nav" style={!isMobile ? { width: "80%" } : null}>
                        <ul>
                            {/* <li>
                                <a className="navbar-brand" href="#">
                                    
                                    <h4 style={{ left: "0rem", top: "0rem", width: "95px", height: "28.96px", fontSize:"22px", color:"#fff" }}>
                                        <img src={nekedLogo} style={{ width: "95px" }} /> FPNO</h4>
                                </a>
                            </li> */}
                            <span className="hide-mobile">
                                {/* <li>
                                    <a className="manrope-text-link-light" href="#">
                                        Portal
                                    </a>
                                </li> */}
                                {/* <li>
                                    <a className="manrope-text-link-light" href="#">
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a className="manrope-text-link-light" href="#">
                                        Contact us
                                    </a>
                                </li> */}
                                <span style={{ float: "right" }}>
                                    <li>
                                        
                                                        <Link to={{ pathname: "/signin" }} className="btn btn-outline-dove manrope" style={{ fontSize: "14px", fontWeight: "700", marginRight: "10px" }}>
                                                            Sign in
                                                        </Link>
                                                   
                                    </li>
                                    {/* <li>
                                        <Link to="/create_account">
                                            <button className="btn btn-dove manrope" style={{ fontSize: "14px", fontWeight: "700" }}>
                                                Create free account
                                            </button>
                                        </Link>
                                    </li> */}
                                </span>
                            </span>
                        </ul>
                    </nav>
                </div>

                <Banner />
                <Page1 />

           
            </div>
            // </OverPack>
        );
    }
}
