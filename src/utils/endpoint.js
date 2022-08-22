import axios from 'axios'
import {notify, objectToHTTPQuery} from "./helpers";
import {getUserToken, logOutUser, rememberRoute} from "./auth";

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'token': localStorage.getItem('token'),
};

let fileHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    'token': localStorage.getItem('token'),
};

const Endpoint = {
    init: () => {
        // accountId = process.env.REACT_APP_ACCOUNT_ID;
        let token = getUserToken();
        if (token)
            axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        //axios.defaults.baseURL = "https://backends.kulpayng.com/api";
        axios.defaults.baseURL = "http://10.211.55.3/api";
        
        
        // Intercept 401 HTTP Error code in API
        axios.interceptors.response.use(response => response, (error) => {
            if (!error.response) {
                //No response
                // notify("Seems like you're offline, check internet connection")
            } else if (error.response && error.response.status === 401 && error.response.config.url !== '/signin') {
                rememberRoute();
                logOutUser();
            }

            return Promise.reject(error.response);
        });
    },
    

    // ---Auth--- //
    login: (data) => {
        return axios.post(`/User/Authenticate`, data, headers)
    },
    schoolSignUp: (data) => {
        return axios.post(`/Account/SchoolSignUp`, data, headers)
    },
    verifyAccount: (data) => {
        return axios.post(`/Account/AccountVerificationType`, data, headers)
    },


    accountActivationByPhone: (data) => {
        return axios.post(`/Account/AccountVerificationByPhoneNumber`, data, headers)
    },
    createCollection: (data) => {
        return axios.post(`/Collection/CreateCollection`, data, headers)
    },
    
    addVendor: (data) => {
        return axios.post(`/Vendor/Post`, data, headers)
    },

    addTellerUser: (data) => {
        return axios.post(`/Account/AddTellerUser`, data, headers)
    },
    
    addDepartment: (data) => {
        return axios.post(`/Department/Post`, data, headers)
    },
    addTellerBank: (data) => {
        return axios.post(`/TellerBank/Post`, data, headers)
    },
   
    addFaculty: (data) => {
        return axios.post(`/Faculty/Post`, data, headers)
    },
    
    toggleUserStatus: (data, status) => {
        return axios.post(`/Account/ToggleUserStatus?UserId=${data}&status=${status}`, data, headers)
    },
    
    getAllVendorByInstitution: (data) => {
        return axios.get(`/Vendor/GetAllVendorBy?InstitutionId=${data}`, headers)
    },
    getInstitutionCollections: (data) => {
        return axios.get(`/Collection/GetByInstitutionId?institutionId=${data}`, headers)
    },
    getInstitutionCollectionsFeeSplit: (data) => {
        return axios.get(`/CollectionFeeSplit/GetCollectionFeeSplitByCollectionId?CollectionId=${data}`, headers)
    },

    postCollectionFeeSplit: (data) => {
        return axios.post(`/CollectionFeeSplit/CreateCollectionFeeSplit`, data, headers)
    },

    postCollectionPlatform: (data) => {
        return axios.post(`/CollectionPlatform/Post`, data, headers)
    },
    
    getAllUsers: (data) => {
        return axios.get(`/Account/ManageUsers${data}`, headers)
    },
    getTellerBanks: () => {
        return axios.get(`/TellerBank`, headers)
    },
    getPaymentGateways: () => {
        return axios.get(`/PaymentGateway`, headers)
    },
    
    getPersonDetails: (data) => {
        return axios.get(`/Person/${data}`, headers)
    },
    getInstitutionType: () => {
        return axios.get(`/InstitutionType/`, headers)
    },
    getDepartments: () => {
        return axios.get(`/Department/GetDepartments`, headers)
    },
    getFaculties: () => {
        return axios.get(`/Faculty/`, headers)
    },
    
    personVerification: (data) => {
        return axios.post(`/Account/PersonVerification`, data, fileHeaders)
    },
    InstitutionVerification: (data) => {
        return axios.post(`/Account/InstitutionVerification`, data, fileHeaders)
    },

    addPaymentGateway: (data) => {
        return axios.post(`/PaymentGateway/Post`, data, fileHeaders)
    },
    
    // ---Roles--- //
    getAllRoles: () => {
        return axios.get(`/Role/GetRoles`, headers)
    },

    getAllfaculties: () => {
        return axios.get(`/Faculty`, headers)
    },
    getAllDepartments: () => {
        return axios.get(`/Department`, headers)
    },
    
    postInstitutionFaculty: (data) => {
        return axios.post(`/Faculty/PostInstitutionFaculty`,data, headers)
    },
    
    postInstitutionDepartments: (data) => {
        return axios.post(`/Department/PostInstitutionDepartment`,data, headers)
    },
    
    
    // User
    getUserProfile: (data) => {
        return axios.get(`/User/UserProfile?userId=${data}`, headers)
    },

    getInstitutionFaculty: (institutionId, status) => {
        return axios.get(`/Faculty/GetInstitutionFaculty?InstitutionId=${institutionId}&status=${status}`, headers)
    },

    applyCollection: (data) => {
        return axios.post(`/CollectionDetail/CreateApplyCollection`, data, headers)
    },

    getActiveSession: () => {
        return axios.get(`/Session`, headers)
    },

    getActiveLevels: () => {
        return axios.get(`/Collection/GetAllActiveLevelAlt`, headers)
    },

    getAllProgrammes: () => {
        return axios.get(`/Programme/GetAllProgramme`, headers)
        //return axios.get(`Programme/GetInstitutionProgramme?InstitutionId=95da019c-7762-48f4-a2be-ff61f599a0fd&status=${true}`, headers)
    },

    getInstitutionLevel: (institutionTypeId) => {
        return axios.get(`/Level/GetLevelByInstitutionId?Id=${institutionTypeId}`, headers)
    },
    //Reporting
    getCollectionBy: (collectionId, dateFrom, dateTo) => {
        return axios.get(`/Collection/CollectionReportBy?collectionId=${collectionId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
    },

    getAllSemester: () => {
        return axios.get(`/Semster/GetAllSemester`, headers)
    },
    getAllLevel: () => {
        return axios.get(`/Level/GetLevels`, headers)
    },

    getUnverifiedresultsBy: (programmeId, departmentId, sessionId, semesterId, levelId) => {
        return axios.get(`ResultVetting/ProcessSheetForDisplayAndManipulation?departmentId=${departmentId}&programmeId=${programmeId}&sessionId=${sessionId}&semesterId=${semesterId}&levelId=${levelId}`, headers)
    },
    
    
};



export default Endpoint