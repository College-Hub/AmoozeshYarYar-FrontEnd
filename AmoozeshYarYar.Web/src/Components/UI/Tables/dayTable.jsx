import './dayTable.css';

import TimeModal from '../../Modals/inputTime';

import { courseActions } from "../../../Store/course-slice";
import { modalActions } from "../../../Store/modal-slice";
import { useSelector, useDispatch } from 'react-redux';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { generateTimeString } from '../../../feratures/helper/helper';
import { BsClockHistory, BsEmojiSmile, BsCalendarDay } from "react-icons/bs";


const DayTable = () => {
    const { days, error, nerdAlert } = useSelector(state => state.course);
    const { content } = useSelector(state => state.modal);
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(courseActions.resetDays());
    }, [])


    // event handler
    const daySelectHandler = event => {
        let id = event.target.getAttribute("data-day");
        let checked = event.target.checked;
        if (parseInt(id) === 6) dispatch(courseActions.activeNerdAlert());
        else {
            if (checked) {
                dispatch(courseActions.selectDay({ dayId: id, inputType: "SELECT" }))
            } else {
                dispatch(courseActions.selectDay({ dayId: id, inputType: "REMOVE" }))
            }
        }
        //dispatch(courseActions.resetTime({ dayId: id }));
    };
    const StartTimeHandler = event => {
        let id = event.target.getAttribute("data-day");

        dispatch(modalActions.setModalData({ content: "STARTtime", id: id }));

    };
    const EndTimeHandler = event => {
        let id = event.target.getAttribute("data-day");

        dispatch(modalActions.setModalData({ content: "ENDtime", id }));

    };

    //console.log("test")

    return (
        <div className="day-list">
            <div className="day-list-header row">
                <div className="col-3 col-md-2">روز </div>
                <div className="col-4 text-center">ساعت ورود <span className="d-none d-md-inline-block ">  به دانشگاه</span></div>
                <div className="col-4 text-center">ساعت خروج <span className="d-none d-md-inline-block ">  از دانشگاه</span></div>
                <div className="d-none col-md-2 d-md-flex justify-content-end">
                    <BsCalendarDay />
                </div>
            </div>
            <div className="day-list-body">
                {days.map(day => (
                    <div key={day.id} className={day.isSelected ? "day-list-body-row row row-active" : "day-list-body-row row"}>
                        <div className="col-3 col-md-2">
                            <input className="form-check-input m-2" type="checkbox" onClick={daySelectHandler} value="" data-day={day.id} />
                            <span>{day.title}</span>
                        </div>
                        {
                            day.id === 6 ?
                                (<div className="col-8 justify-content-center">
                                    {nerdAlert && <p className="nerdAlert">تنها دانشگاه بهت خوش بگذره <BsEmojiSmile /></p>}
                                </div>)
                                :
                                (<Fragment>
                                    <div className="col-4 ps-2">
                                        {
                                            day.isSelected ?
                                                (<div className="timeInput flex-fill justify-content-md-center p-2" data-day={day.id} onClick={StartTimeHandler}>
                                                    <span className="ms-4" ><BsClockHistory data-day={day.id} /></span>
                                                    {day.time[0] ? (<span dir="ltr" className="text-center" data-day={day.id}> {generateTimeString(day.time[0])} </span>) : (<span className="" data-day={day.id}>تغییر <span className="d-none d-md-inline-block ">زمان ورود</span></span>)}                                      
                                                    <input type="hidden" name={"startTime-" + day.id} value={day.time[0]} />
                                                    
                                                </div>)
                                                :
                                                (<div className="timeInput" >

                                                </div>)
                                        }
                                    </div>
                                    <div className="col-4 justify-content-center ps-2">
                                        {
                                            day.isSelected ?
                                                (<div className="timeInput flex-fill justify-content-md-center p-2 " data-day={day.id} onClick={EndTimeHandler}>
                                                    
                                                        <span className="ms-4"><BsClockHistory data-day={day.id} /></span>
                                                    {day.time[1] ? (<span className="text-center" dir="ltr" data-day={day.id}> {generateTimeString(day.time[1])} </span>) : (<span className="" data-day={day.id}> تغییر <span className="d-none d-md-inline-block "> زمان خروج </span></span>)}
                                                    
                                                    <input type="hidden" name={"endTime-" + day.id} value={day.time[1]} />
                                                </div>)
                                                :
                                                (<div className="timeInput">

                                                </div>)
                                        }
                                    </div>
                                </Fragment>)
                        }
                    </div>
                ))}
            </div>
            <div className="day-list-footer row">
                <div className="col-12 col-md-6">تعداد روز انتخاب شده در هفته : <span>{days.filter(day => day.isSelected).length}</span></div>


            </div>
            {
                (content === "ENDtime" || content === "STARTtime") && <TimeModal />
            }

        </div>
    );
};

export default DayTable; 