import './forgotAccount.css';
import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from "../../Store/modal-slice";
import { courseActions } from "../../Store/course-slice";
import { useNavigate } from "react-router-dom";
import { authActions } from '../../Store/auth-slice';
import Modal from 'react-bootstrap/Modal';
import LoadSpiner from '../Animations/loadSpiner';
import { BsBuildings, BsBook, BsInfoCircle, BsEnvelopeAt, BsExclamationOctagon } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa6";

const ForgotAcc = () => {



    // state
    const { isloading, NoResponseFromServer } = useSelector(state => state.ui);
    const { content } = useSelector(state => state.modal);
    const { startUpData } = useSelector(state => state.course);
    const { serversideErros, clientsideErrors, User, hadAccount } = useSelector(state => state.auth);


    //hooks 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // event handler

    const emailBulrHandler = (event) => {
        //validate     
        dispatch(authActions.validateInput({ inputType: 'EMAIL', inputTypeVal: event.target.value, inputSideVal: '' }));

        if (!clientsideErrors.email) dispatch(authActions.userInfoKeeper({ inputType: 'EMAIL', inputTypeVal: event.target.value }));
    };
    
    const closeHandler = () => {
        dispatch(modalActions.hideModal());
    };
    const submitHandler = async () => {
        if (User.email && !clientsideErrors.email) {
            dispatch(modalActions.hideModal());
        }
    };
    
    // content handler


    return (
        <Fragment>
            <Modal show={content === "FORGOT-ACC"} onHide={closeHandler} size="md" centered>
                <Modal.Body className={"modal-Forgot-ACC"}>
                    <div className="row">
                        <div className="col-12">
                            <p>برای بازیابی حساب کاربریت ایمیلی که قبلا بهمون دادی رو وارد کن!</p>
                        </div>
                        <div className="col-12 mt-3">
                            <label htmlFor="exampleInputEmail" className="form-label"><BsEnvelopeAt />  ایمیل :</label>
                            <input type="email" className="form-control custome-input" id="exampleInputEmail" dir="ltr" onBlur={emailBulrHandler} aria-describedby="emailHelp" placeholder="example@email.com" />
                            {
                                clientsideErrors.email && <div id="firstNamedHelp" className="form-text helper"><span className="custome-danger"><BsExclamationOctagon /> {clientsideErrors.email}</span></div>
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-end btn-Group mt-3">
                        <button className={"btn_custome btn_danger"} onClick={closeHandler}>برگشت</button>
                        <button className={!User.email || clientsideErrors.email ? "custome-disabled" : "btn_custome btn_primary"} onClick={submitHandler}>ادامه</button>
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default ForgotAcc; 