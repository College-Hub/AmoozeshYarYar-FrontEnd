﻿import './inputTime.css';
import Modal from 'react-bootstrap/Modal';
import dayjs from 'dayjs';
import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { modalActions } from "../../Store/modal-slice";
import { courseActions } from "../../Store/course-slice";
import { generateTimeString } from '../../feratures/helper/helper';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';



const TimeModal = (prop) => {
    // state
    const { content, id: dayId, errors } = useSelector(state => state.modal);
    const { days } = useSelector(state => state.course);
    const dispatch = useDispatch();
    const [H, setH] = useState('7');
    const [M, setM] = useState('00');


    const SeletedDayTime = days.find(day => parseInt(dayId) === day.id).time;

    //event handler 
    const closeHandler = () => {
        dispatch(modalActions.hideModal());
    };
    const submitHandler = () => {
        let id = dayId;
        dispatch(courseActions.setTime({ enteredTime: H + M, dayId: id, typeOfInput: content }));
        dispatch(modalActions.hideModal());
        setM('00');
        setH('7');
    };
    const dateChangeHandler = data => {
        let enteredM = data.$m < 10 ? '0' + data.$m : data.$m.toString();
        let enteredH = data.$H.toString();

        const dayTime = SeletedDayTime;
        if (content === "ENDtime") {
            if ((parseInt(dayTime[0]) >= parseInt(enteredH.toString() + enteredM)) && dayTime[0]) dispatch(modalActions.errorHandler({ typeOfHandler: "SET", errmessage: " ساعت خروج باید بعد از ساعت ورود باشد" }));
            else dispatch(modalActions.errorHandler({ typeOfHandler: "CLEAR", errmessage: "" }));
        }
        if (content === "STARTtime") {
            if ((parseInt(enteredH.toString() + enteredM) >= parseInt(dayTime[1])) && dayTime[1]) dispatch(modalActions.errorHandler({ typeOfHandler: "SET", errmessage: "ساعت ورود باید قبل از ساعت خروج باشد" }));
            else dispatch(modalActions.errorHandler({ typeOfHandler: "CLEAR", errmessage: "" }));
        }
        setM(enteredM);
        setH(enteredH);

    };

    return (
        <Modal show={content === "ENDtime" || content === "STARTtime"} onHide={closeHandler} centered>
            <Modal.Body dir="ltr" className={"modal-time"}>
                <h4 dir="rtl"><i className="bi bi-clock ms-3"></i>{content === "STARTtime" ? "ساعت ورود" : "ساعت خروج"}</h4>
                <div className="row mt-5" dir="rtl">
                    <div className="col-12 other-time">
                        {content === "ENDtime" ? (<div>ساعت ورود  :  <span dir="ltr">{SeletedDayTime[0] ? generateTimeString(SeletedDayTime[0]) : "انتخاب نشده"}</span></div>) : (<div>ساعت خروج  : <span dir="ltr">{(SeletedDayTime[1]) ? generateTimeString(SeletedDayTime[1]) : "انتخاب نشده"}</span></div>)}
                    </div>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['StaticTimePicker']}>
                        <DemoItem>
                            <StaticTimePicker
                                componentsProps={{
                                    actionBar: {
                                        actions: [],
                                    },
                                    toolbar: {
                                        text: [""],
                                    }
                                }}

                                ampm={false}
                                defaultValue={dayjs('2022-04-17T7:00')}
                                onChange={dateChangeHandler}
                                minTime={content === "ENDtime" ? dayjs('2022-04-17T9:20') : dayjs('2022-04-17T7:00')}
                                maxTime={content === "STARTtime" ? dayjs('2022-04-17T18:00') : dayjs('2022-04-17T20:00')}
                            />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
                {
                    errors.errmessage &&
                    <div className="d-flex justify-content-center  mb-4 time-modal-error-box" dir="rtl">
                        <i className="bi bi-exclamation-circle ms-2"></i><span className="">{errors.errmessage}</span>
                    </div>
                }
                <div className="d-flex btn-Group">
                    <button className={errors.errmessage ? "custome-disabled" : "custome-btn-primary"} onClick={submitHandler} disabled={errors.errmessage}>ثبت</button>
                    <button className={"custome-btn-danger"} onClick={closeHandler} >لغو</button>

                </div>
            </Modal.Body>
        </Modal>

    );
};
export default TimeModal;