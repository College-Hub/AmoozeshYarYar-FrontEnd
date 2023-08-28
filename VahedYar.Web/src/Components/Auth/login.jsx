import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { authActions, requestData } from "../../Store/auth-slice";
import { uiActions } from "../../Store/ui-slice";

import './login.css';

const Login = () => {
    // states
    const serversideErros = useSelector(state => state.auth.serversideErros);
    const clientsideErrors = useSelector(state => state.auth.clientsideErrors);
    const isLoading = useSelector(state => state.auth.isLoading);
    const showPassWord = useSelector(state => state.ui.showPassWord);
    const userInfo = useSelector(state => state.auth.userInfo);

    // dispath
    const dispatch = useDispatch();

    // variables
    var enteredEmail;
    var enteredPassword;

    // input bular handler
    const emailBulrHandler = (event) => {
        enteredEmail = event.target.value;
        //validate     
        dispatch(authActions.validateInput({ inputType: 'EMAIL', inputTypeVal: enteredEmail, inputSideVal: '' }));

    };
    const passwordBulrHandler = (event) => {
        enteredPassword = event.target.value;
        //validate
        dispatch(authActions.validateInput({ inputType: 'PASSWORD', inputTypeVal: enteredPassword, inputSideVal: '' }));
    };

    // event handlers

    const showPassword = () => {
        dispatch(uiActions.hidePassword());
        setTimeout(() => {
            dispatch(uiActions.hidePassword());
        }, 2000)
    };

    const sumbitHandler = (event) => {
        event.preventDefault();
        if (!(clientsideErrors.password || clientsideErrors.email) && (userInfo.email && userInfo.password)) {
            //dispatch(
            //    requestData({ email: userInfo.email, password: userInfo.password, hadAccount: false, fullName: '', phoneNumber: ', university: '', subject: '' })
            //);
            console.log({ email: userInfo.email, password: userInfo.password, hadAccount: false})
        }
        else {
            //validation
            dispatch(authActions.validateInput({ inputType: 'EMAIL', inputTypeVal: userInfo.email, inputSideVal: '' }));
            dispatch(authActions.validateInput({ inputType: 'PASSWORD', inputTypeVal: userInfo.password, inputSideVal: '' }));

        }
    };
    return (
        <form className="col-12 col-sm-8 custome-outlet" id="loginForm" onSubmit={sumbitHandler}>
            <h3 className="mt-3"> <i className="bi bi-person-check"></i> ورود</h3>
            <div className="row">
                <div className="col-12 col-md-6 ">
                    <div className="col-12 mt-3">
                        <label htmlFor="exampleInputEmail" className="form-label"><i className="bi bi-envelope-at"></i>  ایمیل :</label>
                        <input type="email" className="form-control custome-input" id="exampleInputEmail" onBlur={emailBulrHandler} aria-describedby="emailHelp" />
                        {
                            clientsideErrors.email && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><i className="bi bi-exclamation-octagon"></i>{clientsideErrors.email}</span></div>
                        }
                    </div>
                    <div className="col-12 mt-3">
                        <label htmlFor="exampleInputpassword" className="form-label d-inline"> <i className="bi bi-lock"></i> رمز:</label>
                        <div className="showpass d-inline m-3">
                            <i className="bi bi-eye " onClick={showPassword}></i>
                        </div>
                        <input type="text" className="form-control custome-input mt-1" id="exampleInputpassword" onBlur={passwordBulrHandler} aria-describedby="passwordHelp" placeholder="رمز" disabled={showPassWord} />
                        {
                            clientsideErrors.password && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><i className="bi bi-exclamation-octagon"></i>{clientsideErrors.password}</span></div>
                        }
                    </div>
                    
                </div>
                <div className="col-12 col-md-6">
                    <p className="mt-4">
                        در صورتی که حساب کاربری ندارید بر روی لینک عضویت کلیک کنید تا در کمترین زمان یک حساب کاربری ایجاد کنید .
                    </p>
                </div>
            </div>
            <div className="d-grid gap-2 d-lg-inline-block text-start">
                <button type="submit" className=" custome-submit-btn ">ثبت</button>
            </div>
            
        </form>
    );
};

export default Login; 