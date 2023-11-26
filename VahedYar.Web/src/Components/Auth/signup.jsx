import './signup.css';
import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from "../../Store/auth-slice";
import {uiActions } from "../../Store/ui-slice";
import { BsInfoCircle, BsSend, BsLock, BsTelephone, BsEnvelopeAt, BsPerson, BsEye, BsExclamationOctagon, BsPersonAdd, BsBuildings, BsBook } from "react-icons/bs";
import { useCookies } from 'react-cookie';
import { useSignupMutation } from '../../feratures/api/apiSlice';
import { hashPassword, toPersianNumber } from '../../feratures/helper/helper';
import { sha256 } from 'crypto-hash';
import { errorHandler } from '../../Middlewares/errorHandler';
import { cookieOptions } from '../../Config/cookieOptions';

const Signup = () => {

    // states
    const { serversideErros, clientsideErrors, User, hadAccount, lastPageUrl } = useSelector(state => state.auth);
    const { startUpData } = useSelector(state => state.course);
    const { showPassWord } = useSelector(state => state.ui);

    const navigate = useNavigate();
    const [pass, setPass] = useState();
    const [rePass, setRePass] = useState();
    //const TellRef = useRef(null);
    const EmailRef = useRef(null);
    const [uni, setUni] = useState(undefined);
    const [group, setGroup] = useState(undefined);
    
    
    //query 
    const [signup, { isLoading, isError, reset }] = useSignupMutation();

    // dispath
    const dispatch = useDispatch();


    // input bular handler
    const emailBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'EMAIL', inputTypeVal: event.target.value }));    
    };
    const usernameBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'USERNAME', inputTypeVal: event.target.value, isRequired: true }));
    };
    const passwordBulrHandler = async (event) => {
        setPass(event.target.value);
        let hashedPass = await sha256(event.target.value)
        dispatch(authActions.userInfoKeeper({ inputType: 'PASSWORD', inputTypeVal: event.target.value, hashedPass, isRequired: true }));
    };
    const rePasswordBulrHandler = async (event) => {
        setRePass(event.target.value);
        let inputTypeVal = await sha256(event.target.value);
        dispatch(authActions.userInfoKeeper({ inputType: 'REPASSWORD', inputTypeVal, isRequired: true }));
    };

    const uniBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'UNI', inputTypeVal: event.target.value }));
        setUni(startUpData?.find(uni => uni.universityId === event.target.value));
    };

    const subjectBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'GROUP', inputTypeVal: event.target.value }));
        setGroup(startUpData?.find(item => item.universityId === uni.universityId).groups.find(gp => gp.groupId === event.target.value));
    };

    // event handlers
    const showPassword = () => {
        dispatch(uiActions.hidePassword());
        setTimeout(() => {
            dispatch(uiActions.hidePassword());
        }, 2000)
    };

    const sumbitHandler = async (event) => {
        event.preventDefault();
        if (!(clientsideErrors.phoneNumber || clientsideErrors.usename || clientsideErrors.firstName || clientsideErrors.rePassword || clientsideErrors.password || clientsideErrors.email) && ( pass && rePass && User.username)) {
            handleRequest(User);
        }
    };

    // functions
    const [cookies, setCookie, removeCookie] = useCookies(['JWT']);

    
    // Request handler
    const handleRequest = async (reqBody) => {
        try {
            const { error, data } = await signup(reqBody);
            dispatch(uiActions.setLoader(isLoading));
            if (error) errorHandler(error);
            if (!isError && !isLoading) {
                dispatch(authActions.setToken(data));
                setCookie('JWT', data, { path: '/' });
                reset();
                navigate("/selectCourses");
                // dispatch(courseActions.initiateCourse({ course: response.data }));
            }
        } catch (error) {
                console.log(error);
        }
    }
    return (
        
        <form className="col-12 col-sm-8 custome-outlet" id="signUpform" onSubmit={sumbitHandler}>
            <h3 className=""> <BsPersonAdd/> عضویت</h3>
            <div className="row ">
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputUserName" className="form-label"> <BsPerson/> دوست داری چی صدات کنیم :</label>
                    <input type="text" className="form-control custome-input" id="exampleInputUserName" onBlur={usernameBulrHandler} aria-describedby="usernameHelp" placeholder="نام‌کاربری" />


                    {
                        clientsideErrors.username && <div id="usernameHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon /> {clientsideErrors.username}</span></div>
                    }

                </div>
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputEmail" className="form-label"><BsEnvelopeAt />  ایمیل :</label>
                    <input type="email" className="form-control custome-input" ref={EmailRef} id="exampleInputEmail" dir="ltr" onBlur={emailBulrHandler} aria-describedby="emailHelp" placeholder="example@email.com" />

                    {
                        clientsideErrors.email && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon /> {clientsideErrors.email}</span></div>
                    }

                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-4">
                    <p className="hit-message small-text"><BsInfoCircle /> برای بازیابی حساب‌کاربریت بهتره ایمیل خودت رو بهمون بدی ولی اجباری نیست!</p>
                </div>

            </div>
            
            
            <div className="row ">
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputpassword" className="form-label d-inline"> <BsLock /> رمز :</label>
                    <div className="showpass col-1  d-inline">
                        <BsEye onClick={showPassword} />
                    </div>
                    <input type={showPassWord ? "text" : "password"} className="form-control custome-input mt-1" id="exampleInputpassword" onBlur={passwordBulrHandler} aria-describedby="passwordHelp" placeholder="رمز" />
                    {
                        clientsideErrors.password && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon /> {clientsideErrors.password}</span></div>
                    }

                </div>
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputRePassword" className="form-label  d-inline"> <BsLock/> تکرار رمز  :</label>
                    <div className="showpass col-1  d-inline">
                        <BsEye onClick={showPassword} />
                    </div>
                    <input type={showPassWord ? "text" : "password"} className="form-control custome-input mt-1" id="exampleInputRePassword" onBlur={rePasswordBulrHandler} aria-describedby="rePasswordHelp" placeholder="تکرار رمز" disabled={!User.password || clientsideErrors.password} />
                    {
                        clientsideErrors.rePassword && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon /> {clientsideErrors.rePassword}</span></div>
                    }  
                </div>
                
            </div>
            <div className="row">
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputUni" className="form-label"><BsBuildings /> دانشگاه :</label>
                    <select className="form-select custome-input" aria-label="Default select example" onChange={uniBulrHandler} id="exampleInputUni" aria-describedby="uniHelp">
                        <option value={undefined}>انتخاب</option>
                        {
                            startUpData?.map(item => <option key={item.universityId} value={item.universityId}>{item.title}</option>)
                        }
                    </select>

                </div>
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputSubject" className="form-label"><BsBook /> رشته تحصیلی :</label>
                    <select className="form-select custome-input" aria-label="Default select example" onChange={subjectBulrHandler} id="exampleInputSubject" aria-describedby="SubjectHelp" disabled={!uni}>
                        <option value={undefined}>انتخاب</option>
                        {
                            uni?.groups?.map(group => <option key={group.groupId} value={group.groupId}>{group.title}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="d-grid gap-2 d-lg-inline-block text-start">
                <button type="submit" className="btn_custome btn_success mt-5" onClick={sumbitHandler}>ثبت</button>
            </div>
        </form>
    );
};

export default Signup; 