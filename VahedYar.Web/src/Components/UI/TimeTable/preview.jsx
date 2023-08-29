import './preview.css';

import { Fragment } from "react";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Badges from '../Badges/badges';
import Like from '../Badges/likeBtn';
import PresentationDetail from '../../Modals/presentationDetail';
import { modalActions } from '../../../Store/modal-slice';
import { BsChevronBarContract, BsCalendar2Check, BsInfoCircle, BsHeart, BsHeartFill } from "react-icons/bs";
import { toPersianNumber } from '../../../feratures/helper/helper';



const Preview = (prop) => {
    const { timeTable, eventKey } = prop
    // state 

    //hook 
    const dispatch = useDispatch();
    function ContextAwareToggle({ children, eventKey, callback }) {
        const decoratedOnClick = useAccordionButton(
            eventKey,
            () => callback && callback(eventKey),
        );
        return (<BsChevronBarContract onClick={decoratedOnClick}/>)
    }
    // event handler 
    const detailShowHandler = (event) => {
        let id = event.target.getAttribute("data-prestation");
        dispatch(modalActions.setModalData({ content: "Presentation-DEATAIL", data: timeTable[id] }))
    };
    const weeklyViewHandler = () => {
        dispatch(modalActions.setModalData({ content: "WEEKVIEW", data: timeTable }))
    };
    //like handler 
    const [like, setLike] = useState(false);
    const likeHandler = () => {
        setLike(!like)
    };
    // functions 

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
                            <Badges variant={"primary"} text={"واحد"} />
                            &nbsp;
                            <Badges variant={"info"} text={"روز"} padding={true} />
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
                                    <div className="col-8 col-md-4 col-xl-2">عنوان</div>
                                    <div className="d-none col-2 d-md-block col-md-2 col-xl-2">استاد</div>
                                    <div className="d-none d-md-block col-md-1 col-xl-1">روز</div>
                                    <div className="d-none d-md-block col-md-3 col-xl-2 text-md-start text-xl-center">ساعت</div>   
                                    <div className="d-none d-xl-block col-xl-1 text-center">واحد </div>
                                    <div className="d-none d-xl-block col-xl-1 text-center">کد درس</div>
                                    <div className="d-none d-xl-block col-xl-2 text-center">کد ارائه </div>
                                    <div className="col-4 col-md-2 col-xl-1 text-start text-xl-center">جزئیات</div>
                                </div>
                                <div className="presentation-table-body">
                                    {
                                        timeTable?.map((Presentation, index) => (
                                            <div className="presentation-table-body-row row" key={index}>
                                                <div className="col-8 col-md-4 col-xl-2">{Presentation.courseTitle}</div>
                                                <div className="d-none col-2 d-md-block col-md-2 col-xl-2">{Presentation.instructorName}</div>
                                                <div className="d-none d-md-block col-md-2 col-xl-1">{Presentation.dayOfWeekToString}</div>
                                                <div className="d-none d-md-block col-md-3 col-xl-2 text-center" dir="ltr"><span dir="ltr">{Presentation.endTimeToString}</span><span> تا </span><span dir="ltr">{Presentation.startTimeToString}</span></div>                                             
                                                <div className="d-none d-xl-block col-xl-1 text-center"></div>
                                                <div className="d-none d-xl-block col-xl-1 text-center"></div>
                                                <div className="d-none d-xl-block col-xl-2 text-center"></div>
                                                <div className="col-4 col-md-1 col-xl-1 text-start text-xl-center details" ><i data-prestation={index} onClick={detailShowHandler}><BsInfoCircle data-prestation={index} /> </i></div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="presentation-table-footer d-flex justify-content-end ">
                                    <button className="d-none d-lg-block custome-btn-info mt-3" onClick={weeklyViewHandler}>نمایش هفتگی</button>
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
