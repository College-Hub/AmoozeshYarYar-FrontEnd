import './signup.css';
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { authActions, requestData } from "../../Store/auth-slice";
import {uiActions } from "../../Store/ui-slice";
import { BsInfoCircle, BsSend, BsLock, BsTelephone, BsEnvelopeAt, BsPerson, BsEye, BsExclamationOctagon, BsPersonAdd } from "react-icons/bs";
import { useCookies } from 'react-cookie';
import { useSignupMutation } from '../../feratures/api/apiSlice';

const Signup = () => {

    // states
    const { serversideErros, clientsideErrors, isLoading, userInfo } = useSelector(state => state.auth);
    const { startUpData } = useSelector(state => state.course);
    const { showPassWord } = useSelector(state => state.ui);
    const [pass, setPass] = useState();
    const [rePass, setRePass] = useState();
    const TellRef = useRef(null);
    const EmailRef = useRef(null);
    const [uni, setUni] = useState(undefined);
    const [group, setGroup] = useState(undefined);
    
    
    //query 
    const [signup, { isLoading: isloading, isEroor }] = useSignupMutation();

    // dispath
    const dispatch = useDispatch();


    // input bular handler
    const contactHandler = (event) => {
        if (event.target.value === '1') TellRef.current.focus();
        else if (event.target.value === '2') EmailRef.current.focus();
        
    };
    const emailBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'EMAIL', inputTypeVal: event.target.value }));
        //validate     
        dispatch(authActions.validateInput({ inputType: 'EMAIL', inputTypeVal: event.target.value, inputSideVal: '' }));       
    };
    const usernameBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'USERNAME', inputTypeVal: event.target.value }));
        //validate     
        dispatch(authActions.validateInput({ inputType: 'USERNAME', inputTypeVal: event.target.value, inputSideVal: '' }));
       
    };
    const passwordBulrHandler = (event) => {
        setPass(event.target.value);
        dispatch(authActions.userInfoKeeper({ inputType: 'PASSWORD', inputTypeVal: event.target.value }));
        //validate
        dispatch(authActions.validateInput({ inputType: 'PASSWORD', inputTypeVal: event.target.value, inputSideVal: '' }));
        dispatch(authActions.validateInput({ inputType: 'REPASSWORD', inputTypeVal: rePass, inputSideVal: event.target.value }));
        
    };
    const rePasswordBulrHandler = (event) => {
        setRePass(event.target.value);
        //validate
        dispatch(authActions.validateInput({ inputType: 'REPASSWORD', inputTypeVal: event.target.value, inputSideVal: pass }));
    };
    const phonNumberBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'PHONENUMBER', inputTypeVal: event.target.value }));
        //validate
        dispatch(authActions.validateInput({ inputType: 'PHONENUMBER', inputTypeVal: event.target.value, inputSideVal: '' }));
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

    const sumbitHandler = (event) => {
        event.preventDefault();
        if (!(clientsideErrors.phoneNumber || clientsideErrors.usename || clientsideErrors.firstName || clientsideErrors.rePassword || clientsideErrors.password || clientsideErrors.email) && ( pass && rePass && userInfo.username)) {

            console.log({ email: userInfo.email, password: userInfo.password, hadAccount: false, firstName: userInfo.firstName, lastName: userInfo.lastName, phoneNumber: userInfo.phoneNumber, university: userInfo.uni, subject: userInfo.subject })
        }
        else {
            //validation
            dispatch(authActions.validateInput({ inputType: 'EMAIL', inputTypeVal: userInfo.email, inputSideVal: '' }));
            dispatch(authActions.validateInput({ inputType: 'USERNAME', inputTypeVal: userInfo.username, inputSideVal: '' }));
            dispatch(authActions.validateInput({ inputType: 'PASSWORD', inputTypeVal: userInfo.password, inputSideVal: '' }));
            dispatch(authActions.validateInput({ inputType: 'REPASSWORD', inputTypeVal: rePass, inputSideVal: userInfo.password }));
            dispatch(authActions.validateInput({ inputType: 'PHONENUMBER', inputTypeVal: userInfo.phoneNumber, inputSideVal: '' }));
        }
        setTimeout(() => {
            dispatch(authActions.userInfoKeeper({ inputType: 'PASSWORD', inputTypeVal: '' }));
        }, 2000)
    };

    // functions
    const [cookies, setCookie, removeCookie] = useCookies(['myCookie']);

    // Function to set a new cookie with options
    const cookieOptions = {
        path: '/', // Optional: specify the URL path for which the cookie is available
        maxAge: 3600, // Optional: set the cookie's expiration time in seconds
        expires: new Date('2030-12-31T23:59:59'), // Optional: specify an exact expiration date
        domain: 'example.com', // Optional: set the domain where the cookie is available
        secure: true, // Optional: enable the "Secure" attribute for HTTPS-only
    };

    // Set the cookie with a name, value, and options
    //setCookie('myCookie', 'cookieValue', cookieOptions);
    
    
    // Request handler
    const handleRequest = async () => {
        try {
            const { data: response } = await signup();
            dispatch(uiActions.setLoader(isLoading));
            if (!isEroor && !isloading) {
                //dispatch(courseActions.initiateCourse({ course: response.data }));
                //setCookie('myCookie', 'cookieValue', cookieOptions);
            }
        } catch (e) {
            console.log(e)
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
                        clientsideErrors.username && <div id="usernameHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon />{clientsideErrors.username}</span></div>
                    }

                </div>
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputUni" className="form-label"><BsSend /> راه ارتباطی :</label>
                    <select className="form-select custome-input" aria-label="Default select example" defaultValue={0} onChange={contactHandler} id="exampleInputUni" aria-describedby="uniHelp">
                        <option value="1">شماره همراه</option>
                        <option value="2">ایمیل</option>
                        <option value="3">به تو ربطی نداره!</option>
                        <option value="4">اصلا دلم نمی خواد!</option>
                        <option value="5">(خانم / آقا) برو گم شو؛ مزاحم نشو!</option>
                    </select>
                </div>

            </div>
            <div className="row">
                <div className="col-12 mt-4">
                    <p className="hit-message"><BsInfoCircle /> برای بازیابی حساب‌کاربریت بهتره حداقل یکی از راه های ارتباطی زیر رو بهمون بدی ولی اجباری نیست!</p>
                </div>
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputPhone" className="form-label"><BsTelephone /> شماره همراه :</label>
                    <input type="text" className="form-control custome-input" ref={TellRef} id="exampleInputPhone" dir="ltr" onBlur={phonNumberBulrHandler} aria-describedby="phoneHelp" placeholder="09123456789" />

                    {
                        clientsideErrors.phoneNumber && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon />{clientsideErrors.phoneNumber}</span></div>
                    }

                </div>
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputEmail" className="form-label"><BsEnvelopeAt />  ایمیل :</label>
                    <input type="email" className="form-control custome-input" ref={EmailRef} id="exampleInputEmail" dir="ltr" onBlur={emailBulrHandler} aria-describedby="emailHelp" placeholder="example@email.com" />

                    {
                        clientsideErrors.email && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon />{clientsideErrors.email}</span></div>
                    }

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
                        clientsideErrors.password && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon />{clientsideErrors.password}</span></div>
                    }

                </div>
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputRePassword" className="form-label  d-inline"> <BsLock/> تکرار رمز  :</label>
                    <div className="showpass col-1  d-inline">
                        <BsEye onClick={showPassword} />
                    </div>
                    <input type={showPassWord ? "text" : "password"} className="form-control custome-input mt-1" id="exampleInputRePassword" onBlur={rePasswordBulrHandler} aria-describedby="rePasswordHelp" placeholder="تکرار رمز غیر فعال" disabled={clientsideErrors.password && userInfo.password} />
                    {
                        clientsideErrors.rePassword && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon />{clientsideErrors.rePassword}</span></div>
                    }  
                </div>
                
            </div>
            <div className="row">
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputUni" className="form-label"><i className="bi bi-buildings"></i> دانشگاه :</label>
                    <select className="form-select custome-input" aria-label="Default select example" onChange={uniBulrHandler} id="exampleInputUni" aria-describedby="uniHelp">
                        v                                        <option value={undefined}>انتخاب</option>
                        {
                            startUpData?.map(item => <option key={item.universityId} value={item.universityId}>{item.title}</option>)
                        }
                    </select>
                </div>
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputSubject" className="form-label"><i className="bi bi-book"></i> رشته تحصیلی :</label>
                    <select className="form-select custome-input" aria-label="Default select example" onChange={subjectBulrHandler} id="exampleInputSubject" aria-describedby="SubjectHelp" disabled={!uni}>
                        <option value={undefined}>انتخاب</option>
                        {
                            uni?.groups?.map(group => <option key={group.groupId} value={group.groupId}>{group.title}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="d-grid gap-2 d-lg-inline-block text-start">
                <button type="submit" className=" custome-submit-btn" onClick={sumbitHandler}>ثبت</button>
            </div>
        </form>
    );
};

export default Signup; 