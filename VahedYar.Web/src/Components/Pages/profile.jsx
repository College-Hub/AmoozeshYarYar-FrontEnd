import './profile.css';
import { Fragment, useEffect, useRef, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, requestData } from "../../Store/auth-slice";
import { modalActions } from "../../Store/modal-slice";
import { uiActions } from "../../Store/ui-slice";
import EditProfile from '../Modals/editProfile';


const Profile = () => {
    const { User } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // event Handlers
    const EditFirstNameHandler = () => {
        dispatch(modalActions.setModalData({ content:"FIRSTNAME" }))
    };
    const EditLastNameHandler = () => {
        dispatch(modalActions.setModalData({ content: "LASTNAME" }))
    };
    const EditEamilHandler = () => {
        dispatch(modalActions.setModalData({ content: "EMAIL" }))
    };
    const EditPasswordHandler = () => {
        dispatch(modalActions.setModalData({ content: "PASSWORD" }))
    };
    const EditPhoneNmberHandler = () => {
        dispatch(modalActions.setModalData({ content: "PHONENUMBER" }))
    };
    const EditUniHandler = () => {
        dispatch(modalActions.setModalData({ content: "UNI" }))
    };
    const EditSubjectHandler = () => {
        dispatch(modalActions.setModalData({ content: "SUBJECT" }))
    };

    return (
        <Fragment>
            <section id="profile">
                <h3>
                    <i className="bi bi-person-circle"></i>
                    <span>پروفایل</span>
                </h3>
                <div className="row">
                    <div className="col-12 col-md-6 col-xl-4 userInfo_input" >
                        <label htmlFor="exampleInputFirstName" className="form-label"> <i className="bi bi-file-earmark-person"></i> نام :</label>
                        <div className="d-flex">
                            <input type="text" className="form-control" id="exampleInputFirstName" defaultValue={User.firstName} aria-describedby="firstNamedHelp" disabled readOnly />
                            <button type="button" className="btn custome-btn" onClick={EditFirstNameHandler} >ویرایش</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-4 userInfo_input">
                        <label htmlFor="exampleInputLastName" className="form-label"> <i className="bi bi-file-earmark-person"></i>  نام خانوادگی  :</label>
                        <div className="d-flex">
                            <input type="text" className="form-control" id="exampleInputLastName" defaultValue={User.lastName} aria-describedby="lastNameHelp" disabled readOnly />
                            <button type="button" className="btn custome-btn" onClick={EditLastNameHandler} >ویرایش</button>
                        </div>

                    </div>
                    <div className="col-12 col-md-6 col-xl-4 userInfo_input">
                        <label htmlFor="exampleInputPhone" className="form-label"><i className="bi bi-telephone"></i> شماره همراه :</label>
                        <div className="d-flex">
                            <input type="text" className="form-control" id="exampleInputPhone" defaultValue={User.phoneNumber} aria-describedby="phoneHelp" disabled readOnly />
                            <button type="button" className="btn custome-btn" onClick={EditPhoneNmberHandler} >ویرایش</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-4 userInfo_input">
                        <label htmlFor="exampleInputEmail" className="form-label"><i className="bi bi-envelope-at"></i>  ایمیل :</label>
                        <div className="d-flex">
                            <input type="email" className="form-control" id="exampleInputEmail" defaultValue={User.email} aria-describedby="emailHelp" disabled readOnly />
                            <button type="button" className="btn custome-btn" onClick={EditEamilHandler} >ویرایش</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-4 userInfo_input">
                        <label htmlFor="exampleInputUni" className="form-label"><i className="bi bi-buildings"></i> دانشگاه :</label>
                        <div className="d-flex">
                            <select className="form-select" aria-label="Default select example" id="exampleInputUni" defaultValue={User.uni} aria-describedby="uniHelp" disabled readOnly>
                                {/*this will be change to dynamic */}
                                <option value="1"> دانشگاه آزاد اسلامی واحد تهران مرکز</option>
                                <option value="2">دانشگاه آزاد اسلامی واحد علوم تحقیقات</option>
                                <option value="3">دانشگاه آزاد اسلامی واحد تهران شمال</option>
                            </select>
                            <button type="button" className="btn custome-btn" onClick={EditUniHandler} >ویرایش</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-4 userInfo_input">
                        <label htmlFor="exampleInputSubject" className="form-label"><i className="bi bi-book"></i> رشته تحصیلی :</label>
                        <div className="d-flex">
                            <select className="form-select" aria-label="Default select example" id="exampleInputSubject" defaultValue={User.subject} aria-describedby="SubjectHelp" disabled readOnly>
                                {/*this will be change to dynamic */}
                                <option value="1">مهندسی کامپیوتر</option>
                                <option value="2"> مهندسی برق</option>
                                <option value="3">مهندسی مکانیک</option>
                            </select>
                            <button type="button" className="btn custome-btn" onClick={EditSubjectHandler} >ویرایش</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-4 userInfo_input">
                        <label htmlFor="exampleInputLastName" className="form-label"> <i className="bi bi-lock"></i>  رمز  :</label>
                        <div className="d-flex">
                            <input type="password" className="form-control" id="exampleInputpassword" defaultValue={User.password} aria-describedby="passwordHelp" disabled readOnly />
                            <button type="button" className="btn custome-btn" onClick={EditPasswordHandler} >ویرایش</button>
                        </div>
                    </div>
                </div>
                <div id="SubmitProfile" className="row">
                    <div className="col-12">
                        <p><i className="bi bi-exclamation-circle"></i> با کلیک بر روی گزینه ثبت می توانید اطلاعات حساب کاربریت رو تایید کنی </p>
                        <p><i className="bi bi-exclamation-circle"></i> یادت باشه در صورتی که این مشخصات با مشخصات خودت مطابقت نداشته باشن ما مسئولیتی بابت دادن برنامه درسی اشتباه نمی پذیریم  </p>
                    </div>
                    <div className="d-grid gap-2">
                        <NavLink className={"btn custome-btn"} aria-current="page" to='/selectCourses'>ثبت </NavLink>
                    </div>
                </div>

                <EditProfile />
            </section>

        </Fragment>      
    );
};

export default Profile; 