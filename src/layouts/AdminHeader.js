import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom";
import Logo from "../assets/images/home/logo.png";
import { getUser, logOutUser } from "../utils/auth";

import Avatar from "../assets/images/avatar.png";

import logo from "../assets/images/nekedLogo.png"
import dashSvg from "../assets/images/dashboardSuper.svg"
import notificatiionSvg from "../assets/images/Notification.svg"
import searchSvg from "../assets/images/search.svg"
import collectionsSvg from "../assets/images/AdminColl.svg"
import SchoolDept from "../assets/images/SchoolDept.svg"
import AdminVendors from "../assets/images/AdminVendors.svg"
import AdminSuperTel from "../assets/images/AdminSuperTel.svg"
import AdminReports from "../assets/images/AdminReports.svg"
import sch_dept_active from "../assets/images/sch_dept_active.png"
import dash_inactive from "../assets/images/dash_inactive.png"
import BursarActiveCol from "../assets/images/bursarActiveCol.png"
import vendorActive from "../assets/images/vendorActive.png"
import { Drawer, Button, Space, Radio, List, Typography, Divider } from 'antd';
import {LoginOutlined} from '@ant-design/icons';

import trans_white from "../assets/images/transac_white.svg"
import logOutSvg from "../assets/images/dashprofile-icon.svg"
import settingsTop from "../assets/images/settings_applications.svg"
import dashTopSvg from "../assets/images/dash-svg.svg"
import TellersSide from "../assets/images/TellersSide.svg"
import DocMoney from "../assets/images/Doc_Money.svg"

import { UserContext } from "../Context/UserContext"
import * as Unicons from '@iconscout/react-unicons';

// reactstrap components
import {
	Collapse,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Media,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Container,
	Row,
	Col
} from "reactstrap";
import { enquireScreen } from "enquire-js";

