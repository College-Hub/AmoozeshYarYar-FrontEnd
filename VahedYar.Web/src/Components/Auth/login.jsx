import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { authActions, requestData } from "../../Store/auth-slice";
import { BsInfoCircle, BsSend, BsLock, BsPersonCheck, BsEnvelopeAt, BsPerson, BsEye, BsExclamationOctagon, BsTelephone } from "react-icons/bs";
import { uiActions } from "../../Store/ui-slice";
import { useCookies } from 'react-cookie';

import './login.css';
import { useLoginMutation } from "../../feratures/api/apiSlice";
import { toPersianNumber } from "../../feratures/helper/helper";

const Login = () => {
    // states
    const serversideErros = useSelector(state => state.auth.serversideErros);
    const clientsideErrors = useSelector(state => state.auth.clientsideErrors);
    const isLoading = useSelector(state => state.auth.isLoading);
    const showPassWord = useSelector(state => state.ui.showPassWord);
    const userInfo = useSelector(state => state.auth);

    const [loginMethod, setLoginMethod] = useState("1");

    //query 
    const [ login ,{ isLoading: isloading, isEroor } ] = useLoginMutation();

    // dispath
    const dispatch = useDispatch();

    // variables
 

    // input bular handler
    const usernameBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'USERNAME', inputTypeVal: event.target.value }));
        //validate     
        dispatch(authActions.validateInput({ inputType: 'USERNAME', inputTypeVal: event.target.value, inputSideVal: '', isRequired: loginMethod === "1" }));

    };
    const passwordBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'PASSWORD', inputTypeVal: event.target.value }));
        //validate
        dispatch(authActions.validateInput({ inputType: 'PASSWORD', inputTypeVal: event.target.value, inputSideVal: '' }));
    };
    const emailBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'EMAIL', inputTypeVal: event.target.value }));
        //validate
        dispatch(authActions.validateInput({ inputType: 'EMAIL', inputTypeVal: event.target.value, inputSideVal: '', isRequired: loginMethod === "2" }));
    };
    const phoneNumberBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'PHONENUMBER', inputTypeVal: event.target.value }));
        //validate
        dispatch(authActions.validateInput({ inputType: 'PHONENUMBER', inputTypeVal: event.target.value, inputSideVal: '', isRequired: loginMethod === "3" }));
    };

    // event handlers

    const showPassword = () => {
        dispatch(uiActions.hidePassword());
        setTimeout(() => {
            dispatch(uiActions.hidePassword());
        }, 2000)
    };
    const loginMethodHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'USERNAME', inputTypeVal: null }));
        dispatch(authActions.userInfoKeeper({ inputType: 'PHONENUMBER', inputTypeVal: null }));
        dispatch(authActions.userInfoKeeper({ inputType: 'EMAIL', inputTypeVal: null }));
        setLoginMethod(event.target.value);
    }


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
    //functios
    const renderLoginMethod = () => {
        //USERNAME
        if (loginMethod === "1") {
            return (
                <div className="col-12 mt-3">
                <input type="text" className="form-control custome-input" id="exampleInputUserNameLogin" onBlur={usernameBulrHandler} aria-describedby="usernameHelp" placeholder="نام‌کاربری" />
                {
                        clientsideErrors.username && <div id="usernameHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon /> {clientsideErrors.username}</span></div>
                }
                </div>
            );
        }
        //EMAIL
        if (loginMethod === "2") {
            return (
                <div className="col-12 mt-3">
                    <input type="email" className="form-control custome-input" id="exampleInputEmailLogin" onBlur={emailBulrHandler} dir="ltr" aria-describedby="emailHelp" placeholder="example@email.com" />
                    {
                        clientsideErrors.email && <div id="emailHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon /> {clientsideErrors.email}</span></div>
                    }
                </div>
            );
        }
        //PHONENUMBER
        if (loginMethod === "3") {
            return (
                <div className="col-12 mt-3">
                    <input type="text" className="form-control custome-input" id="exampleInputPhoneLogin" onBlur={phoneNumberBulrHandler} dir="ltr" aria-describedby="phoneHelp" placeholder={toPersianNumber("09123456789")} />
                    {
                        clientsideErrors.phoneNumber && <div id="phoneHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon /> {clientsideErrors.phoneNumber}</span></div>
                    }
                </div>
            );
        }
    }
    const renderLoginMethodLable = () => {
        if (loginMethod === "1") {
            return (
                <label htmlFor="exampleInputUserNameLogin" className="form-label"><BsPerson /> نام‌کاربری :</label>
            );
        }
        //EMAIL
        if (loginMethod === "2") {
            return (
                <label htmlFor="exampleInputEmailLogin" className="form-label"><BsEnvelopeAt />  ایمیل :</label>
            );
        }
        //PHONENUMBER
        if (loginMethod === "3") {
            return (
                <label htmlFor="exampleInputPhoneLogin" className="form-label"><BsTelephone /> شماره همراه :</label>
            );
        }
    }

    return (
        <form className="col-12 col-sm-8 custome-outlet" id="loginForm" onSubmit={sumbitHandler}>
            <h3 className="mt-3 mb-5"> <BsPersonCheck/> ورود</h3>
            <div className="row">
                <div className="col-12 col-lg-6 mb-4">
                    <div className="col-12 d-flex justify-content-between flex-wrap ">
                        {
                            renderLoginMethodLable(loginMethod)
                        }
                        <select className="form-select custome-input w-auto" onChange={loginMethodHandler} dir={"rtl"} aria-label="Default select example" id="loginMethodSelect" aria-describedby="uniHelp">
                            <option value="1">نام‌کاربری</option>
                            <option value="2">ایمیل</option>
                            <option value="3">شماره‌همراه</option>
                        </select>
                        {
                            renderLoginMethod(loginMethod)
                        }
                    </div>
                   
                    <div className="col-12 mt-3">
                        <label htmlFor="exampleInputpassword" className="form-label d-inline"> <BsLock /> رمز :</label>
                        <div className="showpass d-inline m-3">
                            <BsEye onClick={showPassword} />
                        </div>
                        <input type="text" className="form-control custome-input mt-1" id="exampleInputpassword" onBlur={passwordBulrHandler} aria-describedby="passwordHelp" placeholder="رمز" disabled={showPassWord} />
                        {
                            clientsideErrors.password && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon />{clientsideErrors.password}</span></div>
                        }
                    </div>
                    
                </div>
                <div className="col-12 col-lg-6 "> 
                    <p className="hit-message"><BsInfoCircle /> در صورتی که حساب کاربری ندارید بر روی لینک عضویت کلیک کنید تا در کمترین زمان یک حساب کاربری ایجاد کنید.</p>
                    <p className="mt-4">
                        
                    </p>

                </div>
            </div>
            <div className="form-check form-check-reverse">
                <input className="form-check-input" type="checkbox" value="" id="reverseCheck1" />
                <label className="form-check-label" for="reverseCheck1">
                    منو یادت بمونه!
                </label>
            </div>
            <div className="d-grid gap-2 d-lg-inline-block text-start" dir="rtl">
                
                <button type="submit" className=" custome-submit-btn ">ثبت</button>
            </div>
            
        </form>
    );
};

export default Login; 