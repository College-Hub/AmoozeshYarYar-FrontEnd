﻿import './selectCourses.css';
import SelectCourseModal from '../Modals/selectCourseModal';
import DayTable from '../UI/Tables/dayTable';
import CourseTable from '../UI/Tables/courseTable';
import UserInfo from "../Modals/userInfo";

import { useNavigate } from "react-router-dom";
import { useSubmitUserInfoMutation, useSubmitFitersMutation } from "../../feratures/api/apiSlice";
import { courseActions } from "../../Store/course-slice";
import { modalActions } from "../../Store/modal-slice";
import { useSelector, useDispatch } from 'react-redux';
import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { uiActions } from '../../Store/ui-slice';
import { timeTableActions } from '../../Store/timeTable-slice';

const SelectCourses = () => {
    // state
    const { selectedcourses, daySelectTable, courses, days, TimeTableFilter } = useSelector(state => state.course);
    const { group, uni } = useSelector(state => state.auth.userInfo);
    const { content } = useSelector(state => state.modal);
    const [submitUserInfo, { isLoading, isEroor }] = useSubmitUserInfoMutation();
    const [filter, setFilter] = useState();

    // hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // onload 
    useEffect(() => {
        if (!courses) {
            handleRequest();
        }
        dispatch(courseActions.resetDays());
    }, [group]);

    useEffect(() => {
        dispatch(courseActions.createFilterForTimeTable());
    }, [selectedcourses, days]);

    useEffect(() => {
        dispatch(uiActions.setLoader(isLoading));
        dispatch(timeTableActions.clearTimeTablse());
    }, []);

    // event handler
    const dayTableHandler = event => {
        dispatch(courseActions.daySeletViewChange());
    };
    const selectCourseModalHandler = () => {
        dispatch(modalActions.setModalData({ content: "COURSE" }));
    };
    const startHandler = () => {
        dispatch(modalActions.setModalData({ content: "USERINFO", }));
    };
    const setScatterationHandler = (event) => {
        let value = event.target.value;
        dispatch(courseActions.setScatteration({ value }));
    };
    const submithandler = () => {
        if (TimeTableFilter.Courses) {
            navigate("/timetable");
        };
    };
    // Request handler
    const handleRequest = async () => {
        try {
            const { data: response } = await submitUserInfo(group.groupId);
            dispatch(uiActions.setLoader(isLoading));
            if (!isEroor && !isLoading) {
                dispatch(courseActions.initiateCourse({ course: response.data }));
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Fragment>
            <section id="info" className="row custome-contaner-section">
                <div className="col-12 custome-contaner-section-header">
                    <span><i className="bi bi-person-lines-fill"></i>اطلاعات</span>
                </div>
                <div className="col-12 col-md-7 mb-3"><i className="bi bi-buildings"></i> دانشگاه : <span className="userInfo">{group?.universityTitle}</span></div>
                <div className="col-12 col-md-5 mb-3"><i className="bi bi-book"></i> رشته تحصیلی : <span className="userInfo">{group?.title}</span></div>
                <div className="col-12"></div>
                <div className="col-12 text-start ">
                    <button className="custome-btn-info" onClick={startHandler} >تغییر اطلاعات</button>
                </div>
            </section>
            {
                daySelectTable ? (<DayTable />) : (
                    <div id="selectDay" className="row custome-contaner-section">
                        <div className="col-12 ">
                            <div className="custome-contaner-section-header">
                                <span><i className="bi-calendar-week"></i>روز</span>
                            </div>
                            <p className="hit-message"><i className="bi bi-exclamation-circle"></i> اول روز هایی از هفته که دانشگاه میایی رو باید انتخاب کنی.</p>
                            <p className="hit-message"><i className="bi bi-exclamation-circle"></i> بعدش باید ساعت ورود و خروج خودت به دانشگاه رو انتخاب کنی.</p>
                            <p className="hit-message"><i className="bi bi-exclamation-circle"></i> در صورتی که ساعت ورود یا خروج خودت رو انتخاب نکرده باشی ساعت پیشفرض ورود 7:00 و ساعت خروج 21:00 برات ثبت میشه.</p>
                        </div >
                        <div className="col-12 text-start">
                            <button className="custome-btn-info" onClick={dayTableHandler}>انتخاب روز</button>
                        </div>
                    </div >
                )
            }
            {
                selectedcourses?.length ? (<CourseTable />) : (
                    <div id="selectCourse" className="row custome-contaner-section">
                        <div className="col-12 ">
                            <div className="custome-contaner-section-header">
                                <span><i className="bi bi-book"></i>درس</span>
                            </div>
                            <p className="hit-message"><i className="bi bi-exclamation-circle"></i> اول درس هایی که این ترم میخوای برداری رو باید انتخاب کنی.</p>
                            <p className="hit-message"><i className="bi bi-exclamation-circle"></i> در صورتی که استاد موردنظرت برای درسی که انتخاب کردی رو انتخاب نکرده باشی تمام استاد ها برای اون درس در نتیجه نهایی برات لحاظ میشن. </p>
                            <p className="hit-message"><i className="bi bi-exclamation-circle"></i> یادت باشه روز و ساعت هایی که میخوای دانشگاه باشی رو هم انتخاب کرده باشی.</p>
                        </div >
                        <div className="col-12 text-start">
                            <button className="custome-btn-info" onClick={selectCourseModalHandler}>انتخاب درس</button>
                        </div>

                    </div >
                )
            }
            <section id="moreSettings" className="custome-contaner-section row">
                <div className="col-12 custome-contaner-section-header">
                    <span ><i className="bi bi-gear"></i>تنظیمات بیشتر</span>
                </div>
                <div className="col-12 pe-1 pe-md-5 setting ">
                    <div>
                        <span className="pe-3"><i className="bi bi-wrench"></i> میزان فشردگی برنامه : </span>
                    </div>
                    <div className="me-4 pt-1">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" onClick={setScatterationHandler} name="inlineRadioOptions" id="inlineRadio1" value="0" />
                            <label className="form-check-label" htmlFor="inlineRadio1">مهم نیست</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" onClick={setScatterationHandler} name="inlineRadioOptions" id="inlineRadio2" value="2" />
                            <label className="form-check-label" htmlFor="inlineRadio2">پراکنده</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" onClick={setScatterationHandler} name="inlineRadioOptions" id="inlineRadio3" value="1" />
                            <label className="form-check-label" htmlFor="inlineRadio3">فشرده</label>
                        </div>
                    </div>
                </div>

            </section>

            <section id="submit" className="row custome-contaner-section">
                <div className="col-10  custome-contaner-section-header">
                    <span><i className="bi bi-check2-square"></i>تایید فرم </span>
                </div>
                <div className="col-2 text-start">
                    <button className="custome-btn-success" onClick={submithandler}>ثبت</button>
                </div>
                {
                    days.find(day => day.isSelected) && (
                        <div className="col-12">
                            <p className="hit-message"><i className="bi bi-exclamation-circle"></i> روز های زیر رو برای رفتن به داشنگاه انتخاب کردی.</p>
                            <div className="pe-4">
                                {
                                    days.map(day => day.isSelected ? <span key={day.id} className="daysInfo"> / {day.title} </span> : null)
                                }
                            </div>
                        </div>
                    )
                }
                {
                    selectedcourses?.length ? (
                        <div className="col-12">
                            <p className="hit-message"><i className="bi bi-exclamation-circle"></i> درس های زیر رو هم انتخاب کردی.</p>
                            <div className="pe-4">
                                {
                                    selectedcourses.map(course => <span key={course.courseId} className="daysInfo"> / {course.title}</span>)
                                }
                            </div>
                        </div>
                    ) : null
                }

            </section>
            {
                content === "COURSE" && <SelectCourseModal />
            }
            {
                content === "USERINFO" && <UserInfo />
            }
        </Fragment>
    );
};

export default SelectCourses; 