import { useMergeState } from "../utils/helpers";
const listStyle = {
	color: '#000000b5',
	cursor:'pointer',
	fontWeight:'700'
}
let isMobile;
enquireScreen((b) => {
	isMobile = b;
});
const AdminHeader = (props) => {
	//const context = useContext(UserContext)

	const [navValues, setNavValues] = useMergeState({
		collapseOpen: false,
		redirect: false,
		payLoad: JSON.parse(localStorage.getItem('_IDENTITY_')),

		drop1: false,
		activeClasses: [false, false, false, false],
		user: getUser(),
	});
	const onClose = () => {
		setNavValues({visible:false});
	  };
	// toggles collapse between opened and closed (true/false)
	const toggleCollapse = () => {
		setNavValues({
			collapseOpen: !navValues.collapseOpen
		});
	};

	const toggleDrop1 = () => {
		setNavValues({
			drop1: !navValues.drop1
		})
	};

	const logout = () => {
		localStorage.clear();
		setNavValues({
			redirect: true
		})
	};
	const MenuToggle = (id) => {
		var element = document.getElementsByClassName("admin-side-active");
		if (element.length > 0) {
			for (var i = 0; i < element.length; i++) {
				element[i].className = 'admin-side';
			}

			var currentNode = document.getElementById(`${id}`);
			currentNode.className = "admin-side-active"
			setNavValues({
				isIcon: id
			})
		}

	}
	const toggleDrop2 = () => {
		setNavValues({
			drop2: !navValues.drop2,
		});
	};

	const toggleDrop3 = () => {
		setNavValues({
			drop3: !navValues.drop3,
		});
	};

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('_IDENTITY_'));
		//context.loadDataFromServer()
		setNavValues({ payLoad: user });
		let extURL = document.URL;
		var url = new URL(extURL);
		var arraySplit = extURL.split("/");
		var fuseIndex = arraySplit[arraySplit.length - 2] + arraySplit[arraySplit.length - 1]
		console.log(fuseIndex, "fused")
		var element = document.getElementsByClassName("admin-side-active");
		if (element.length > 0) {
			for (var i = 0; i < element.length; i++) {
				element[i].className = 'admin-side';
			}

			var currentNode = document.getElementById(`${fuseIndex}`);
			if (currentNode == null || currentNode == undefined) {
				for (var i = 0; i < element.length; i++) {
					element[i].className = 'admin-side';
				}
				setNavValues({
					isIcon: "null"
				})
			}
			else {
				currentNode.className = "admin-side-active"
				setNavValues({
					isIcon: fuseIndex
				})
			}

		}
	}, []);
	const showDrawer = (e) => {
		setNavValues({visible:true});
		// e.preventDefault();
			
		// 	getRedux = reduxState(stateKeys.USER, user);
		// 	console.log(user, "usee")
	
		// 	console.log(getRedux.user[stateKeys.USER], "get")
	  };
	 
	return (
		<>
		<Drawer
        title={<><img alt={'logo'} style={{width:'50px', height:'50px'}} className="navbar-brand-img mr-2" src={logo} />System Settings</>}
        placement={'left'}
        width={500}
        onClose={onClose}
        visible={navValues.visible}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
          <div className="manrope-text">
         
    <List
   
    >
        <List.Item >
            <Link style={listStyle} to="/superadmin/schooldepartments" onClick={onClose}>
        <LoginOutlined /> &nbsp; Department/School Settings
        </Link>
        </List.Item>
        <List.Item>
        <Link style={listStyle} to="/superadmin/tellerbanks" onClick={onClose}>
        <LoginOutlined /> &nbsp; Course Settings
        </Link>
        </List.Item>
        <List.Item>
        <Link style={listStyle} to="/superadmin/paymentgateways" onClick={onClose}>
        <LoginOutlined /> &nbsp; Session/Semester Settings
        </Link>
        </List.Item>
        </List>
        
              </div>
       
      </Drawer>
			<Navbar className="navbar-vertical fixed-left navbar-dark" style={{ backgroundColor: "#FFF" }} expand="md" id="sidenav-main" >
				<Container fluid>
					{/* Toggler */}
					<button className="navbar-toggler" type="button" onClick={toggleCollapse} >
						<span className="navbar-toggler-icon" />
					</button>

					{/* Brand */}
					{/* {logo ? ( */}
					<NavbarBrand className="py-0" style={{ textAlign: 'left' }}>
						<img alt={'logo'} style={{ width: '45px' }} className="navbar-brand-img mr-2" src={logo} />
						<span className='manrope' style={{ fontSize: "16px" }}> &nbsp; FPNO-OCR</span>
						{/* <Link className="h4 mb-0 text-white d-none d-md-inline-block" to="/" >
							e-Learn NG
						</Link> */}
					</NavbarBrand>
					{/* ) : null} */}

					{/* User */}
					<Nav className="align-items-center d-md-none">

						<UncontrolledDropdown nav>
							<DropdownToggle nav>
								<Media className="align-items-center">

									<span className="avatar avatar-sm rounded-circle">
										<img alt="avatar" src={Avatar} />
									</span>
								</Media>
							</DropdownToggle>

							<DropdownMenu className="dropdown-menu-arrow" right>
								<DropdownItem className="noti-title" header tag="div">
									<h6 className="text-overflow m-0">Welcome!</h6>
								</DropdownItem>

								<DropdownItem to="/student/profile" tag={Link}>
									<Unicons.UilUserCircle size="20" />
									<span>My profile</span>
								</DropdownItem>

								<DropdownItem divider />

								<DropdownItem onClick={() => logOutUser(false)}>
									<Unicons.UilSignout size="20" />
									<span>Logout</span>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
					{/* Collapse */}
					<Collapse navbar isOpen={navValues.collapseOpen} style={{ overflow: 'hidden' }}>
						{/* Collapse header */}
						<div className="navbar-collapse-header d-md-none">
							<Row>
								<Col className="" xs="9">
									<img alt={'logo'} className="navbar-brand-img mr-2" src={logo} />
									{/* <span className="font-weight-bold"> ABSU KulPay </span> */}
								</Col>

								<Col className="collapse-close" xs="3">
									<button
										className="navbar-toggler"
										type="button"
										onClick={toggleCollapse}
									>
										<span />
										<span />
									</button>
								</Col>
							</Row>
						</div>

						{/* Navigation */}
						{/* Divider */}

						{/* Navigation */}
						<Nav className="mt-md-4 mb-md-3" navbar style={{ marginTop: '2.5rem' }}>
							<NavItem className="admin-side-active admin-side" to="/admin/index" tag={Link} id="adminindex" onClick={() => MenuToggle("adminindex")}>
								<NavLink>
									{/* <Unicons.UilApps size="20"/> &nbsp; */}
									{navValues.isIcon === "adminindex" ? <img src={dashSvg} style={{ width: '18px' }} /> : <img src={dash_inactive} style={{ width: '18px' }} />}
									&nbsp; &nbsp;
									{/* <img src={dashSvg} style={{width:'18px'}}/> &nbsp; &nbsp; */}
									Dashboard
								</NavLink>
							</NavItem>

							<NavItem className="admin-side" to="/admin/schooldepartments" tag={Link} id="adminschooldepartments" onClick={() => MenuToggle("adminschooldepartments")}>
								<NavLink>
									{navValues.isIcon === "adminschooldepartments" ? <img src={sch_dept_active} style={{ width: '18px' }} /> : <img src={SchoolDept} style={{ width: '18px' }} />}
									&nbsp; &nbsp;
									{/* <img src={SchoolDept} style={{width:'18px'}}/> &nbsp; &nbsp; */}

									School/Departments
								</NavLink>
							</NavItem>
							<NavItem className="admin-side">
								<NavLink to="#" onClick={() => toggleDrop2()}>
									<img src={AdminReports} style={{ width: '18px' }} /> &nbsp; &nbsp;

									OCR Management
								</NavLink>
							</NavItem>

							<li className="nav-item">


								<div
									className={navValues.drop2 ? "show" : "collapse"}
									style={{}}
								>
									<ul className="nav-sm flex-column nav rep_nav">
										<NavLink to="/admin/sheetupload" tag={Link}>
											Upload Sheet
										</NavLink>

										<NavLink to="/admin/ocr_manipulation" tag={Link}>
											Pull/Modify Sheet
										</NavLink>

									</ul>
								</div>
							</li>
							<NavItem className="admin-side">
								<NavLink to="#" onClick={() => toggleDrop3()}>
								{navValues.isIcon === "adminresultview" ? <img src={BursarActiveCol} style={{ width: '18px' }} /> : <img src={collectionsSvg} style={{ width: '18px' }} />}
									&nbsp;
									&nbsp;
									Result Manager
								</NavLink>
							</NavItem>

							<li className="nav-item">


								<div
									className={navValues.drop3 ? "show" : "collapse"}
									style={{}}
								>
									<ul className="nav-sm flex-column nav rep_nav">
										<NavLink to="/admin/resultreport" tag={Link}>
											Report(Bulk)
										</NavLink>

										{/* <NavLink to="/admin/collectionreport" tag={Link}>
											Manage result
										</NavLink> */}

									</ul>
								</div>
							</li>
							
							{/* <NavItem className="admin-side" to="/admin/vendors" tag={Link} id="adminvendors" onClick={() => MenuToggle("adminvendors")}>
								<NavLink>
									{navValues.isIcon === "adminvendors" ? <img src={vendorActive} style={{ width: '18px' }} /> : <img src={AdminVendors} style={{ width: '18px' }} />}
									&nbsp; &nbsp;

									Vendors
								</NavLink>
							</NavItem> */}
							{/* <NavItem className="admin-side">
								<NavLink to="/teller/instructors">
                                <img src={AdminSuperTel} style={{width:'18px'}}/> &nbsp; &nbsp;

									Super tellers
								</NavLink>
							</NavItem> */}

							{/* 							
							<NavItem>
								<NavLink href="/hod/courses">
									<Unicons.UilUserCircle size="20"/> &nbsp;
									Profile
								</NavLink>
							</NavItem>
							
							<NavItem>
								<NavLink href="#" onClick={() => logOutUser(false)}>
									<Unicons.UilSignout size="20"/> &nbsp;
									Logout
								</NavLink>
							</NavItem> */}
							{!isMobile ? <div className="sub_div2 container">
								<hr />
								<p onClick={showDrawer}><a className="manrope-text" >Settings</a></p>
								{/* <p><a className="manrope-text">Contact us</a></p> */}
							</div> : null}
						</Nav>

					</Collapse>
				</Container>
			</Navbar>

			<div className="main-content">
				<Navbar className="navbar-top navbar-light d-none d-md-block" expand="md" id="navbar-main">
					<div className="container-fluid">
						<Link className="h4 mb-0 d-none d-lg-inline-block" to="/" >
							{/* ABSU e-Learn NG */}
						</Link>

						<Nav className="align-items-center d-none d-md-flex" navbar>
							<span>
								{/* <img src={searchSvg} style={{ width: '24px', height: '24px', marginRight: '40px' }} /> */}
								{/* <img src={notificatiionSvg} style={{ width: '24px', height: '24px', marginRight: '40px' }} /> */}
							</span>
							<UncontrolledDropdown nav>
								<DropdownToggle className="pr-0" nav>
									<Media className="align-items-center">
										<div className="row profile-drop">
											<div className="col-sm-2">
												<span className="avatar avatar-sm rounded-circle">
													<img alt="..." src={Avatar} />
												</span>
											</div>

											<div className="col-sm-7" style={{ marginTop: '5px', marginLeft: '9px' }}>
												<p className="manrope drk-text" style={{ fontSize: '9px', lineHeight: '4px' }}>
													{navValues.payLoad?.fullName?.length > 17 ? navValues.payLoad?.fullName.substring(0, 17) + ".." : navValues.payLoad?.fullName}
													{/* {context?.testName} */}
												</p>
												<p className="manrope-text" style={{ fontSize: '10px', lineHeight: '4px' }}>Admin</p>
											</div>

											<div className="col-sm-1" style={{ marginTop: '5px', marginLeft: '10px' }}>
												<i className="fa fa-caret-down" />
											</div>
										</div>
										{/* <span className="avatar avatar-sm rounded-circle">
										<img alt="..." src={Avatar} />
									</span> */}
										{/* <Media className="ml-2 d-none d-lg-block">
										<span className="mb-0 text-sm font-weight-bold">
                                            Scott Obi
											{navValues.payLoad.fullName}
										</span>
										</Media> */}
									</Media>
								</DropdownToggle>
								<DropdownMenu className="dropdown-menu-arrow" right>
									{/* <DropdownItem className="noti-title" header tag="div">
										<h6 className="text-overflow m-0">Welcome!</h6>
									</DropdownItem> */}

									<DropdownItem to="/admin/user-profile" tag={Link}>
										<img src={dashTopSvg} style={{ width: '24px', height: '24px', marginRight: '20px' }} />
										<span className="manrope-text" style={{ fontSize: '12px' }}>Dashboard</span>
									</DropdownItem>

									<DropdownItem to="/accountsettings" tag={Link}>
										<img src={settingsTop} style={{ width: '24px', height: '24px', marginRight: '20px' }} />
										<span className="manrope-text" style={{ fontSize: '12px' }}>Account Settings</span>
									</DropdownItem>

									<DropdownItem onClick={() => logOutUser(false)}>
										<img src={logOutSvg} style={{ width: '24px', height: '24px', marginRight: '20px' }} />
										<span className="manrope-text" style={{ fontSize: '12px' }}>Logout</span>
									</DropdownItem>
									{/* <DropdownItem divider />
									
									<DropdownItem onClick={() => logOutUser(false)}>
										<i className="ni ni-user-run" />
										<span>Logout.</span>
									</DropdownItem> */}
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</div>

				</Navbar>
			</div>

		</>
	);
};
// AdminHeader.contextType = UserContext;
export default AdminHeader;