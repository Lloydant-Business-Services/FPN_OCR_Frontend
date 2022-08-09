import React from 'react';
// import BgCanvas from './bgCanvas';
import oval from "../../assets/images/Oval.png"
import oval2 from "../../assets/images/Oval2.png"
import NEKEDE_LOGO from "../../assets/images/nekedLogo.png";

import $ from 'jquery'

export default class BannerBg extends React.PureComponent {
  componentDidMount() {
    //new BgCanvas(this.canvas);
  }
  render() {
    let screen_width = $(window).width();
    return (
      <div className="banner-bg" id="banner">
        <img style={{position:'absolute', left:'84rem', top:'4rem', fontSize:"11em", color:"#ffffff0f", width:"25rem", opacity:"0.3"}} src={NEKEDE_LOGO}/>
        <h2 style={{position:'absolute', left:'2rem', top:'-7rem', fontSize:"22em", color:"#ffffff0a"}}>FPNO</h2>
          {/* <img src={oval2} style={{position:'absolute', left:'0rem', top:'0rem'}}/> */}
          <img src={oval} style={{position:'absolute', left:'76rem', top:'4rem'}}/>
        {/* <canvas
          ref={(c) => {
            this.canvas = c;
          }}
        /> */}
      </div>);
  }
}
