import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { Button } from "antd";
import TweenOne from "rc-tween-one";
import BannerBg from "../../layouts/BannerBg";
import NEKEDE_LOGO from "../../assets/images/nekedLogo.png";


import { enquireScreen } from "enquire-js";

// import * as pageData from './data';

// const { banner, button } = pageData;

const yAnim = {
    y: 30,
    opacity: 0,
    type: "from",
    ease: "easeOutCubic",
    duration: 300,
};

export default class Banner extends Component {
    state = {
        className: "banner",
    };
    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }
    onEnd = () => {
        /* this.setState({
      showBg: true,
    }); */
    };
    getTextToRender = (text, delay) => {
        const textArray = text.split("");
        return textArray.map((t, i) => (
            <TweenOne
                key={i.toString()}
                component="span"
                animation={{
                    y: 60,
                    opacity: 0,
                    type: "from",
                    ease: "easeOutQuint",
                    delay: delay + i * 50,
                    duration: 450,
                }}
            >
                {t === " " ? <span>&nbsp;</span> : t}
            </TweenOne>
        ));
    };
    render() {
        const {
            className,
            isMobile, // showModal,
        } = this.state;
        // const titleChild = this.getTextToRender(isMobile ? 'Kul Pay' : banner.title, 600);
        return (
            <div className={className}>
                <BannerBg />
                <div className={`${className}-content`}>
                    {/* <TweenOne component="p" animation={{ ...yAnim, delay: 500 }} title="EXPERIENCE & ENGINEERING" className="en-name">
            {isMobile ? banner.title : banner.enName}
          </TweenOne> */}
                    <TweenOne component="h2" animation={{ ...yAnim, delay: 600 }}>
                        {isMobile ? (
                            <div className="">
                                <h2 className="manrope" style={{ fontSize: "30px", color: "white", marginTop: "0px" }}>
                                    OCR <br />  Solution
                                </h2>
                            </div>
                        ) : (
                            <>
                            <h2 className="maitre-600" style={{ fontSize: "52px", color: "white", lineHeight:'80px' }}>
                             OCR/Result Archiving
                           
                             
                            </h2>
                            <span className="maitre-600" style={{fontSize:"40px", color:"#fff", lineHeight:"48px"}}>The Federal Polytechnic Nekede</span>
                            </>
                        )}
                    </TweenOne>
                    {/* <TweenOne component="p" animation={{ ...yAnim, delay: 700 }} className="cn-name">
            {banner.cnName}
          </TweenOne> */}
                    <TweenOne animation={{ ...yAnim, delay: 800 }} className="extra" key="text">
                        {isMobile ? (
                            <div className="">
                                <p className="manrope-text" style={{ fontSize: "14px", color: "#FFF" }}>
                                    We bring the results while helping you achieve cost and time and time savings without taking on risk or management overhead.
                                </p>
                            </div>
                        ) : (
                            <p style={{ fontSize: "18px", color: "#FFF", lineHeight:"7em" }} className="manrope-text">
                                Digital Archiving Solution for the Federal Polytechnic, Nekede, Owerri
                            </p>
                        )}
                    </TweenOne>
                    {/* <TweenOne animation={[{ ...yAnim, delay: 900, pointerEvents: 'none' }, { pointerEvents: '', duration: 0 }]} className="home-button" key="home-button">
            <Button type="primary">
              button onClick={showModal}
              <a>{button}</a>
            </Button>
          </TweenOne> */}
                </div>
            </div>
        );
    }
}
