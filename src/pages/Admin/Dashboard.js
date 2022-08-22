import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, stateKeys } from "../../redux/actions";
import illustration from "../../assets/images/illus.png";
import ic_up from "../../assets/images/ic_up.png";
import ic_down from "../../assets/images/ic_down.png";
import green from "../../assets/images/green.svg";
import orange from "../../assets/images/orange.svg";
import ash from "../../assets/images/ash.svg";
import pink from "../../assets/images/pink.svg";
import yellow from "../../assets/images/yellow.svg";
import blue from "../../assets/images/blue.svg";
import lightblue from "../../assets/images/lightblue.svg";
import shape from "../../assets/images/Shape.png";
import shape2 from "../../assets/images/Shape2.png";
import shape3 from "../../assets/images/Shape3.png";
import KulLoader from "../../components/Loader/PageLoader/KulPayLoader";
import * as Unicons from "@iconscout/react-unicons";
import Endpoint from "../../utils/endpoint";
import {loadUserInfo} from "../../utils/auth";
import {resolveDateTime} from "../../utils/helpers";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { enquireScreen } from "enquire-js";
import { Bar, Line } from "react-chartjs-2";
import logo from "../../assets/images/17.png";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import $ from "jquery";
import { Progress, Tooltip } from "antd";
import "../../assets/css/pie.css"

const LineData = {
    labels: ["Acc", "Msc", "Pol", "Eco", "Soc", "Geo"],
    datasets: [
        {
            label: "KulPay Revenue",
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            borderColor: "#0e408f",
        },
    ],
};
const LineData2 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
        {
            label: "KulPay Revenue",
            data: [33, 10, 60, 12, 74, 4, 23, 7],
            fill: false,
            borderColor: "#0e408f",
        },
    ],
};
const data = {
    labels: ["Acc", "Msc", "Pol", "Eco", "Soc", "Geo", "Med"],
    datasets: [
        {
            label: "# of kulpay1",
            data: [250, 140, 200, 66, 110, 130, 79, 44, 67, 77, 52],
            backgroundColor: "#0e408f",
            // width:'6px',
            barThickness: 17,
        },
        // {
        //     label: "# of kulpay 2",
        //     data: [122, 163, 222, 111, 177, 144, 54, 81, 32, 56],
        //     backgroundColor: "#F1F4FB",
        //     barThickness: 12,
        // },
    ],
};
const optionsLine = {
    scales: {
        maintainAspectRatio: false,
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],

        //   barThickness:3
    },
    legend: {
        display: false,
    },
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
        maintainAspectRatio: false,

        //   barThickness:3
    },
    legend: {
        display: false,
    },
};
function sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
}
function addSlice(sliceSize, pieElement, offset, sliceID, color) {
    $(pieElement).append("<div class='slice " + sliceID + "'><span></span></div>");
    var offset = offset - 1;
    var sizeRotation = -179 + sliceSize;
    $("." + sliceID).css({
        transform: "rotate(" + offset + "deg) translate3d(0,0,0)",
    });
    $("." + sliceID + " span").css({
        transform: "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
        "background-color": color,
    });
}
function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
    var sliceID = "s" + dataCount + "-" + sliceCount;
    var maxSize = 179;
    if (sliceSize <= maxSize) {
        addSlice(sliceSize, pieElement, offset, sliceID, color);
    } else {
        addSlice(maxSize, pieElement, offset, sliceID, color);
        iterateSlices(sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color);
    }
}
function createPie(dataElement, pieElement) {
    var listData = [];
    $(dataElement + " span").each(function () {
        listData.push(Number($(this).html()));
    });
    var listTotal = 0;
    for (var i = 0; i < listData.length; i++) {
        listTotal += listData[i];
    }
    var offset = 0;
    var color = [
        "#0e408f",
        "#20C9AC",
        "#00A5FF",
        "#FFA043",
        "#EBEAED",
        "#FA699D",
        "#FFCE74",
    ];
    for (var i = 0; i < listData.length; i++) {
        var size = sliceSize(listData[i], listTotal);
        iterateSlices(size, pieElement, offset, i, 0, color[i]);
        $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color[i]);
        offset += size;
    }
}
//createPie(".pieID.legend", ".pieID.pie");


class SuperAdminDashboard extends Component {
    state = {
        pageLoading: false,
        institutionDetails: [],
        payLoad: JSON.parse(localStorage.getItem("_IDENTITY_")),

    };

    loadDataError = (error) =>
        toast.error("Something went wrong, pls check your connection.", {
            style: {
                border: "1px solid #DC2626",
                padding: "16px",
                background: "#DC2626",
                color: "#fff",
                borderRadius: "3rem",
            },
            iconTheme: {
                primary: "#FFFAEE",
                secondary: "#DC2626",
            },
        });

    loadDataFromServer = () => {
        this.setState({ pageLoading: true });
        loadUserInfo();

        Endpoint.getInstitutionDetails()
            .then((res) => {
                this.setState({ institutionDetails: res.data, pageLoading: false });
            })
            .catch((error) => {
                this.loadDataError(error, this);
                this.setState({ pageLoading: false });
            });
    };

