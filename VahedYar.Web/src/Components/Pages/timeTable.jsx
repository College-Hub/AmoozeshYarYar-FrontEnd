    import './timeTable.css';
import { useSubmitFitersMutation } from "../../feratures/api/apiSlice";
import { Fragment } from "react";
import { modalActions } from "../../Store/modal-slice";
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../Store/ui-slice';
import { useEffect, useState } from 'react';
import { timeTableActions } from '../../Store/timeTable-slice';
import LoadSpiner from '../Animations/loadSpiner';
import Badges from '../UI/Badges/badges';
import Accordion from 'react-bootstrap/Accordion';
import Preview from '../UI/TimeTable/preview';
import PresentationDetail from '../Modals/presentationDetail';
import WeeklyView from '../Modals/weeklyView';
import { BsChevronBarContract, BsHeart, BsInfoCircle } from "react-icons/bs";
import { toPersianNumber } from '../../feratures/helper/helper';
import NeedAccount from '../Modals/needAccount';

const TimeTable = () => {
    //state
    const { TimeTableFilter } = useSelector(state => state.course);
    const { timeTables } = useSelector(state => state.timeTable);
    const { isloading } = useSelector(state => state.ui);
    const { content } = useSelector(state => state.modal);

    //hooks
    const dispatch = useDispatch();
    const [submitFiter, { isLoading, isEroor }] = useSubmitFitersMutation();


    useEffect(() => {
        handleRequest();
    }, [])
    useEffect(() => {
        dispatch(uiActions.setLoader(isLoading));
    }, [isLoading]);
    //enent handlers
    //funcion
    // Request handler
    const handleRequest = async () => {
        try {
            const { data: response } = await submitFiter(TimeTableFilter);
            dispatch(uiActions.setLoader(isLoading));
            if (!isEroor && !isLoading) {
                dispatch(timeTableActions.initiateTimeTables(response.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Fragment>
            {
                isloading ? <LoadSpiner /> :
                    (
                        <Fragment>
                            <section id="timeTableHelp" className="row custome-contaner-section">
                                <div className={"row"}>
                                    <article className="col-12">
                                        <h5><i className="bi bi-pin"></i> راهنما</h5>
                                        <p className="hit-message"><i className="bi bi-exclamation-circle"></i>  ما با توجه به فیلتر هایی که در  قسمت ها قبلی بهمون دادی برات تعدادی جدول زمانی درست کردیم و در نهایت 5 تا از نتایج رو بهت نشون میدیم. ( برای نمایش جدول های زمانی بیشتر نیازه حساب کاربری بسازی! )</p>
                                        <p className="hit-message"><i className="bi bi-exclamation-circle"></i> لیستی از  پیش‌نمایش ها از هر جدول زمانی رو در پایین این بخش میتونی ببینی. این پیش‌نمایش ها دارای یکسری اطلاعات پایه برای نمایش هستن با کلیک بر روی آیکون  ( <BsChevronBarContract /> ) میتونی اطلاعات بیشتری از اون جدول زمانی بگیری.</p>
                                        <p className="hit-message"><i className="bi bi-exclamation-circle"></i> با کلیک  بر روی آیکون قلب ( <BsHeart /> ) میتونی جدول زمانی موردعلاقت رو سیو کنی که اگه بعدا باز به سایت ما برگشتی بتونی ببینیش. ( برای فعال شدن این افزونه نیازه حساب کاربری بسازی! )</p>
                                    </article>
                                </div>
                            </section>
                            <section id="timeTable" className="row custome-contaner-section row">
                                <div className="col-12 d-flex justify-content-between mt-4">
                                    <div>
                                        <h5><i className="bi bi-view-list"></i> جدول زمانی</h5>
                                    </div>
                                    <div className="timeTable-info">
                                        <span> <span>{toPersianNumber(timeTables?.length)}</span> جدول ساخته شده</span>
                                    </div>
                                </div>
                                <Accordion defaultActiveKey="0">
                                    {
                                        timeTables?.map((p, index) => index < 10 ? <Preview key={index} eventKey={index} timeTable={p} /> : null)
                                    }
                                </Accordion>
                            </section>
                            {
                                content === "Presentation-DEATAIL" && < PresentationDetail />
                            }
                            {
                                content === "WEEKVIEW" && <WeeklyView />
                            }
                            {
                                content === "NEEDACC" && <NeedAccount />
                            }
                        </Fragment>
                    )
            }
        </Fragment>
    );
};

export default TimeTable; 