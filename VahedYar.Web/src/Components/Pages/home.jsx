﻿import './home.css';
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { BsEmojiSmile, BsGear } from "react-icons/bs";
import { modalActions } from "../../Store/modal-slice";
import HomeAnimation from "../Animations/homeAnimation";
import UserInfo from "../Modals/userInfo";


const Home = () => {
    //state
    const { content } = useSelector(state => state.modal);
    

    // hooks 
    const dispatch = useDispatch();

    // event handlers
    const startHandler = () => {
        dispatch(modalActions.setModalData({ content: "USERINFO",}));
    };
    //useEffect(() => {
    //    dispatch(authActions.clearLocalStorage({ type: "USERINFO"}))
    //}, [])
    return (
        <Fragment>
            <section id="home">
                <div className="row" dir="ltr">
                    <div className="col-12 col-lg-6 ">
                        <HomeAnimation />
                    </div>
                    <div className="col-12 col-lg-5 mt-5 mt-lg-0 offset-lg-1" dir="rtl">
                        <h3><BsEmojiSmile /> با خیال راحت انتخاب واحد کن!</h3>
                        <p className="mt-3"> فقط کافیه روز و ساعتی که میخوای دانشگاه باشی رو به ما بگی بعد درسی که میخوای با استاد دلخواه خودت رو برامون مشخص کن ما بهت یه لیست از کد درس هایی که باید تو سامانه آموزشیار وارد کنی بهت میدیم تا با سریع ترین روش ممکن بتونی انتخاب کنی. </p>
                        <h3 className="mt-5"><BsGear /> ساخت برنامه درسی</h3>
                        <p>برای ساخت برنامه درسی ما اول چندتا اطلاعات جزئی نیاز داریم که در ادامه ازت میگیریم برای شروع روی لینک ساخت برنامه کلیک کن.</p>
                        <div className="d-flex justify-content-end">
                            <button className="custome-btn-primary" onClick={startHandler}>ساخت برنامه</button>
                        </div>
                    </div>
                </div>
            </section>
            {
                content === "USERINFO" && <UserInfo />
            }
            
            
        </Fragment>
    );
};

export default Home; 