    componentDidMount() {
        setTimeout(() => {
            $("#preloader").delay(450).fadeOut("slow");
            
        }, 1800);
        setTimeout(() => {
            createPie(".pieID.legend", ".pieID.pie");
        }, 2500)
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
        // this.loadDataFromServer();
    }

    render() {
        require("antd/dist/antd.css");
        const { isMobile } = this.state;
        const firstName = this.state.payLoad?.fullName.split(" ")
        return (
            <div style={{ background: "#fafafa" }}>
            {/* {this.state.pageLoading ?
                <KulLoader/>
                : null
            } */}
            <div id="preloader">
                <div id="status">
                    <StageSpinner color="#fff" backColor="#FFF" frontColor="#FFF" size={60} />
                </div>
            </div>

            {/* <Toaster position="top-center" reverseOrder={false} /> */}

            <div className="container-fluid py-5">
                <div className="row mt-3">
                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                <h1 className="manrope-text" style={!isMobile ? { fontSize: "36px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                    {/* <Unicons.UilApps size="24" className="mr-2"/> */}
                    {/* Good {resolveDateTime("timeOfDay")}, Admin */}
                    Welcome, Admin
                </h1>
                <p className="manrope-text-light" style={{ fontSize: "14px", marginTop:'-16px' }}>
                    Dashboard Summary
                </p>
                </div>
                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{textAlign:'right'}}>
                <h1 className="manrope-text-light" style={!isMobile ? { fontSize: "20px"} : { fontSize: "16px" }}>
                    {/* <Unicons.UilApps size="24" className="mr-2"/> */}
                    {resolveDateTime("currentDay")} 
                </h1>
                <p className="manrope-text-light" style={{ fontSize: "14px", marginTop:'-14px' }}>
                {resolveDateTime("today")}
                </p>
                </div>
                </div>
                <div className="row" style={!isMobile ? { marginTop: "5vh" } : null}>
                   
                    <div className="col-12 col-sm-6 col-xl-4 mt-2 mt-xl-0">
                        <div className="card-dash flex-fill">
                            <div className="card-body p-3">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                                           Verified Results
                                        </p>
                                        <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                           14
                                        </p>
                                    </div>

                                    <div className="mt-2">
                                        <div className="" style={{ marginTop: "40px" }}>
                                            {/* <Unicons.UilBuilding size="20"/> */}
                                            {/* <img src={ic_up} style={{ width: "16px", height: "16px" }} /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-xl-4 mt-2 mt-xl-0">
                        <div className="card-dash flex-fill">
                            <div className="card-body p-3">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                                           Unverified Result
                                        </p>
                                        <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                           122
                                        </p>
                                    </div>

                                    <div className="mt-2">
                                        <div className="" style={{ marginTop: "40px" }}>
                                            {/* <Unicons.UilBuilding size="20"/> */}
                                            {/* <img src={ic_down} style={{ width: "16px", height: "16px" }} /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-xl-4 mt-2 mt-xl-0">
                        <div className="card-dash flex-fill">
                            <div className="card-body p-3">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                                           Total Verified Student
                                        </p>
                                        <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                           344
                                        </p>
                                    </div>

                                    <div className="mt-2">
                                        <div className="" style={{ marginTop: "40px" }}>
                                            {/* <img src={ic_down} style={{ width: "16px", height: "16px" }} /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               

                <div className="row" style={!isMobile ? { marginTop: "2vh" } : null}>
          
                    <div className="col-12 col-sm-6 col-xl-6 mt-2 mt-xl-0">
                        <div className="card-dash flex-fill">
                            <div className="card-body p-3">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="manrope-text" style={{ fontSize: "12px" }}>
                                            Chart
                                        </p>
                                       
                                    </div>

                                    <div className="mt-2">
                                        <div className="" style={{textAlign: "right" }}>
                                           
                                            <p className="manrope-text-light" style={{ fontSize: "12px", color: "#84818A" }}>
                                                Departments
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row" style={{marginTop:'20px'}}>
                                <div className="col-sm-12 col-xl-9">
                                <Bar data={data} options={options} width={50} height={23} />
                                </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-xl-6 mt-2 mt-xl-0">
                        <div className="card-dash flex-fill">
                            <div className="card-body p-3">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="manrope-text" style={{ fontSize: "12px" }}>
                                            Chart
                                        </p>
                                       
                                    </div>

                                    <div className="mt-2">
                                        <div className="" style={{textAlign: "right" }}>
                                           
                                            <p className="manrope-text-light" style={{ fontSize: "12px", color: "#84818A" }}>
                                                Departments
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row" style={{marginTop:'20px'}}>
                               <center>
                               <div className="col-sm-12 col-xl-9">
                                <div class="wrapper">
  <div class="d1"><div><span>60%</span></div></div>
  <div class="d2"><div><span>22%</span></div></div>
  <div class="d3"><div><span>8%</span></div></div>
  <div class="d4"><div><span>7%</span></div></div>
  <div class="d5"><div><span>3%</span></div></div>
</div>
                                </div>
                               </center>
                                
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
export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminDashboard);
