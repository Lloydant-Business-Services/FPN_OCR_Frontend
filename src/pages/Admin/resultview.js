import React, { Component } from "react";
import { enquireScreen } from "enquire-js";
import badge from "../../assets/images/activeBadge.svg";
import pendingBadge from "../../assets/images/pending.svg";
import NewVendor from "./NewVendor";
import { Fade } from "reactstrap";
import printer from "../../assets/images/print.svg";
import toast, { Toaster } from "react-hot-toast";
import $ from "jquery";
import Endpoint from "../../utils/endpoint";
import filterIcon from "../../assets/images/filterIcon.svg";
import editIcon from "../../assets/images/editIcon.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import logo from "../../assets/images/17.png";
import { StageSpinner } from "react-spinners-kit";
import { Table } from "antd";
import { Modal, Button } from "antd";
import ClickLoader from "../../components/Loader/PageLoader/ClickLoader";
import kulCheck from "../../assets/images/kulCheck.svg";
const columns = [
    { title: "SN", dataIndex: "key", key: "key" },
   
   
   
   
   
   
   
   
   
   
   
   
    { title: "Reg Number", dataIndex: "name", key: "name" },
    { title: "Name of student", dataIndex: "student", key: "createdDate" },
    { title: "Course Title", dataIndex: "code", key: "inflows" },
    { title: "Course Code", dataIndex: "title", key: "outflows" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Status", dataIndex: "status", key: "status" },
   
];

const data = [
    {
        key: 1,
        name: "ADM221-10",
        student: <input style={{border:"none", background:"transparent"}} type="text" defaultValue={"School of health fees"}/> ,
        code: "Admin",
        title: "0.00",
        //total: "₦ 2,250.000",
        status: (
            <div>
                <img src={badge} />
            </div>
        ),
     
    },
   
];

class Vendors extends Component {
    state = {
        payLoad: JSON.parse(localStorage.getItem("_IDENTITY_")),
    };
    showModal = () => {
        this.setState({
            //visible: true,
            ignite: true,
        });
    };
    nChange = (value) => {
        this.setState({ value });
    };

    onClear = () => {
        this.setState({
            value: "",
        });
        this.pin.clear();
    };
    loadDataError = (error) =>
        toast.error(error, {
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

    showModal = () => {
        this.setState({
            pageIgnite: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false, pageIgnite: false });
    };

    promptCommitInvoice = () => {
        if(this.state.vendor_name == null){
            this.loadDataError("Enter a vendor name")
            return;
        }
        this.setState({
            isLoading:true
        });
const payLoad ={
        "name": this.state.vendor_name,
        "active": true,
        "institutionId": this.state.payLoad.institutionId
}
        Endpoint.addVendor(payLoad)
        .then((res) => {
            console.log(res.data)
            if(res.data.id > 0){
                this.setState({isLoading:false, invoiceCommited:true, pageIgnite:false})
                this.loadDataFromServer();
            }
        })
        .catch((error) => {
            console.log(error)
            this.loadDataError("Error saving vendor! Check that your connection is active");
            this.setState({isLoading:false})
        });
    };

    closeCommit = () => {
        this.setState({
            commitingInvoice: false,
        });
    };
    closeCommitted = () => {
        //this.props.ignite = !this.props.ignite
        this.setState({
            invoiceCommited: false,
            pageIgnite: false,
        });
    };
    handleCommit = () => {
        this.setState({
            isLoading: true,
        });
        setTimeout(() => {
            this.onClear();
            this.setState({
                isLoading: false,
                commitingInvoice: false,
                pageIgnite: false,
                invoiceCommited: true,
            });
        }, 2000);
    };
    handleInput = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    };
    loadDataFromServer = () => {
        $("#preloader").fadeIn();
        Endpoint.getAllVendorByInstitution(this.state.payLoad?.institutionId)
            .then((res) => {
                console.log(res, "vendors")
                if(res.data != null && res.data.length > 0){
                    var mappedData = res.data.map((x, i) => {
                        return {
                            key: i + 1,
                            id: x.id,
                            name: x.name.toUpperCase(),
                            createdDate: x.createdDate != null ? x.createdDate.substring(0, 10) : "-",
                            inflows: "₦0.00",
                            outflows: "₦0.00",
                            status: <img src={badge} />,
                            description: (
                                <div className="container-fluid">
                                    <div className="row" style={{ paddingTop: "10px" }}>
                                        <div className="col-sm-6">
                                            <p className="manrope-text" style={{ fontSize: "17px" }}>
                                                {x.name}
                                            </p>
                                            <p className="manrope-text-light" style={{ fontSize: "12px", color: "#84818A", marginTop: "-20px" }}>
                                                {/* Your payment status for this month is payed for <span style={{ color: "#FFA043" }}>65%</span> */}
                                                <span style={{ color: "#FFA043" }}>Vendor Details</span>
                                            </p>
                                        </div>
    
                                      
                                    </div>
                                    <hr style={{ marginTop: "0rem", marginBottom: "13px" }} />
                                    <div className="row" style={{ paddingTop: "1px" }}>
                                            <div className="col-sm-3">
                                                <div class="form-group">
                                                    <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                                        Account Name
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div class="form-group">
                                                    <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                                        Account Number
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div class="form-group">
                                                    <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                                        Bank Name
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div class="form-group">
                                                    <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                                        &nbsp;
                                                    </label>
                                                    {/* <p style={{ fontSize: "13px" }}>
                                                        {" "}
                                                        <img src={editIcon} style={{ cursor: "pointer" }} /> &nbsp; &nbsp; &nbsp; &nbsp; <img src={deleteIcon} style={{ cursor: "pointer" }} />
                                                    </p> */}
                                                </div>
                                            </div>
                                        </div>
                                    {x.bankDetailList && x.bankDetailList.map((m, n) => {
                                        return(
                                            <div className="row" style={{ paddingTop: "1px" }}>
                                            <div className="col-sm-3">
                                                <div class="form-group">
                                                   
                                                    <p style={{ fontSize: "13px" }}>{m.accountName}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div class="form-group">
                                                    
                                                    <p style={{ fontSize: "13px" }}>{m.accountNumber}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div class="form-group">
                                                   
                                                    <p style={{ fontSize: "13px" }}>{m.bankName}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div class="form-group">
                                                    
                                                    <p style={{ fontSize: "13px" }}>
                                                        {" "}
                                                        <img src={editIcon} style={{ cursor: "pointer" }} /> &nbsp; &nbsp; &nbsp; &nbsp; <img src={deleteIcon} style={{ cursor: "pointer" }} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })}
                                   
                                </div>
                            ),
                        };
                    });
                    this.setState({
                        allVendors: mappedData,
                    });
                }
                $("#preloader").delay(450).fadeOut("slow");
            })
            .catch((error) => {
                //loadDataError(error, this);
            });
    };
    componentDidMount() {
        //this.loadDataFromServer();
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }

    render() {
        require("antd/dist/antd.css");
        const { isMobile, visible, loading, commitingInvoice, value, isLoading, invoiceCommited } = this.state;

        return (
            <>
            <Toaster position="top-center" reverseOrder={false} />

                {/* <div id="preloader">
                    <div id="status">
                        <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} />
                        <StageSpinner color="#05EEC0" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div> */}
                <Fade>
                    <div className="container-fluid py-5" >
                        {/* <NewVendor ignite={this.state.ignite} /> */}

                        <>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                                    <h1 className="manrope-text" style={!isMobile ? { fontSize: "33px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                        Result View
                                    </h1>
                                    
                                </div>
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "right" }}>
                                    <button className="btn btn-secondary manrope-text-light" style={{ marginTop: "20px" }}>
                                        <img src={filterIcon} /> &nbsp; Filter
                                    </button>
                                    <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px", fontSize: "14px" }} onClick={this.showModal}>
                                        <i className="fa fa-plus" /> &nbsp; Vendor
                                    </button>
                                </div>
                            </div>
                            <Modal visible={this.state.pageIgnite ? true : false} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 500 : null}>
                                <div className="modal-top">
                                    <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                                        Add Vendor
                                    </p>

                                    <div className="row cmt-2">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Vendor Name
                                                </label>
                                                <br />
                                                <input type="text" name="vendor_name" className="form-control" placeholder="Enter vendor name" onChange={this.handleInput} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "46px" }}>
                                        <div className="col-sm-12 col-xl-8">
                                            <p style={{ fontSize: "12px" }} className="drk-text manrope-text cmt-1" onClick={this.handleCancel}>
                                                Close
                                            </p>
                                        </div>
                                        <div className="col-sm-3">
                                            {this.state.isLoading ? (
                                                <div style={{ float: "right", paddingRight: "30px" }} className="manrope-text">
                                                    <ClickLoader /> Processing...
                                                </div>
                                            ) : (
                                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.promptCommitInvoice}>
                                                    Add Vendor
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Modal>

                            <Modal visible={invoiceCommited} title={false} onOk={this.closeCommitted} onCancel={this.closeCommitted} footer={false} width={!isMobile ? 482 : null}>
                                <div className="modal-top text-center">
                                    <p className="manrope-text drk-text" style={{ fontSize: "27px" }}>
                                        Vendor added successfully
                                    </p>

                                    <div className="row">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                Vendor was successfully added. Complete the vendor profile by adding bank account details.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <img src={kulCheck} />
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.closeCommitted}>
                                                View Vendors &nbsp;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </>
                        <br/>
                        <br/>
                        <Table
                            columns={columns}
                            expandable={{
                                expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                                rowExpandable: (record) => record.name !== "Not Expandable",
                            }}
                            dataSource={data}
                            className="manrope-text table-responsive"
                        />
                    </div>
                </Fade>
            </>
        );
    }
}

export default Vendors;
