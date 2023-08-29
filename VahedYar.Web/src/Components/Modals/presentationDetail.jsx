import './presentationDetail.css';
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from "../../Store/modal-slice";
import { courseActions } from "../../Store/course-slice";
import { useNavigate } from "react-router-dom";
import { authActions } from '../../Store/auth-slice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoadSpiner from '../Animations/loadSpiner';
import { useState } from 'react';
import { BsList } from "react-icons/bs";
import { toPersianNumber } from '../../feratures/helper/helper';
const PresentationDetail = () => {

    // route
    const navigate = useNavigate();

    // state
    const { isloading } = useSelector(state => state.ui);
    const { content, data } = useSelector(state => state.modal);
    const [uni, setUni] = useState(undefined);
    const [group, setGroup] = useState(undefined);

    const dispatch = useDispatch();

    // event handler
    const closeHandler = () => {
        dispatch(modalActions.hideModal());
    };

    // content handler


    return (
        <Fragment>
            {
                isloading ? <LoadSpiner /> : (
                    <Modal show={content === "Presentation-DEATAIL"} onHide={closeHandler} size="md" centered>
                        <Modal.Body className={"modal-PresentationDetail"}>
                            <div className="modal-PresentationDetail-header">
                                <span><BsList /> جزئیات</span>
                            </div>
                            <div className="modal-PresentationDetail-body">
                                <div className="modal-PresentationDetail-row row">
                                    <div className="col-5">عنوان درس :</div>
                                    <div className="col-7 text-center">{data.courseTitle}</div>
                                </div>
                                <div className="modal-PresentationDetail-row row">
                                    <div className="col-5">استاد :</div>
                                    <div className="col-7 text-center">{data.instructorName}</div>
                                </div>
                                <div className="modal-PresentationDetail-row row">
                                    <div className="col-5">روز :</div>
                                    <div className="col-7 text-center">{data.dayOfWeekToString}</div>
                                </div>
                                <div className="modal-PresentationDetail-row row">
                                    <div className="col-5">ساعت :</div>
                                    <div className="col-7 text-center" ><span dir="ltr">{toPersianNumber(data.startTimeToString)}</span><span> تا </span><span dir="ltr">{toPersianNumber(data.endTimeToString)}</span></div>
                                </div>
                                <div className="modal-PresentationDetail-row row">
                                    <div className="col-5">امتحان :</div>
                                    <div className="col-7 text-center"></div>
                                </div>
                                <div className="modal-PresentationDetail-row row">
                                    <div className="col-5">واحد :</div>
                                    <div className="col-7 text-center"></div>
                                </div>
                                <div className="modal-PresentationDetail-row row">
                                    <div className="col-5">کد درس :</div>
                                    <div className="col-7 text-center"></div>
                                </div>
                                <div className="modal-PresentationDetail-row row">
                                    <div className="col-5">کد ارائه :</div>
                                    <div className="col-7 text-center"></div>
                                </div>
                                <div className="d-flex justify-content-end btn-Group mt-3">
                                    <button className={"custome-btn-danger"} onClick={closeHandler}>بستن</button>
                                </div>
                            </div>

                        </Modal.Body>
                    </Modal>)
            }
        </Fragment>
    );
};

export default PresentationDetail; 