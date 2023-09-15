import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sha256 } from 'crypto-hash';
import { validateEmail, validatePhoneNumber, validateRePassword, validatePassWord, validateUsername } from "../feratures/validations/authValidation";
// local Storage
const initialToken = localStorage.getItem('token');
const initialUserInfo = JSON.parse(localStorage.getItem('userInfo'));

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: initialToken ? initialToken : '',
        clientsideErrors: { email: '', username: '', password: '', rePassword: '', firstName: '', lastName: '', /*phoneNumber: ''*/ },
        User: initialUserInfo ? initialUserInfo : {},
        //isLoggedIn: !!initialToken,
        isLoggedIn: true,
        hadAccount: true,
    },
    reducers: {
        resetErrors(state, action) {
            state.clientsideErrors.email = '';
            state.clientsideErrors.username = '';
            state.clientsideErrors.password = '';
            state.clientsideErrors.rePassword = '';
            state.User["username"] ='';
            state.User["password"] ='';
            state.User["email"] ='';
        },
        userHadAccStatus(state, action) {
            let hadAcc = action.payload;
            state.hadAccount = hadAcc;
        },
        userInfoKeeper(state, action) {
            var inputVal = action.payload.inputTypeVal;
            var inputType = action.payload.inputType;
            var isRequired = action.payload.isRequired;
            var hashedPass = action.payload.hashedPass;
            switch (inputType) {

                case "EMAIL":
                    let { status: isEmailValid, Message: emailErrorMessage } = validateEmail(inputVal, isRequired);
                    if (isEmailValid) {
                        state.User["email"] = inputVal;
                        state.clientsideErrors.email = '';
                    } else state.clientsideErrors.email = emailErrorMessage;
                    break;

                case "USERNAME":
                    let { status: isUsernameValid, Message: usernameErrorMessage } = validateUsername(inputVal, isRequired);
                    if (isUsernameValid) {
                        state.User["username"] = inputVal;
                        state.clientsideErrors.username = '';
                    } else state.clientsideErrors.username = usernameErrorMessage;
                    break;

                case "PASSWORD":
                    let { status: isPasswordValid, Message: passwordErrorMessage } = validatePassWord(inputVal, isRequired);
                    if (isPasswordValid) {
                        state.User["password"] = hashedPass;
                        state.clientsideErrors.password = '';
                    } else state.clientsideErrors.password = passwordErrorMessage;
                    break;

                case "REPASSWORD":
                    let { status: isRePasswordValid, Message: rePasswordErrorMessage } = validateRePassword(inputVal, isRequired, state.User.password);
                    if (!isRePasswordValid) {
                        state.clientsideErrors.rePassword = rePasswordErrorMessage;
                    } else {
                        state.clientsideErrors.rePassword = '';
                    }
                    break;

                case "GROUP":
                    state.User["group"] = inputVal;
                    break;

                case "EDLEVEL":
                    state.User["eduLevel"] = inputVal;
                    break;

                default:
                    break;

            }
            localStorage.setItem('User', JSON.stringify(state.User));
        }
    },

});

export const authActions = authSlice.actions;
export default authSlice;