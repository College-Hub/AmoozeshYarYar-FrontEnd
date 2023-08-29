import "./courseDetail.css"
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { BsBuildings, BsBook, BsInfoCircle, BsList } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa6";

import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

const CourseDetail = (prop) => {

    // prop
    const { show, target, ref, course } = prop;

    // state

    //hooks 


    // event handler 

    // content handler


    return (
        <Overlay
            show={show}
            target={target}
            placement="top"
            container={ref}
            containerPadding={20}
            rootCloseEvent={'mousedown'}

        >
            <Popover className="course-detail">

                <Popover.Body>
                    <div className="d-flex flex-column align-items-start" >
                        <div className="modal-PresentationDetail-header">
                            <span><BsList /> جزئیات</span>
                        </div>

                        <div className="modal-PresentationDetail-row ">
                            <div className="col-5" style={{ color: "var(--C2)!important" }}>عنوان درس :</div>
                            <div className="col-7 text-center">{course.courseTitle}</div>
                        </div>
                        <div className="modal-PresentationDetail-row ">
                            <div className="col-5">گروه ارائه دهنده :</div>
                            <div className="col-7 text-center">{course.courseTitle}</div>
                        </div>
                        <div className="modal-PresentationDetail-row ">
                            <div className="col-5">واحد نظری :</div>
                            <div className="col-7 text-center">{course.courseTitle}</div>
                        </div>
                        <div className="modal-PresentationDetail-row ">
                            <div className="col-5">واحد عملی :</div>
                            <div className="col-7 text-center">{course.courseTitle}</div>
                        </div>
                        <div className="modal-PresentationDetail-row instractor ">
                            <ul>
                                <span>اساتید درس :</span>
                                <li>استاد</li>
                                <li>استاد</li>
                                <li>استاد</li>
                            </ul>
                        </div>
                    </div>
                </Popover.Body>
            </Popover>
        </Overlay>
    );
};

export default CourseDetail; 