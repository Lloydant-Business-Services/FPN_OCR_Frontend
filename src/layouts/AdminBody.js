import React, {Suspense} from 'react';
import Header from "./AdminHeader";
import {Route, Switch} from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../redux/actions";

import SuperAdminDashboard from "../pages/Admin/Dashboard";
import DashboardActive from "../pages/Admin/DashboardActive";
import Verification from "../pages/Admin/Verification";
import AccountVerification from "../pages/Admin/AccountVerification";
import Collections from "../pages/Admin/Collections";
import Vendors from "../pages/Admin/Vendors";
import SchoolDepartments from "../pages/Admin/SchoolDepartments";
import SettlementReport from "../pages/Admin/Report/SettlementReport";
import CollectionReport from "../pages/Admin/Report/ocrsheet";
import AjaxTable from "../pages/Admin/Report/ajaxTable";
import Resultview from "../pages/Admin/resultview";

// import NewCollection from "../pages/SuperAdmin/NewCollection";

const AdminBody = (props) => {
	return (
		<>
			<div className={props[stateKeys.PAGE_CLASS] + ' container-fluid'}>
				<section className="sidenav-enabled row pb-3 pb-md-4">
					<div className="col-xl-12">
						<Header/>
						<ErrorBoundary>
							<Suspense fallback={<p>Loading...</p>}>
                            <div className="main-content pt-md-5">
								<Switch>
									<Route path={'/admin/index'} component={SuperAdminDashboard} exact={true}/>
									<Route path={'/admin/index2'} component={DashboardActive} exact={true}/>
									<Route path={'/admin/verification'} component={Verification} exact={true}/>
									<Route path={'/admin/collections'} component={Collections} exact={true}/>
									<Route path={'/admin/vendors'} component={Vendors} exact={true}/>
									<Route path={'/admin/schooldepartments'} component={SchoolDepartments} exact={true}/>
									<Route path={'/admin/sheetupload'} component={SettlementReport} exact={true}/>
									<Route path={'/admin/ocr_manipulation'} component={CollectionReport} exact={true}/>
									<Route path={'/admin/ajaxtable'} component={AjaxTable} exact={true}/>
									<Route path={'/admin/resultview'} component={Resultview} exact={true}/>
									{/* <Route path={'/admin/newCollection'} component={NewCollection} exact={true}/> */}
									<Route path={'/admin/account_verification'} component={AccountVerification} exact={true}/>
								</Switch>
                                </div>
							</Suspense>
						</ErrorBoundary>
					</div>
				</section>
			</div>
		</>
	)
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminBody);