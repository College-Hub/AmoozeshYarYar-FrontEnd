import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { authActions, requestData } from "../../Store/auth-slice";
import { BsInfoCircle, BsSend, BsLock, BsPersonCheck, BsEnvelopeAt, BsPerson, BsEye, BsExclamationOctagon } from "react-icons/bs";
import { uiActions } from "../../Store/ui-slice";
import { useCookies } from 'react-cookie';

import './login.css';
import { useLoginMutation } from "../../feratures/api/apiSlice";

const Login = () => {
    // states
    const serversideErros = useSelector(state => state.auth.serversideErros);
    const clientsideErrors = useSelector(state => state.auth.clientsideErrors);
    const isLoading = useSelector(state => state.auth.isLoading);
    const showPassWord = useSelector(state => state.ui.showPassWord);
    const userInfo = useSelector(state => state.auth.userInfo);

    //query 
    const [ login ,{ isLoading: isloading, isEroor } ] = useLoginMutation();

    // dispath
    const dispatch = useDispatch();

    // variables
    var enteredUsername;
    var enteredPassword;

    // input bular handler
    const usernameBulrHandler = (event) => {
        enteredUsername = event.target.value;
        //validate     
        dispatch(authActions.validateInput({ inputType: 'USERNAME', inputTypeVal: enteredUsername, inputSideVal: '' }));

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
            console.log({ email: userInfo.email, password: userInfo.password, hadAccount: false})
        }
        else {
            //validation
            dispatch(authActions.validateInput({ inputType: 'EMAIL', inputTypeVal: userInfo.email, inputSideVal: '' }));
            dispatch(authActions.validateInput({ inputType: 'PASSWORD', inputTypeVal: userInfo.password, inputSideVal: '' }));

        }
    };
    const [cookies, setCookie, removeCookie] = useCookies(['myCookie']);

    // Function to set a new cookie with options
    const setNewCookie = () => {
        const cookieOptions = {
            path: '/', // Optional: specify the URL path for which the cookie is available
            maxAge: 3600, // Optional: set the cookie's expiration time in seconds
            expires: new Date('2030-12-31T23:59:59'), // Optional: specify an exact expiration date
            domain: 'example.com', // Optional: set the domain where the cookie is available
            secure: true, // Optional: enable the "Secure" attribute for HTTPS-only
        };

        // Set the cookie with a name, value, and options
        //setCookie('myCookie', 'cookieValue', cookieOptions);
    };
    // Request handler
    const handleRequest = async () => {
        try {
            const { data: response } = await login();
            dispatch(uiActions.setLoader(isLoading));
            if (!isEroor && isloading) {
                //dispatch(courseActions.initiateCourse({ course: response.data }));
                //setCookie('myCookie', 'cookieValue', cookieOptions);
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form className="col-12 col-sm-8 custome-outlet" id="loginForm" onSubmit={sumbitHandler}>
            <h3 className="mt-3"> <BsPersonCheck/> ورود</h3>
            <div className="row">
                <div className="col-12 col-md-6 ">
                    <div className="col-12 mt-3">
                        <label htmlFor="exampleInputUserName" className="form-label"> <BsPerson /> نام‌کاربری :</label>
                        <input type="text" className="form-control custome-input" id="exampleInputUserName" onBlur={usernameBulrHandler} aria-describedby="usernameHelp" placeholder="نام‌کاربری" />
                        {
                            clientsideErrors.username && <div id="usernameHelp" className="form-text helper"><span className="custome-danger"><i className="bi bi-exclamation-octagon"></i>{clientsideErrors.username}</span></div>
                        }

                    </div>
                    <div className="col-12 mt-3">
                        <label htmlFor="exampleInputpassword" className="form-label d-inline"> <BsLock /> رمز:</label>
                        <div className="showpass d-inline m-3">
                            <BsEye onClick={showPassword} />
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