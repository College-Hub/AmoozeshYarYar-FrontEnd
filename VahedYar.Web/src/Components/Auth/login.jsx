import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { authActions, requestData } from "../../Store/auth-slice";
import { BsInfoCircle, BsSend, BsLock, BsPersonCheck, BsEnvelopeAt, BsPerson, BsEye, BsExclamationOctagon, BsTelephone } from "react-icons/bs";
import { uiActions } from "../../Store/ui-slice";
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from "react-router-dom";
import './login.css';
import { useLoginMutation } from "../../feratures/api/apiSlice";
import { toPersianNumber } from "../../feratures/helper/helper";
import { modalActions } from "../../Store/modal-slice";
import ForgotAcc from "../Modals/forgotAccount";
import { sha256 } from 'crypto-hash';
import { errorHandler } from '../../Middlewares/errorHandler';
import { cookieOptions } from '../../Config/cookieOptions';



const Login = () => {
    // states
    const { showPassWord, isloading } = useSelector(state => state.ui);
    const { serversideErros, clientsideErrors, User, lastPageUrl } = useSelector(state => state.auth);
    const { content } = useSelector(state => state.modal);

    //query 
    const [login, { isLoading, isError, reset } ] = useLoginMutation();

    // hooks 
    const [cookies, setCookie, removeCookie] = useCookies(['JWT']);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // variables
 

    // input bular handler
    const usernameBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'USERNAME', inputTypeVal: event.target.value, isRequired: true }));
    };
    const passwordBulrHandler = async (event) => {
        let hashedPass = await sha256(event.target.value);
        dispatch(authActions.userInfoKeeper({ inputType: 'PASSWORD', inputTypeVal: event.target.value, hashedPass, isRequired: true }));
    };
    // event handlers

    const showPassword = () => {
        dispatch(uiActions.hidePassword());
        setTimeout(() => {
            dispatch(uiActions.hidePassword());
        }, 2000)
    };

    const forgotHandler = (event) => {
        let id = event.target.getAttribute("data-content");
        if (id === "PASS") dispatch(modalActions.setModalData({ content: "FORGOT-ACC", id }))
        if (id === "USERNAME") dispatch(modalActions.setModalData({ content: "FORGOT-ACC", id }))
    };


    const sumbitHandler = async (event) => {
        event.preventDefault();
        if (!(clientsideErrors.password || clientsideErrors.email) && (User.username && User.password)) {
            handleRequest(User);
        }
    };
   
    // Request handler
    const handleRequest = async (reqBody) => {
        try {
            const { error, data } = await login(reqBody);
            dispatch(uiActions.setLoader(isLoading));
            if (error) errorHandler(error);
            if (!isError && !isLoading) {
                dispatch(authActions.setToken(data));
                setCookie('JWT', data, { path: '/' });
                navigate(lastPageUrl);
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Fragment>
            <form className="col-12 col-sm-8 custome-outlet" id="loginForm" onSubmit={sumbitHandler}>
                <h3 className="mt-3 mb-5"> <BsPersonCheck /> ورود</h3>
                <div className="row">
                    <div className="col-12 col-lg-6 mb-4">
                        <div className="col-12 d-flex justify-content-between flex-wrap ">
                            <label htmlFor="exampleInputUserNameLogin" className="form-label"><BsPerson /> نام‌کاربری :</label>
                            <div className="col-12 mt-3">
                                <input type="text" className="form-control custome-input" id="exampleInputUserNameLogin" onBlur={usernameBulrHandler} aria-describedby="usernameHelp" placeholder="نام‌کاربری" />
                                <div className="d-flex justify-content-start mt-2 passForgot">
                                    <span className="small-text " data-content={"USERNAME"} onClick={forgotHandler}>نام‌کاربریت رو یادت رفته؟</span>
                                </div>
                                {
                                    clientsideErrors.username && <div id="usernameHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon /> {clientsideErrors.username}</span></div>
                                }
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <label htmlFor="exampleInputpassword" className="form-label d-inline"> <BsLock /> رمز :</label>
                            <div className="showpass d-inline m-3">
                                <BsEye onClick={showPassword} />
                            </div>
                            <input type="text" className="form-control custome-input mt-3" id="exampleInputpassword" onBlur={passwordBulrHandler} aria-describedby="passwordHelp" placeholder="رمز" disabled={showPassWord} />
                            <div className="d-flex justify-content-start mt-2 passForgot">
                                <span className="small-text " data-content={"PASS"} onClick={forgotHandler}>رمزت رو یادت رفته؟</span>
                            </div>
                            {
                                clientsideErrors.password && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon />{clientsideErrors.password}</span></div>
                            }
                        </div>

                    </div>
                    <div className="col-12 col-lg-6 ">
                        <p className="hit-message"><BsInfoCircle /> در صورتی که حساب کاربری ندارید بر روی لینک عضویت کلیک کنید تا در کمترین زمان یک حساب کاربری ایجاد کنید.</p>
                    </div>
                </div>
                <div className="form-check form-check-reverse">
                    <input className="form-check-input" type="checkbox" value="" id="reverseCheck1" />
                    <label className="form-check-label" htmlFor="reverseCheck1">
                        منو یادت بمونه!
                    </label>
                </div>
                <div className="d-grid gap-2 d-lg-inline-block text-start" dir="rtl">

                    <button type="submit" className="btn_custome btn_success mt-4">ثبت</button>
                </div>


            </form>
            {
                content === "FORGOT-ACC" && <ForgotAcc/>
            }
        </Fragment>
    );
};

export default Login; 