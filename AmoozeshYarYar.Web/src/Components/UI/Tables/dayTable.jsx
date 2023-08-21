import './dayTable.css';

import TimeModal from '../../Modals/inputTime';

import { courseActions } from "../../../Store/course-slice";
import { modalActions } from "../../../Store/modal-slice";
import { useSelector, useDispatch } from 'react-redux';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { generateTimeString } from '../../../feratures/helper/helper';
const DayTable = () => {
    const { days, error, submitCheckforDay, nerdAlert } = useSelector(state => state.course);
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
                <div className="col-4 col-md-2">روز هفته</div>
                <div className="col-4  text-center">ساعت ورود به دانشگاه</div>
                <div className="col-4   text-center">ساعت خروج از دانشگاه</div>
                <div className="d-none col-md-2 d-md-flex justify-content-end">
                    <i className="bi bi-calendar-day"></i>
                </div>
            </div>
            <div className="day-list-body">
                {days.map(day => (
                    <div key={day.id} className={day.isSelected ? "day-list-body-row row row-active" : "day-list-body-row row"}>
                        <div className="col-4 col-md-2">
                            <input className="form-check-input m-2" type="checkbox" onClick={daySelectHandler} value="" data-day={day.id} />
                            <span>{day.title}</span>
                        </div>
                        {
                            day.id === 6 ?
                                (<div className="col-8 justify-content-center">
                                    {nerdAlert && <p className="nerdAlert">تنها دانشگاه بهت خوش بگذره <i className="bi bi-emoji-smile"></i></p>}
                                </div>)
                                :
                                (<Fragment>
                                    <div className="col-4 justify-content-center">
                                        {
                                            day.isSelected ?
                                                (<div className="timeInput">
                                                    <div className="" data-day={day.id} onClick={StartTimeHandler}>
                                                        <span className="d-flex justify-content-center " ><i className="bi bi-clock " data-day={day.id}></i></span>
                                                        {day.time[0] ? (<span dir="ltr" className=" text-center " data-day={day.id}> {generateTimeString(day.time[0])} </span>) : (<span className="d-none d-md-block col-6 text-center col-md-8" data-day={day.id}>تغییر زمان ورود</span>)}
                                                    </div>
                                                    <input type="hidden" name={"startTime-" + day.id} value={day.time[0]} />

                                                </div>)
                                                :
                                                (<div className="timeInput" >

                                                </div>)
                                        }
                                    </div>
                                    <div className="col-4 justify-content-center">
                                        {
                                            day.isSelected ?
                                                (<div className="timeInput">
                                                    <div className="flex-wrap" data-day={day.id} onClick={EndTimeHandler}>
                                                        <span className="d-flex justify-content-center"><i className="bi bi-clock" data-day={day.id}></i></span>
                                                        {day.time[1] ? (<span className="text-center " dir="ltr" data-day={day.id}> {generateTimeString(day.time[1])} </span>) : (<span className="d-none d-md-block col-6 text-center col-md-8" data-day={day.id}>تغییر زمان خروج  </span>)}
                                                    </div>
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