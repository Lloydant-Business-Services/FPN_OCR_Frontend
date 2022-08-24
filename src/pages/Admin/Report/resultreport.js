import React, { Component } from "react";
import { enquireScreen } from "enquire-js";
import badge from "../../../assets/images/Label.svg";
import pendingBadge from "../../../assets/images/pending.svg";
//import NewCollection from "./NewCollection";
import { Fade } from "reactstrap";
//import printer from "../../assets/images/print.svg";
import $ from "jquery";
import Endpoint from "../../../utils/endpoint";
import { Modal, Button, Menu, Dropdown, Space } from "antd";
import kulCheck from "../../../assets/images/kulCheck.svg";
import filterIcon from "../../../assets/images/filterIcon.svg";
import editIcon from "../../../assets/images/editIcon.svg";
import deleteIcon from "../../../assets/images/deleteIcon.svg";
import { Table, Skeleton, Drawer, Select, DatePicker, Switch } from "antd";
import { currencyFormat } from "../../../utils/helpers";
import logo from "../../../assets/images/17.png";
import logoKul from "../../../assets/images/LogoKul.png";
import absu_logo from "../../../assets/images/absu_logo.png";
import { StageSpinner, CircleSpinner } from "react-spinners-kit";
import toast, { Toaster } from "react-hot-toast";
import ClickLoader from "../../../components/Loader/PageLoader/ClickLoader";
import QueueAnim from "rc-queue-anim";
import { stateKeys, BASE_URL } from "../../../redux/actions";
import { DownOutlined, EllipsisOutlined } from "@ant-design/icons";
import jsPDF from "jspdf"
import "jspdf-autotable"
import { ca } from "date-fns/locale";
const { Option, OptGroup } = Select;

