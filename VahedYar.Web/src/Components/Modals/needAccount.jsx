import './needAccount.css';
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from "../../Store/modal-slice";
import { courseActions } from "../../Store/course-slice";
import { useNavigate } from "react-router-dom";
import { authActions } from '../../Store/auth-slice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoadSpiner from '../Animations/loadSpiner';
import NoResponse from '../Errors/Requests/noResponse';
import { useState } from 'react';
import { BsBuildings, BsBook, BsInfoCircle } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa6";
import { BsExclamationTriangle } from "react-icons/bs";

const NeedAccount = () => {



    // state
    const { isloading, NoResponseFromServer } = useSelector(state => state.ui);
    const { content } = useSelector(state => state.modal);
    //hooks 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // event handler 

    const closeHandler = () => {
        dispatch(modalActions.hideModal());
    };
    const submitHandler = () => {
        navigate("/authentication/signup");
    }; 
    // content handler


    return (
        <Fragment>
            <Modal show={content === "NEEDACC"} onHide={closeHandler} size="md" centered>
                <Modal.Body className={"modal-NeedAcc"}>
                    <div className="row">
                        <div className="col-12">
                            <h2><BsExclamationTriangle /></h2>
                            <p>برای ادامه فعالیت مدنظرت نیازه که داخل حساب‌کاربریت باشی تا ما بتونیم تغییراتی که داری میدی رو برات ذخیره کنیم!</p>
                        </div>
                    </div>
 

                    <div className="d-flex justify-content-end btn-Group mt-3">
                        <button className={"custome-btn-danger"} onClick={closeHandler}>برگشت</button>
                        <button className={"custome-btn-primary"} onClick={submitHandler}>ورود به حساب‌کاربری</button>
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default NeedAccount; 