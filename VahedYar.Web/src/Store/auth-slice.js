import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hashPassword } from "../feratures/helper/helper";
import { sha256 } from 'crypto-hash';
// local Storage
const initialToken = localStorage.getItem('token');
const initialUserInfo = JSON.parse(localStorage.getItem('userInfo'));

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: initialToken ? initialToken : '',
        serversideErros: { email: '', password: '', phoneNumber: '' },
        clientsideErrors: { email: '', username: '', password: '', rePassword: '', firstName: '', lastName: '', phoneNumber: '' },
        userInfo: initialUserInfo ? initialUserInfo : {},
        userAlowedToSubmit: false,
        //isLoggedIn: !!initialToken,
        isLoggedIn: true,
        hadAccount: true,
        showEditModal: false,
    },
    reducers: {
        validateInput(state, action) {
            var inputVal = action.payload.inputTypeVal;
            // for rePassword validating
            var inputSideVal = action.payload.inputSideVal;
            // For required check
            var isRequired = action.payload.isRequired;

            //for PASSWORD
            if (action.payload.inputType === 'PASSWORD') {
                if (!inputVal) state.clientsideErrors.password = ' رمز رو باید وارد کنی';
                else if (inputVal.length < 8)state.clientsideErrors.password = 'رمز شما باید حداقل 8 کرکتر داشته باشد';         
                else if (inputVal.search(/[a-z]/i) < 0) state.clientsideErrors.password = 'رمز شما باید از چند حرف انگلیسی تشکیل شده باشد';
                else if (inputVal.search(/[0-9]/) < 0) state.clientsideErrors.password = 'رمز شما باید شامل چند عدد باشد';
                else if (inputVal.search(/[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC]/) > 0) 
                    state.clientsideErrors.password = 'رمز شما نمی تواند شامل حروف فارسی باشد';
                else state.clientsideErrors.password = '';
            }
            //for REPASSWORD
            if (action.payload.inputType === 'REPASSWORD') {
                if (!inputVal) state.clientsideErrors.rePassword = ' تکرار رمز رو باید وارد کنی';               
                else if (inputVal !== inputSideVal) state.clientsideErrors.rePassword = 'تکرار رمز با خود رمز برابر نیست';
                else state.clientsideErrors.rePassword = '';
            }
            //for PHONENUMBER
            if (action.payload.inputType === 'PHONENUMBER') {
                var validateresult = inputVal?.match(/^0?9[0-9]{9}$/);        
                if (!inputVal && isRequired) state.clientsideErrors.phoneNumber = 'شماره همراه رو باید وارد کنی';
                else if (!validateresult && inputVal) state.clientsideErrors.phoneNumber = 'شماره همراه معتبر نیست';
                else state.clientsideErrors.phoneNumber = '';
            }
            //for EMAIL
            if (action.payload.inputType === 'EMAIL') {           
                if (!inputVal && isRequired) state.clientsideErrors.email = 'ایمیل رو باید وارد کنی';
                else if (!inputVal?.includes("@") && inputVal)  state.clientsideErrors.email = 'ایمیل معتبر نیست';
                else if (inputVal?.search(/[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC]/) !== -1 && inputVal)
                    state.clientsideErrors.email = 'ایمیل شما نمی تواند شامل حروف فارسی باشد';
                else state.clientsideErrors.email = '';
            }   
            //for USERNAME
            if (action.payload.inputType === 'USERNAME') {
                if (!inputVal && isRequired) state.clientsideErrors.username = ' نام‌کاربری رو باید وارد کنی';
                else if (inputVal?.search(/[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC]/) !== -1) state.clientsideErrors.username = 'برای نام‌کاربری نمی‌تونی از حروف فارسی استفاده کنی ';
                else if (inputVal?.length > 12 && inputVal) state.clientsideErrors.username = 'نام‌کاربری کوتاه تری انتخاب کن';
                else state.clientsideErrors.username = '';
            }   

        },
        resetErrors(state, action) {
            state.clientsideErrors.email = '';
            state.clientsideErrors.username = '';
            state.clientsideErrors.password = '';
            state.clientsideErrors.rePassword = '';
            state.clientsideErrors.firstName = '';
            state.clientsideErrors.lastName = '';
            state.clientsideErrors.phoneNumber = '';
            state.userInfo["username"] ='';
            state.userInfo["password"] ='';
            state.userInfo["phoneNumber"] ='';
            state.userInfo["email"] ='';
        },
        userHadAccStatus(state, action) {
            let hadAcc = action.payload;
            state.hadAccount = hadAcc;
        },
        logout(state) {
            state.token = null;
            localStorage.removeItem('token');
            state.isLoggedIn = false;
        },
        userInfoKeeper(state, action) {
            var inputVal = action.payload.inputTypeVal;
            var inputType = action.payload.inputType;
            if (inputVal) {
                if (inputType === "EMAIL") {
                    state.userInfo["email"] = inputVal;
                }
                if (inputType === "USERNAME") {
                    state.userInfo["username"] = inputVal;
                }
                if (inputType === "PASSWORD")
                {
                    state.userInfo["password"] = inputVal;
                }
                if (inputType === "PHONENUMBER") {
                    state.userInfo["phoneNumber"] = inputVal;
                }
                //if (inputType === "UNI") {
                //    state.userInfo["uni"] = inputVal;         
                //}
                if (inputType === "GROUP") {
                    state.userInfo["group"] = inputVal;
                }
                if (inputType === "EDLEVEL") {
                    state.userInfo["eduLevel"] = inputVal;
                }
                localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
            }
    
        },
        editModalToggle(state, action) {
            state.showEditModal = !state.showEditModal
        },
        //clear local storage
        clearLocalStorage(state, action) {
            let type = action.payload.type;
            if (type === "USERINFO") localStorage.removeItem('userInfo');
            if (type === "TOKEN") localStorage.removeItem('token');
        },
           
    },
});

export const authActions = authSlice.actions;
export default authSlice;