import './preview.css';
import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';

import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Badges from '../Badges/badges';
import Like from '../Badges/likeBtn';
import { modalActions } from '../../../Store/modal-slice';
import { BsChevronBarContract, BsCalendar2Check, BsInfoCircle, BsHeart, BsHeartFill } from "react-icons/bs";
import { dayToPersian, toPersianNumber } from '../../../feratures/helper/helper';



const Preview = (prop) => {
    const { timeTable, eventKey } = prop
    const { content } = useSelector(state => state.modal);
    // state 

    //hook 
    const dispatch = useDispatch();
    function ContextAwareToggle({ children, eventKey, callback }) {
        const decoratedOnClick = useAccordionButton(
            eventKey,
            () => callback && callback(eventKey),
        );
        return (<BsChevronBarContract onClick={eventKey < 9 ? decoratedOnClick : showMoreTimeTablesHandler}/>)
    }
    // event handler 
    const detailShowHandler = (event) => {
        let id = event.target.parentNode.getAttribute("data-prestation");
        dispatch(modalActions.setModalData({ content: "Presentation-DEATAIL", data: timeTable[id] }))
    };
    const weeklyViewHandler = () => {
        let convertPresentations = [];
        for (let p of timeTable) {
            if (p.dayIds.length > 1) {
                p.dayTimes.map((day, index) => convertPresentations.push({ ...p, dayTimes: day, ConvertDayTime: p.ConvertDayTime[index]}))
            }
            else convertPresentations.push(p)
        }
        dispatch(modalActions.setModalData({ content: "WEEKVIEW", data: convertPresentations }))
    };
    //like handler 
    const [like, setLike] = useState(false);
    const likeHandler = () => {
        setLike(!like)
    };
    // functions
    const DayTimeRender = (presentation) => {
        return presentation.ConvertDayTime?.map((day, index) => <div className={index !== 0 ? "border-top border-secondary " : ""}><span dir="ltr">{toPersianNumber(day.endTime)}</span><span> تا </span><span dir="ltr">{toPersianNumber(day.startTime)}</span></div>)
    };
    const dayRender = (presentation) => {
        return presentation.ConvertDayTime?.map((day, index) => <div className={index !== 0 ? "border-top border-secondary " : ""}>{dayToPersian(day.dayOfWeek)}</div>)
    };
    const showMoreTimeTablesHandler = () => {
        dispatch(modalActions.setModalData({ content: "NEEDACC", data:  "MoreTimeTable"}))
    };


    return (
        <Fragment>
            <Card className={"preview"}>
                <Card.Header className={"d-flex justify-content-between preview-header"}>
                    <div>
                        <span> # {toPersianNumber(eventKey + 1)}</span>
                    </div>
                    <div className="d-flex">
                        <div dir="rtl">
                            <Badges variant={"alert"} text={"ساعت"} />
                            &nbsp;
                            <Badges variant={"primary"} text={"روز"} padding={true} />
                            &nbsp;
                            <span>
                                {like ? <BsHeartFill onClick={likeHandler} className={"like-btn"} /> : <BsHeart onClick={likeHandler} className={"like-btn"} />}
                            </span>
                        </div>
                        <ContextAwareToggle eventKey={eventKey} ></ContextAwareToggle>
                    </div>
                </Card.Header>
                <Accordion.Collapse className={"preview-body"} eventKey={eventKey}>
                    <Card.Body>
                        <div className="row">
                            <div className="col-12 row">
                                <span><BsCalendar2Check /> برنامه درسی</span>
                            </div>
                            <div className="col-12">
                                <div className="presentation-table-header row">
                                    <div className="col-8 col-md-3 col-xl-2">عنوان</div>
                                    <div className="d-none d-md-block col-md-2 col-xl-2">استاد</div>
                                    <div className="d-none d-md-block col-md-2 col-lg-2 col-xl-1">روز</div>
                                    <div className="d-none d-md-block col-md-3 col-xl-2 text-center">ساعت</div>
                                    <div className="d-none d-xl-block col-xl-2 text-center">واحد (نظری/عملی) </div>
                                    <div className="d-none d-xl-block col-xl-2 text-center">کد درس</div>
                                    
                                    <div className="col-4 col-md-2 col-xl-1 text-start text-xl-center">جزئیات</div>
                                </div>
                                <div className="presentation-table-body">
                                    {
                                        timeTable?.map((Presentation, index) => (
                                            <div className="presentation-table-body-row row" key={index}>
                                                <div className="col-8 col-md-3 col-xl-2">{Presentation.courseTitle}</div>
                                                <div className="d-none col-2 d-md-block col-md-2 col-xl-2">{Presentation.instructorName}</div>
                                                <div className="d-none d-md-block col-md-2 col-lg-2 col-xl-1">
                                                    {
                                                        dayRender(Presentation)
                                                    }
                                                </div>
                                                <div className="d-none d-md-block col-md-3 col-xl-2 text-center" dir="ltr">
                                                    {
                                                        DayTimeRender(Presentation)
                                                    }
                                                </div> 
                                                <div className="d-none d-xl-block col-xl-2 text-center">
                                                    {
                                                        toPersianNumber(Presentation.theoreticalUnit + " / " + Presentation.practicalUnit)
                                                    }
                                                </div>

                                                <div className="d-none d-xl-block col-xl-2 text-center">{toPersianNumber(Presentation.presentationCode)}</div>
                                                <div className="col-4 col-md-2 col-xl-1  text-start text-xl-center details" data-prestation={index}><BsInfoCircle data-prestation={index} onClick={detailShowHandler} /></div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="presentation-table-footer d-flex justify-content-end ">
                                    <button className="d-none d-lg-block btn_custome btn_info mt-3" onClick={weeklyViewHandler}>نمایش هفتگی</button>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Fragment>
    );
};
export default Preview;

// usage exampel