const columns = [
    { title: "SN", dataIndex: "key", key: "key" },
    { title: "Matric Mumber", dataIndex: "regnumber", key: "regnumber" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Programme", dataIndex: "programme", key: "programme" },
    { title: "Department", dataIndex: "department", key: "department" },
    // { title: "Fixed Amount?", dataIndex: "fixAmount", key: "fixAmount" },
    // { title: "Status", dataIndex: "status", key: "status" },
    //   {
    //     title: 'Action',
    //     dataIndex: '',
    //     key: 'x',
    //     render: () => <a>Delete</a>,
    //   },
];

const data = [
    {
        key: 1,
        name: <input type="text" style={{border:"none", background:"transparent"}} defaultValue="O. GODSPEED MIRACLE"/>,
        regnumber: <input type="text" style={{border:"none", background:"transparent"}} defaultValue="FPN/POL/002"/>,
    },
    {
        key: 2,
        name: "OKEKE JULIAN CHIDINMA",
       
    },
    {
        key: 3,
        name: "DIALA EBERE ANN",
        
    },
    {
        key: 4,
        name: "ODOGWU BINTA CHIAMAKA",
        
    },
];
class ResultReport extends Component {
    state = {
        payLoad: JSON.parse(localStorage.getItem("_IDENTITY_")),
        // pageIgnite:false,
        //paymentSetup: true,
        cloneCount: 0,
        globalSelectName: null,
        vendor_select: null,
        pushObjArr: [],
        dateFrom: '0001-01-01',
        dateTo: '0001-01-01',
        loadSpinner:false,
        dynamicRows:[],
        payloadArr:[],
        failedList:[],
        dynamicColumns: [
            // { title: "SN", dataIndex: "key", key: "key" },
            // { title: "Registration Number", dataIndex: "registrationNumber", key: "registrationNumber" },
            // { title: "Name", dataIndex: "name", key: "name" },
            // { title: "Amount", dataIndex: "amount", key: "amount" },
            // { title: "Programme", dataIndex: "programme", key: "programme" },
            // { title: "Department", dataIndex: "department", key: "department" },
            // { title: "Invoice Number", dataIndex: "invoicenumber", key: "invoicenumber" },
            // { title: "Gateway", dataIndex: "gateway", key: "gateway" },
            // { title: "Payment Date", dataIndex: "paymentDate", key: "paymentDate" },
        ],
        dynamicColumnsConstant: [
            { title: "SN", dataIndex: "key", key: "key" },
            { title: "Name", dataIndex: "name", key: "name" },
            { title: "Amount", dataIndex: "amount", key: "amount" },
            { title: "Programme", dataIndex: "programme", key: "programme" },
            { title: "Department", dataIndex: "department", key: "department" },
            { title: "Matric Mumber", dataIndex: "matricnumber", key: "matricnumber" },
            { title: "Invoice Number", dataIndex: "invoicenumber", key: "invoicenumber" },
            { title: "Gateway", dataIndex: "gateway", key: "gateway" },
            { title: "Payment Date", dataIndex: "paymentDate", key: "paymentDate" },
        ],
    };

    exportPDF = () => {


        const orientation = "landscape" // portrait or landscape
        const unit = "pt"
        const size = "A4" // Use A1, A2, A3 or A4
        const margins = {
            bottom: 40,
            top: 10,
            left: 10,
            right: 10
        };



        if (typeof window !== "undefined") {
            // const doc = new jsPDF(orientation, unit, size)
            const doc = new jsPDF('landscape', 'pt', "A4", [200, 400]);
            const docWidth = doc.internal.pageSize.getWidth();

            var img = new Image()
            var imgLogo = new Image()
            img.src = logoKul;
            imgLogo.src = logoKul;


            var objToday = new Date(),
                weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
                dayOfWeek = weekday[objToday.getDay()],
                domEnder = function () { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
                dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
                months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
                curMonth = months[objToday.getMonth()],
                curYear = objToday.getFullYear();
            var today = dayOfMonth + " " + curMonth + ", " + curYear;
            // curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " +


            doc.setFontSize(15)
            doc.setFont('Times New Roman')

            const footer = "khjlllbk"

            const headers = [
                this.state.dynamicColumns
            ]
            const headerSecond = [
                [
                    "TOTAL"
                ],
            ]
            const totalColumn = [["N546,434.00"]]
            let bodyFoot = [
                {
                    vc: "Least Punctual: " + this.state.attendanceList?.leastPuntual,
                },
                {
                    vc: "Most Punctual: " + this.state.attendanceList?.mostPuntual,
                },
            ]

            const dora = bodyFoot.map(d => [
                d.vc,
                // (<b>{d.vc}</b>)

            ])

            const dataBody = data.map((d, i) => [
                i + 1,
                d.name,
                // d.amount.toString(),
                // d.programme,
                // d.department,
                // d.matricnumber,
                // d.invoicenumber,
                // d.gateway,
                // d.paymentDate,
            ])

            let content = {
                startY: 220,
                head: headers,
                body: dataBody,
                styles: {
                    fontSize: 7
                },
                theme: 'grid',
                headStyles: {
                    fillColor: '#0e408f'
                }
                // foot: foott

            }

            const schName = "ABIA STATE UNIVERSITY, UTURU";
            //const schName = "ENUGU STATE UNIVERSITY OF SCIENCE AND TECHNOLOGY";



            //PORTRAIT ORIENTATION

            doc.setFont('Arial')
            //   doc.setFontSize(9);
            //   //doc.text("Powered by ", 480, 23) //PORTRAIT ORIENTATION
            //   doc.text("Powered by ", docWidth - 110, 23) //LANSCAPE ORIENTATION
            //   doc.setFontSize(15);

            //   doc.addImage(img, 'png', docWidth - 100, 28, 50, 17);
            doc.addFont("Roboto-Regular.ttf", "Roboto", "normal")
            doc.addFont("Roboto-Bold.ttf", "Roboto", "bold")
            //doc.setFont("Roboto");
            doc.addImage(imgLogo, 'png', 50, 45, 75, 25);
            //doc.addImage(imgLogo, 'png', 50, 45, 50, 50);
            doc.setFont(undefined, 'bold')
            //doc.text(schName, schName.length > 30 ? 120 : 190, 75)
            doc.text(schName, docWidth / 3, 75)
            doc.setFont(undefined, 'normal')

            doc.setFontSize(12);
            doc.text("info@abiastateuniversity.com", (docWidth / 3) + 50, 92)
            doc.setFontSize(30);
            //imageOverload(left, top, width, height)
            //doc.addImage(img, 'png', 260, 160, 40, 60);
            //textOverload(left, top)
            doc.setFontSize(11);
            doc.text("PROGRAMME: ", 50, 120)
            doc.text("DEPARTMENT: ", 50, 135)
            doc.text("FACULTY/SCHOOL: ", 50, 150)
            doc.text("DATE GENERATED: " + today, 50, 165)


            doc.setFontSize(13)
            doc.setFont(undefined, 'bold')
            doc.text("COLLECTION REPORT", (docWidth / 3) + 50, 210)

            doc.autoTable(content)
            //  doc.autoTableEndPosY() + 15
            var check = doc.autoTableEndPosY() + 15



            doc.autoTable({
                startY: check,
                head: headerSecond,
                body: totalColumn,
                styles: {
                    fontSize: 10,
                    cellWidth: 100,
                },
                theme: 'grid',
                headStyles: {
                    fillColor: '#f1f1f1',
                    textColor: 'black'
                }
            })

            // PAGE NUMBERING
            // Add Page number at bottom-right
            // Get the number of pages
            const pageCount = doc.internal.getNumberOfPages();
            const docHeight = doc.internal.pageSize.getHeight();


            // For each page, print the page number and the total pages
            for (var i = 1; i <= pageCount; i++) {
                // Go to page i
                doc.setPage(i);
                doc.setFontSize(9);
                doc.setFont(undefined, 'normal')

                //doc.text("Powered by ", 480, 23) //PORTRAIT ORIENTATION
                doc.text("Powered by KulPay", docWidth - 110, 23) //LANSCAPE ORIENTATION
                //   doc.setFontSize(15);

                //   doc.addImage(img, 'png', docWidth - 100, 28, 50, 17);
                doc.setFontSize(9)
                doc.setFont(undefined, 'normal')

                //Print Page 1 of 4 for example
                doc.text('Page ' + String(i) + ' of ' + String(pageCount), docWidth - 110, docHeight - 40);
            }

            doc.save(today + " Collection Repoort")
        }
    }

    handleSession = (value) => {
        console.log(`selected ${value}`);
        this.setState({ sessionId: value })
    }
    handleProgramme = (value) => {
        console.log(`selected ${value}`);
        this.setState({ programmeId: value })
    }
    handleDepartment = (value) => {
        console.log(`selected ${value}`);
        this.setState({ departmentId: value })
    }
    handleLevel = (value) => {
        console.log(`selected ${value}`);
        this.setState({ levelId: value })
    }
    handleSemester = (value) => {
        console.log(`selected ${value}`);
        this.setState({ semesterId: value })
    }
    onChangeDateFrom = (date, dateString) => {
        console.log(date, dateString);
        this.setState({ dateFrom: dateString })
    }
    onChangeDateTo = (date, dateString) => {
        console.log(date, dateString);
        this.setState({ dateTo: dateString })
    }
    addCollectionSplit = (collectionId, collectionName) => {
        this.setState({
            collection_name: collectionName,
            paymentSetup: true,
            globalCollectionId: collectionId,
        });
    };

    loadActiveSession = () => {
        Endpoint.getActiveSession()
        .then(res => {
            console.log(res.data, "session response")
            this.setState({
                sessionList:res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    loadLevel = () => {
        Endpoint.getAllLevel()
        .then(res => {
            console.log(res.data, "level response")
            this.setState({
                levelList:res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    loadSemester = () => {
        Endpoint.getAllSemester()
        .then(res => {
            console.log(res.data, "semester response")
            this.setState({
                semesterList:res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    loadProgramme = () => {
        Endpoint.getAllProgrammes()
        .then(res => {
            console.log(res.data, "programme response")
            this.setState({
                programmeList:res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    loadDepartments = () => {
        Endpoint.getDepartments()
        .then(res => {
            console.log(res.data, "dept response")
            this.setState({
                deptList:res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    
   
  
    loadDataFromServer = () => {
        // $("#preloader").fadeIn();
        this.loadActiveSession();
        this.loadCollectionReportBy();
        this.setState({ loadSpinner: true });
     

        this.getInstitutionVendors();
        this.loadPaymentGateways();
    };

    getInstitutionVendors = () => {
        //$("#preloader").fadeIn();
        Endpoint.getAllVendorByInstitution(this.state.payLoad?.institutionId)
            .then((res) => {
                console.log(res, "vendors");
                if (res.data != null && res.data.length > 0) {
                    var mappedData = res.data.map((x, i) => {
                        return {
                            key: i + 1,
                            id: x.id,
                            name: x.name.toUpperCase(),
                            createdDate: x.createdDate != null ? x.createdDate.substring(0, 10) : "-",
                            inflows: "₦0.00",
                            outflows: "₦0.00",
                            status: <img src={badge} />,
                            bankList: x.bankDetailList,
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
    showModal = () => {
        this.setState({
            //visible: true,
            ignite: true,
        });
    };
    showModal = () => {
        this.setState({
            pageIgnite: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false, saved:false, savedUpload:false, errorDialog:false });
            window.location.reload(true)
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false, pageIgnite: false, paymentSetup: false, saved:false, savedUpload:false, errorDialog:false });
        window.location.reload(true)
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

    loadDataSuccess = (msg) =>
        toast.success(msg, {
            style: {
                border: "1px solid #30afaf",
                padding: "16px",
                background: "#30afaf",
                color: "#fff",
                borderRadius: "3rem",
            },
            iconTheme: {
                primary: "#FFFAEE",
                secondary: "#30afaf",
            },
        });

    handleInput = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    };

    handleVendorInput = (event) => {
        this.setState({ isSelectVendor: null });
        $("#preloader").fadeIn();
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        const storeText = event.target?.options[event.target.selectedIndex]?.text;

        var selectedVendor = this.state.allVendors.filter((x) => {
            return x.id == target.value;
        });

        console.log(storeText, "storeText");
        console.log(selectedVendor[0], "vendorSelect");
        setTimeout(() => {
            this.setState({
                isSelectVendor: selectedVendor != null ? selectedVendor[0] : null,
                globalSelectName: storeText,
                vendorValue: target.value,
            });
            $("#preloader").fadeOut();
        }, 1500);
    };

    handleVendorBankInput = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        const storeText = event.target?.options[event.target.selectedIndex]?.text;

        setTimeout(() => {
            this.setState({
                vendorBankDetails: storeText,
                vendorBankDetailId: target.value,
            });
            $("#preloader").fadeOut();
        }, 1500);
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
    resolveAddInputSection = () => {
        var _parent = $("#");
        _parent.append("");
        var _fieldSet = "";
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

  

    duplicate = () => {
        var newObj = {
            itemName: this.state.globalSelectName,
            itemValue: this.state.vendorBankDetailId,
            itemAmount: this.state.vendorAmount,
            itemBank: this.state.vendorBankDetails,
        };

        this.state.pushObjArr.push(newObj);
        //setTimeout(() => {
        console.log(this.state.pushObjArr);
        this.setState({
            pushObjArr: this.state.pushObjArr,
            // vendor_account_select: null,
            // vendor_select:null
        });
        //}, 1500);
        //     var i = 0;
    };
    between = (dataIndex) => {
        if(dataIndex == 3 || dataIndex == 4 || dataIndex == 5 || dataIndex == 6 || dataIndex == 7 || dataIndex == 8 || dataIndex == 9 || dataIndex == 10 || dataIndex == 11 || dataIndex == 12 || dataIndex == 13 || dataIndex == 14 || dataIndex == 15 || dataIndex == 16){
            return true;
        }
        return false;
    }
        
    componentDidMount() {
        //     fetch('http://ip-api.com/json')
        // .then(function (response) {
        //     return response.json();
        // })
        // .then(function (payload) {
        //     console.log(payload);
        // });
        // this.loadDataFromServer();
        this.loadProgramme()
        this.loadLevel()
        this.loadSemester()
        this.loadActiveSession()
        this.loadDepartments()
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
        console.log(this.state.dynamicColumns, "DynamicColumns");
    }

    handleVendorAmount = (e) => {
        this.setState({
            vendorAmount: e.target.value,
        });

        setTimeout(() => {
            console.log(this.state.vendorAmount);
        }, 1500);
    };

    removeVendor = (data) => {
        var filteredItems = this.state.pushObjArr.filter((x) => {
            return x.itemValue != data;
        });
        this.setState({
            pushObjArr: filteredItems,
        });
    };
    toggleColumnView = (e) => {
        e.preventDefault();
        if (this.state.isMenuVisble) {
            this.setState({ isMenuVisble: false });
        } else {
            this.setState({ isMenuVisble: true });
        }
    };
    resolveColumnVisibilty = (data) => {
        //var doesExist = this.state.dynamicColumns.includes(x => x.key == data.key);
        //console.log(doesExist, "DoesExist")
        var filteredItems = this.state.dynamicColumns.filter((x) => {
            if (x != null && x.key != null) {
                return x.key != data.key;
            } else {
                filteredItems.push(data);
            }
        });

        console.log(filteredItems, "filtered Items");
        this.setState({ dynamicColumns: filteredItems });
    };
    toggleDateFilter = () => {
        if ($('#dateFilter').is(':visible')) {
            $('#dateFilter').toggle('slow')
            this.setState({
                dateFrom: '0001-01-01',
                dateTo: '0001-01-01'
            })
        }
        else {
            $('#dateFilter').toggle('fast')
        }
    }
    loadUnverifiedResult = () => {
        this.setState({ loadSpinner: true, filterPool: false, dynamicColumns:[], dynamicRows:[] });

        Endpoint.getUnverifiedresultsBy(this.state.programmeId, this.state.departmentId, this.state.sessionId, this.state.semesterId, this.state.levelId)
            .then((res) => {
                //alert("1")
                this.setState({ loadSpinner: false });

                console.log(res.data, "collectionReport");
                if(res.data != null && res.data?.studentResultHeaderDto?.length > 0){
                    var mappedHeader = res.data?.studentResultHeaderDto.map((x, i) => {
                        return{
                            //sn: i+1,
                            title:x.name,

                        }
                    })
                    this.setState({
                        dynamicColumns: res?.data?.studentResultHeaderDto,
                        indexHeader: res?.data?.studentResultHeaderDto.length
                    })
                }
                var mappedData = res.data.studentResultDto.map((x, i) => {
                    return {
                        key: i + 1,
                        registrationNumber: x.registrationNumber,
                        name: x.name
                        //name: x.studentName,
                        // amount: "N" + x.amount,
                        // programme: x.programmeName.toUpperCase(),
                        // department: x.departmentName,
                        // matricnumber: x.registrationNumber,
                        // invoicenumber: x.invoiceNumber,
                        // gateway: x.paymentGateway,
                        // paymentDate: x.datePaid

                    }
                })

                this.setState({ dynamicRows: res.data.studentResultDto })
                setTimeout(() => {
                    console.log(this.state.dynamicRows, this.state.indexHeader)
                }, 2000);

            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loadSpinner:false
                })
                //this.loadDataError("Error saving vendor! Check that your connection is active");
                //this.setState({isLoading:false})
            });



    }
    pickRowAndSubmit = () => {
        var defaultIndex = 0;
        var rowOne = ".row"+defaultIndex;
        let failArr = []
        var rowCount = $("#dynamicTable tr").length - 1;
        //console.log(rowCount, "row cpunt")
        for(var i = 0; i < rowCount; i++){
            defaultIndex++

            console.log(defaultIndex)

            var element = document.querySelector(".row"+i);
            if(element == null){

            }
            else{
                this.setState({
                    saving:true
                })
                var sendArr = []
                    element.childNodes.forEach((x) => {

                       sendArr.push(x.firstChild.value)
                   
                    })
                    this.state.payloadArr.push(sendArr)

                    //console.log(sendArr, "sendarray")
                    const createPayload = {
                        "studentResultHeaderDto":this.state.dynamicColumns, 
                        "dataList": sendArr,
                        "departmentId": this.state.departmentId,
                        "programmeId": this.state.programmeId,
                        "sessionId": this.state.sessionId,
                        "semesterId": this.state.semesterId,
                        "levelId": this.state.levelId

                    }
                    Endpoint.postConfirmVerifiedResult(createPayload)
                    .then((res) => {
                        console.log(res)
                        if(!res.data?.succeeded){
                            this.state.failedList.push(res.data)
                            this.setState({
                                showFailed:true,
                            })
                        }
                        console.log(defaultIndex, rowCount, "last ;ast")
                        setTimeout(() => {
                            if(defaultIndex == rowCount){
                                this.setState({
                                    saving:false,
                                    saved:true
                                })
                            }
                        }, 7000);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    console.log(this.state.payloadArr, "finalArray")
            }
            
            // this.setState({
            //     saving:false,
            //    })
        }
     
    //    if(this.state.failedList && this.state.failedList.length > 0){
    //     this.setState({
    //         showFailed:true
    //     })
    //    }
        // console.log(this.state.payloadArr)
        
        // getTable.find("td").each(function(index, element) {
        //     var colSize = $(element).find('input').length;
        //    console.log(colSize)
        //   });
        // var children = document.querySelectorAll(rowOne);
        // var qOne = document.querySelector(rowOne)
        // console.log(children)
        // console.log(qOne)
    }

    eachSaveFunc = () => {
        const levelPayload = ['100', '200', '300', '400']
        levelPayload.forEach(value => {
            var setName = {
                name: value
            }
            Endpoint.postLevel(setName)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        });
    }

    handleFileChange = (e) => {
        console.log(e.target.files[0])
        this.setState({
            incubatorDocument:e.target.files[0]
        })
    }
    saveResultForIncubation = (e) => {
        e.preventDefault();
        if(this.state.session_select == null || this.state.semester_select == null){
            alert("select all fields!");
            return;
        }
        this.setState({
            saving:true
        })
        var formData = new FormData();
        formData.append("SessionId", this.state.session_select);
        formData.append("DepartmentId", this.state.department_select);
        formData.append("ProgrammeId", this.state.programme_select);
        formData.append("LevelId", this.state.level_select);
        formData.append("SemesterId", this.state.semester_select);
        formData.append("ResultFile", this.state.incubatorDocument);

        Endpoint.postResultForIncubation(formData)
        .then((res) => {
            console.log(res)
            if(res.data == 208){
                this.setState({
                    responseText: "Failed! A sheet containing the selected parameters already exists",
                    errorDialog:true,
                    saving:false,
                    pageIgnite:false
                })
            }
            else if(res.data == 200){
                this.setState({
                    saving:false,
                    savedUpload:true,
                    pageIgnite:false
                })
            }
           
        })
        .then((err) => {
            console.log(err)
            // alert("oops something went wrong")
            this.setState({
                saving:false
            })
        })
    }
    render() {
        require("antd/dist/antd.css");
        require("../../../assets/css/antDrawerReport.css")
        const { isMobile, visible, loading, commitingInvoice, value, isLoading, invoiceCommited } = this.state;
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1" onClick={() => this.exportPDF()}>PDF</Menu.Item>
                <Menu.Item key="2" onClick={() => this.testExport()}>Excel</Menu.Item>
            </Menu>
        );
        return (
            <>
             <Modal visible={this.state.savedUpload} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? "35vw" : null}>
                    <div className="modal-top"  style={{minHeight:"200px"}}>
                        <p className="manrope-text drk-text" style={{ fontSize: "28px" }}>
                            Saved successfully!
                        </p>

 
                    </div>

                </Modal>
                <Modal visible={this.state.errorDialog} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? "35vw" : null}>
                    <div className="modal-top"  style={{minHeight:"150px"}}>
                        <center>
                        <p className="manrope-text" style={{ fontSize: "20px" }}>
                            {this.state.responseText}
                        </p>
                        </center>

 
                    </div>

                </Modal>
             <Modal visible={this.state.saved} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? "60vw" : null}>
                    <div className="modal-top"  style={{minHeight:"400px"}}>
                        <p className="manrope-text drk-text" style={{ fontSize: "20px" }}>
                            Evaluated and saved! <span style={{ color: "#0e408f" }}>{this.state.collection_name}</span>
                        </p>

 {this.state.failedList && this.state.failedList ? 
<>
<div className="row cmt-2">
                            <div className="col-sm-12">
                                <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                    Some records were saved successfully while a few others failed. See failed save records below
                                </p>
                            </div>
                        </div>

                        <table className="table table-striped mt-3">
    <th>Name</th>
    <th>Regnumber</th>
    <th>Reason for failed save</th>
    {this.state.failedList && this.state.failedList.map((x, i) => {
        return(
            <tr>
                <td>{x.name}</td>
                <td>{x.regNumber}</td>
                <td>{x.reason}</td>
        
    </tr>
        )
    })}
</table>
</>
:<p>All details were saved withouth errors!</p>
}                      

                      
                       

                      
                        {/* Department Drop Down Ends Here */}

                       
                        {/* Level Drop Down Ends Here */}

                        {/* <div className="row" style={{ marginTop: "46px" }}>
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
                                    <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.postApplyCollection}>
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div> */}
                    </div>
                </Modal>
             {this.state.saving ? <div id="preloader">
                <div id="status">
                    <CircleSpinner color="#fff" backColor="#FFF" frontColor="#FFF" size={40} />
                </div>
            </div> : null}

                <Toaster position="top-center" reverseOrder={false} />




                {/* <div id="preloader" style={{ display: "none" }}>
                    <div id="status">
                        <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} />
                        <StageSpinner color="#05EEC0" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                    
                </div> */}


                <Fade>
                    <div className="container-fluid py-5">
                        <>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                                    <h1 className="manrope-text" style={!isMobile ? { fontSize: "27px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                        {/* <Unicons.UilApps size="24" className="mr-2"/> */}
                                        Result Report <span style={{ fontSize: "18px" }}>(view)</span>
                                    </h1>
                                    {/* <p className="manrope-text-light" style={{ fontSize: "14px", marginTop: "-16px" }}>
                                Here’s what’s going on with your fee collections
                            </p> */}
                                </div>
                               
                            </div>
                            <br />
                        

                            <Modal visible={this.state.pageIgnite ? true : false} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 700 : null}>
                                <form onSubmit={(e) => this.saveResultForIncubation(e)}>
                                <div className="modal-top">
                                    <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                                        Result Upload
                                    </p>
                                    <div className="row">
                                        <div className="col-lg-6 col-sm-12">
                                            <select required name="session_select" onChange={this.handleInput} className="form-control">
                                            <option>Select Session</option>

                                            {this.state.sessionList && this.state.sessionList.map(x => {
                                            return(
                                                <>
                                                 <option value={x.id}>{x.name}</option>
                                                </>
                                            )
                                        })}
                                            </select>

                                        </div>
                                        <div className="col-lg-6 col-sm-12">
                                            <select required name="semester_select" onChange={this.handleInput} className="form-control">
                                            <option>Select Semester</option>

                                            {this.state.semesterList && this.state.semesterList.map(x => {
                                            return(
                                                <>
                                                 <option value={x.id}>{x.name}</option>
                                                </>
                                            )
                                        })}
                                            </select>

                                        </div>
                                        <div className="col-lg-6 col-sm-12 mt-3">
                                            <select required name="programme_select" onChange={this.handleInput} className="form-control">
                                            <option>Select Programme</option>

                                            {this.state.programmeList && this.state.programmeList.map(x => {
                                            return(
                                                <>
                                                 <option value={x.id}>{x.name}</option>
                                                </>
                                            )
                                        })}
                                            </select>

                                        </div>
                                        <div className="col-lg-6 col-sm-12 mt-3">
                                            <select required name="department_select" onChange={this.handleInput} className="form-control">
                                            <option>Select Department</option>

                                            {this.state.deptList && this.state.deptList.map(x => {
                                            return(
                                                <>
                                                 <option value={x.id}>{x.name}</option>
                                                </>
                                            )
                                        })}
                                            </select>

                                        </div>
                                        <div className="col-lg-6 col-sm-12 mt-3">
                                            <select required name="level_select" onChange={this.handleInput} className="form-control">
                                            <option>Select Level</option>

                                            {this.state.levelList && this.state.levelList.map(x => {
                                            return(
                                                <>
                                                 <option value={x.id}>{x.name}</option>
                                                </>
                                            )
                                        })}
                                            </select>

                                        </div>
                                    </div>
                                    {/* <div className="row cmt-2">
                                        <div className="col-sm-8">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                               File supported for upload is strictly <span className="text-danger">xlsx</span> and <span className="text-danger">xls</span>
                                            </p>
                                        </div>
                                    </div> */}

                                    <div className="row" style={{ marginTop: "40px" }}>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    {/* Collection Name */}
                                                    <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                               File supported for upload is strictly <span className="text-danger">xlsx</span> and <span className="text-danger">xls</span>
                                            </p>
                                                </label>
                                                <br />
                                                {/* <small style={{color:'red'}}>Invoice number invalid <i className="fa fa-warning"/></small> */}
                                                <input required  type="file" name="collection_name" className="form-control" placeholder="Enter collection name" onChange={(e) => this.handleFileChange(e)} />
                                            </div>
                                        </div>
                                       
                                    </div>

                                    
                                    <div className="row" style={{ marginTop: "46px", display:"flow-root" }}>
                                        <div className="col-sm-12 col-xl-8">
                                            <p style={{ fontSize: "12px" }} className="drk-text manrope-text cmt-1" onClick={this.handleCancel}>
                                                Close
                                            </p>
                                        </div>
                                        {this.state.isLoading ? (
                                            <div style={{ float: "right", paddingRight: "30px" }} className="manrope-text">
                                                <ClickLoader /> Processing...
                                            </div>
                                        ) : (
                                            <div className="col-sm-3" style={{float:"right"}}>
                                                <button type="submit" className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }}
                                                //  onClick={this.saveResultForIncubation}
                                                 >
                                                    Save
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                </form>
                            </Modal>

                            <Modal visible={invoiceCommited} title={false} onOk={this.closeCommitted} onCancel={this.closeCommitted} footer={false} width={!isMobile ? 582 : null}>
                                <div className="modal-top text-center">
                                    <p className="manrope-text drk-text" style={{ fontSize: "27px" }}>
                                        Collection Split successfully set!
                                    </p>

                                    <div className="row">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                Fee successfully split and set against selected vendors
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <img src={kulCheck} />
                                        </div>
                                    </div>
                                    {/* 
                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <p className="manrope-text" style={{ color: "#0e408f", fontSize: "20px" }}>
                                                Sandra Okoro
                                            </p>
                                            <p>
                                                Username: Sandramfb@gmail.com
                                                <br />
                                                Password: fjegakal62{" "}
                                            </p>
                                        </div>
                                    </div> */}

                                    {/* <div className="row" style={{ marginTop: "10px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <p className="manrope-text" style={{ color: "#05EEC0", fontSize: "14px" }}>
                                                Copy Password
                                            </p>
                                        </div>
                                    </div> */}

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }}>
                                                Ok &nbsp;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </>

                        <Fade>
                            <div className="row" style={{ textAlign: 'right' }}>
                                <div className="col-md-12">
                                   

                                    <span style={{ fontSize: "14px", marginLeft: "30px", color: "#930909", cursor: "pointer", fontWeight: "600" }} className="manrope-text mr-4">

                                        <Dropdown.Button
                                            icon={<DownOutlined />}
                                            //   loading={loadings[1]}
                                            overlay={menu}
                                        //   onClick={() => this.enterLoading(1)}
                                        >
                                            Export &nbsp; <i className="fa fa-file-pdf-o" />
                                        </Dropdown.Button>
                                    </span>
                                    {/* <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.showModal}>
                                        <i className="fa fa-plus" /> &nbsp; Upload
                                    </button> */}
                                   
                                </div>
                            </div>
                            <br />
                            {/* <div>
                                <Space direction="horizontal">
                                    Autosave &nbsp; <Switch onChange={this.toggleDateFilter} />
                                </Space>
                            </div> */}
                            <br />
                            <div id="dateFilter" style={{ display: 'none' }}>
                                {/* <Space direction="horizontal">
                                    <DatePicker onChange={this.onChangeDateFrom} />
                                    <DatePicker onChange={this.onChangeDateTo} />

                                </Space> */}
                                <p style={{fontSize:"11px", color:"#03844d"}} className="">Autosave enabled. Chnages would be saved every two(2) minutes</p>
                            </div>
                            <Space className="mt-4">
                            {/* sessionList */}
                                <Select defaultValue="Session" style={{ width: 200 }} onChange={this.handleSession}>
                                    <OptGroup label="Session">
                                        <Option value="Session">Select Session</Option>
                                        {this.state.sessionList && this.state.sessionList.map(x => {
                                            return (
                                                <Option value={x.id}>{x.name}</Option>
                                            )
                                        })}

                                    </OptGroup>

                                </Select>

                                <Select defaultValue="Programme" style={{ width: 200 }} onChange={this.handleProgramme}>
                                    <OptGroup label="Programme">
                                        <Option value="Programme">Select Programme</Option>
                                        {this.state.programmeList && this.state.programmeList.map(x => {
                                            return(
                                                <>
                                                 <Option value={x.id}>{x.name}</Option>
                                                </>
                                            )
                                        })}
                                       
                                    </OptGroup>

                                </Select>
                                <Select defaultValue="Department" style={{ width: 200 }} onChange={this.handleDepartment}>
                                    <OptGroup label="Department">
                                        <Option value="Department">Select Department</Option>
                                        {this.state.deptList && this.state.deptList.map(x => {
                                            return(
                                                <>
                                                 <Option value={x.id}>{x.name}</Option>
                                                </>
                                            )
                                        })}
                                       
                                    </OptGroup>

                                </Select>
                                
                                <Select defaultValue="Semester" style={{ width: 200 }} onChange={this.handleSemester}>
                                    <OptGroup label="Semester">
                                        <Option value="Semester">Select Semester</Option>
                                        {this.state.semesterList && this.state.semesterList.map(x => {
                                            return(
                                                <>
                                                 <Option value={x.id}>{x.name}</Option>
                                                </>
                                            )
                                        })}
                                       
                                    </OptGroup>

                                </Select>
                                <Select defaultValue="Level" style={{ width: 200 }} onChange={this.handleLevel}>
                                    <OptGroup label="Level">
                                        <Option value="Level">Select Level</Option>
                                        {this.state.levelList && this.state.levelList.map(x => {
                                            return(
                                                <>
                                                 <Option value={x.id}>{x.name}</Option>
                                                </>
                                            )
                                        })}
                                       
                                    </OptGroup>

                                </Select>
                                {/* <Select defaultValue="Semster" style={{ width: 200 }} onChange={this.handleChange}>
                                    <OptGroup label="Department">
                                        <Option value="School">Select School</Option>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                    </OptGroup>

                                </Select> */}


                                <br />
                                <button className="btn btn-primary" onClick={this.loadUnverifiedResult}>Load</button>
                            </Space>
                            <br />
                            {this.state.loadSpinner ? (
                                <>
                                    {/* <Skeleton active/> */}
                                    <Skeleton active />
                                    <Skeleton active />
                                </>
                            ) : (

                                <Fade>
                                    <table class="table table-bordered table-responsive mt-3" id="dynamicTable" style={{background:"#fff"}}>
  <thead>
    <tr>

        {this.state.dynamicColumns && this.state.dynamicColumns.map((x,i) => {
            // <th scope="col">SN</th>

            return(
            <th scope="col"><input defaultValue={x.title} type={"text"} style={{border:"none", background:"transparent"}}/> &nbsp;
               {this.between(i) ? <select>
                    <option>Unit</option>
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                    <option value={"5"}>5</option>
                    <option value={"6"}>6</option>
                    <option value={"7"}>7</option>
                    <option value={"8"}>8</option>
                    <option value={"9"}>9</option>
                    <option value={"10"}>10</option>
                    <option value={"11"}>11</option>
                    <option value={"12"}>12</option>
                    <option value={"13"}>13</option>
                    <option value={"14"}>14</option>
                    <option value={"15"}>15</option>
                </select> : null}
            </th>
            )
        })}
      
      {/* <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th> */}
    </tr>
  </thead>
  <tbody>
    {this.state.dynamicRows && this.state.dynamicRows.map((x,i) => {
        var inputName = this.state.indexHeader++
        var rowPicker = i+1
        return(
            <tr className={"row"+rowPicker}>
                <td><input type="text" defaultValue={x.sn}  style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.registrationNumber} id={x.registrationNumber.concat('',inputName)} name={x.registrationNumber.concat('',inputName)} style={{border:"none", background:"transparent"}} className={"data"+rowPicker} /></td>
                <td><input type="text" defaultValue={x.name}  style={{border:"none", background:"transparent"}} className={"text-uppercase data"+rowPicker} /></td>
                <td><input type="text" defaultValue={x.course1} name={x.name} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.course2} style={{border:"none", background:"transparent"}} className={"data"+rowPicker} /></td>
                <td><input type="text" defaultValue={x.course3} style={{border:"none", background:"transparent"}} className={"data"+rowPicker} /></td>
                <td><input type="text" defaultValue={x.course4} style={{border:"none", background:"transparent"}} className={"data"+rowPicker} /></td>
                <td><input type="text" defaultValue={x.course5} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.course6} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.course7} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.course8} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.course9} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.course10} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.course11} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.course12} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.course13} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.course14} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.carryOverCourse1} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.carryOverCourse2} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.carryOverCourse3} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.carryOverCourse4} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.carryOverCourse5} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.carryOverCourse6} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.carryOverCourse7} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.carryOverCourse8} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.carryOverCourse9} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.carryOverCourse10} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.carryOverCourse11} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.carryOverCourse12} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.carryOverCourse13} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.carryOverCourse14} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.gpabf} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.total} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.gpa} style={{border:"none", background:"transparent"}} /></td>
                <td><input type="text" defaultValue={x.remark} style={{border:"none", background:"transparent"}} /></td>
                
            </tr>
        )
    })}
    
    {/* <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>

    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr> */}
  </tbody>
</table>
<div className="">
{this.state.dynamicRows && this.state.dynamicRows.length > 0 ? <button type="button" onClick={this.pickRowAndSubmit} className="btn btn-primary">Verify <i className="fa fa-check"/></button> : null}

{this.state.showFailed ? <button type="button" onClick={() => this.setState({triggerFailed:true})} className="btn btn-danger">See Failed Saves</button> : null}
</div>
{this.state.saving ? <small>saving...</small> : null}
<br/>


                                     {/* <Table
                            columns={this.state.dynamicColumns}
                            expandable={{
                                expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                                rowExpandable: (record) => record.name !== "Not Expandable",
                            }}
                            dataSource={this.state.dynamicRows}
                            className="manrope-text table-responsive"
                        /> */}
                                    {/* <Table
                                        columns={this.state.dynamicColumns}
                                       
                                        dataSource={this.state.collectionReportState}

                                        className="manrope-text table-responsive mt-4"
                                    /> */}
                                </Fade>
                            )}
                        </Fade>

                    </div>
                </Fade>
            </>
        );
    }
}

export default ResultReport;
