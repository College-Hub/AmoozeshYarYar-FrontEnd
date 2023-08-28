import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { authActions, requestData } from "../../Store/auth-slice";
import {uiActions } from "../../Store/ui-slice";

import './signup.css';


const Signup = () => {

    // states
    const { serversideErros, clientsideErrors, isLoading, userInfo, showPassWord } = useSelector(state => state.auth);
    
    
    
    
    

    // dispath
    const dispatch = useDispatch();


    // input bular handler
    const emailBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'EMAIL', inputTypeVal: event.target.value }));
        //validate     
        dispatch(authActions.validateInput({ inputType: 'EMAIL', inputTypeVal: event.target.value, inputSideVal: '' }));
       
    };
    const passwordBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'PASSWORD', inputTypeVal: event.target.value }));
        //validate
        dispatch(authActions.validateInput({ inputType: 'PASSWORD', inputTypeVal: event.target.value, inputSideVal: '' }));
        dispatch(authActions.validateInput({ inputType: 'REPASSWORD', inputTypeVal: userInfo.rePassword, inputSideVal: event.target.value }));
        
    };
    const rePasswordBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'REPASSWORD', inputTypeVal: event.target.value }));
        //validate
        dispatch(authActions.validateInput({ inputType: 'REPASSWORD', inputTypeVal: event.target.value, inputSideVal: userInfo.password }));
    };
    const phonNumberBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'PHONENUMBER', inputTypeVal: event.target.value }));
        //validate
        dispatch(authActions.validateInput({ inputType: 'PHONENUMBER', inputTypeVal: event.target.value, inputSideVal: '' }));
    };
    const firstNameBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'FIRSTNAME', inputTypeVal: event.target.value }));
        //validate
        dispatch(authActions.validateInput({ inputType: 'FIRSTNAME', inputTypeVal: event.target.value, inputSideVal: '' }));
    };
    const lastNameBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'LASTNAME', inputTypeVal: event.target.value }));
        //validate
        dispatch(authActions.validateInput({ inputType: 'LASTNAME', inputTypeVal: event.target.value, inputSideVal: '' }));
    };
    const uniBulrHandler = (event) => { 
        dispatch(authActions.userInfoKeeper({ inputType: 'UNI', inputTypeVal: event.target.value }));
    };
    const subjectBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'SUBJECT', inputTypeVal: event.target.value }));
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
        if (!(clientsideErrors.phoneNumber || clientsideErrors.lastName || clientsideErrors.firstName || clientsideErrors.rePassword || clientsideErrors.password || clientsideErrors.email) && (userInfo.email && userInfo.password && userInfo.rePassword && userInfo.phoneNumber && userInfo.firstName && userInfo.lastName)) {
            //dispatch(
            //    requestData({ email: enteredEmail, password: enteredPassword, hadAccount: false, fullName: enteredFirstName + ' ' + enteredLastName, phoneNumber: enteredPhoneNumber, university: enteredUniversity, subject: enteredSubject })
            //);
            console.log({ email: userInfo.email, password: userInfo.password, hadAccount: false, firstName: userInfo.firstName, lastName: userInfo.lastName, phoneNumber: userInfo.phoneNumber, university: userInfo.uni, subject: userInfo.subject })
        }
        else {
            //validation
            dispatch(authActions.validateInput({ inputType: 'EMAIL', inputTypeVal: userInfo.email, inputSideVal: '' }));
            dispatch(authActions.validateInput({ inputType: 'PASSWORD', inputTypeVal: userInfo.password, inputSideVal: '' }));
            dispatch(authActions.validateInput({ inputType: 'REPASSWORD', inputTypeVal: userInfo.rePassword, inputSideVal: userInfo.password }));
            dispatch(authActions.validateInput({ inputType: 'PHONENUMBER', inputTypeVal: userInfo.phoneNumber, inputSideVal: '' }));
            dispatch(authActions.validateInput({ inputType: 'FIRSTNAME', inputTypeVal: userInfo.firstName, inputSideVal: '' }));
            dispatch(authActions.validateInput({ inputType: 'LASTNAME', inputTypeVal: userInfo.lastName, inputSideVal: '' }));
            
        }
    };
    // functions
    const activerRepass = () => {

    };
    return (
        
        <form className="col-12 col-sm-8 custome-outlet" id="signUpform" onSubmit={sumbitHandler}>
            <h3 className=""> <i className="bi bi-person-add"></i> عضویت</h3>
            <div className="row">
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputFirstName" className="form-label"> <i className="bi bi-file-earmark-person"></i> نام :</label>
                    <input type="text" className="form-control custome-input" onBlur={firstNameBulrHandler} id="exampleInputFirstName" aria-describedby="firstNamedHelp" placeholder="نام" />
     
                        {
                            clientsideErrors.firstName && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><i className="bi bi-exclamation-octagon"></i>{clientsideErrors.firstName}</span></div>
                        }
              
                </div>
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputLastName" className="form-label"> <i className="bi bi-file-earmark-person"></i>  نام خانوادگی  :</label>
                    <input type="text" className="form-control custome-input" onBlur={lastNameBulrHandler} id="exampleInputLastName" aria-describedby="lastNameHelp" placeholder="نام خانوادگی"  />
              
                        {
                            clientsideErrors.lastName && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><i className="bi bi-exclamation-octagon"></i>{clientsideErrors.lastName}</span></div>
                        }
                
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputPhone" className="form-label"><i className="bi bi-telephone"></i> شماره همراه :</label>
                    <input type="text" className="form-control custome-input" id="exampleInputPhone" dir="ltr" onBlur={phonNumberBulrHandler} aria-describedby="phoneHelp" placeholder="09123456789" />

                    {
                        clientsideErrors.phoneNumber && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><i className="bi bi-exclamation-octagon"></i>{clientsideErrors.phoneNumber}</span></div>
                    }

                </div>
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputEmail" className="form-label"><i className="bi bi-envelope-at"></i>  ایمیل :</label>
                    <input type="email" className="form-control custome-input" id="exampleInputEmail" dir="ltr" onBlur={emailBulrHandler} aria-describedby="emailHelp" placeholder="example@email.com" />

                    {
                        clientsideErrors.email && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><i className="bi bi-exclamation-octagon"></i>{clientsideErrors.email}</span></div>
                    }

                </div>
            </div>
            
            <div className="row ">
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputpassword" className="form-label d-inline"> <i className="bi bi-lock"></i> رمز :</label>
                    <div className="showpass col-1  d-inline">
                        <i className="bi bi-eye " onClick={showPassword}></i>
                    </div>
                    <input type={showPassWord ? "text" : "password"} className="form-control custome-input mt-1" id="exampleInputpassword" onBlur={passwordBulrHandler} aria-describedby="passwordHelp" placeholder="رمز" />
                           
                    
                    {
                        clientsideErrors.password && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><i className="bi bi-exclamation-octagon"></i>{clientsideErrors.password}</span></div>
                    }

                </div>
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="exampleInputRePassword" className="form-label  d-inline"> <i className="bi bi-lock"></i> تکرار رمز  :</label>
                    <div className="showpass col-1  d-inline">
                        <i className="bi bi-eye " onClick={showPassword}></i>
                    </div>
                    <input type={showPassWord ? "text" : "password"} className="form-control custome-input mt-1" id="exampleInputRePassword" onBlur={rePasswordBulrHandler} aria-describedby="rePasswordHelp" placeholder="تکرار رمز غیر فعال" disabled={clientsideErrors.password && userInfo.password} />
                    {
                        clientsideErrors.rePassword && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><i className="bi bi-exclamation-octagon"></i>{clientsideErrors.rePassword}</span></div>
                    }  
                </div>
                
            </div>
            <div className="row">
                <div className="col-12 col-lg-7 mt-3">
                    <label htmlFor="exampleInputUni" className="form-label"><i className="bi bi-buildings"></i> دانشگاه :</label>
                    <select className="form-select custome-input" aria-label="Default select example" onBlur={uniBulrHandler} id="exampleInputUni" aria-describedby="uniHelp">
                        {/*this will be change to dynamic */}
                        <option value="1"> دانشگاه آزاد اسلامی واحد تهران مرکز</option>
                        <option value="2">دانشگاه آزاد اسلامی واحد علوم تحقیقات</option>
                        <option value="3">دانشگاه آزاد اسلامی واحد تهران شمال</option>
                    </select>
                </div>
                <div className="col-12 col-lg-5 mt-3">
                    <label htmlFor="exampleInputSubject" className="form-label"><i className="bi bi-book"></i> رشته تحصیلی :</label>
                    <select className="form-select custome-input" aria-label="Default select example" onBlur={subjectBulrHandler} id="exampleInputSubject" aria-describedby="SubjectHelp">
                        {/*this will be change to dynamic */}
                        <option value="1">مهندسی کامپیوتر</option>
                        <option value="2"> مهندسی برق</option>
                        <option value="3">مهندسی مکانیک</option>
                    </select>
                </div>
            </div>
            
            <div className="d-grid gap-2 d-lg-inline-block text-start">
                <button type="submit" className=" custome-submit-btn ">ثبت</button>
            </div>
        </form>
    );
};

export default Signup; 