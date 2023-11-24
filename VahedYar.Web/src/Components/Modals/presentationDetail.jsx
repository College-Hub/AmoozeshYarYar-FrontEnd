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
import { BsList, BsClipboardPlus } from "react-icons/bs";
import { dayToPersian, toPersianNumber } from '../../feratures/helper/helper';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


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
    const copyPCodeHandler = (event) => {
        navigator.clipboard.writeText(event.target.getAttribute("data-valueToCopy"));
    }
    // functios
    const DayTimeRender = () => {
        return data.ConvertDayTime.map((day, index) => <div className={index !== 0 ? "border-top border-secondary " : ""}><span dir="ltr">{toPersianNumber(day.endTime)}</span><span> تا </span><span dir="ltr">{toPersianNumber(day.startTime)}</span></div>)
    };
    const dayRender = () => {
        return data.ConvertDayTime?.map((day, index) => <div className={index !== 0 ? "border-top border-secondary " : ""}>{dayToPersian(day.dayOfWeek)}</div>)
    };


    return (
        <Fragment>
            {
                isloading ? <LoadSpiner /> : (
                    <Modal show={content === "Presentation-DEATAIL" && data} onHide={closeHandler} size="md" centered>
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
                                    <div className="col-7 text-center">
                                        {
                                            dayRender()
                                        }
                                    </div>
                                </div>
                                <div className="modal-PresentationDetail-row row">
                                    <div className="col-5">ساعت :</div>
                                    <div className="col-7 text-center" >
                                        {
                                            DayTimeRender()
                                        }
                                    </div>
                                </div>
                                <div className="modal-PresentationDetail-row row">
                                    <div className="col-5">امتحان :</div>
                                    <div className="col-7 text-center"></div>
                                </div>
                                <div className="modal-PresentationDetail-row row">
                                    <div className="col-5">واحد نظری :</div>
                                    <div className="col-7 text-center">{toPersianNumber(data.theoreticalUnit)}</div>
                                </div>
                                <div className="modal-PresentationDetail-row row">
                                    <div className="col-5">واحد عملی :</div>
                                    <div className="col-7 text-center">{toPersianNumber(data.practicalUnit)}</div>
                                </div>
                                <div className="modal-PresentationDetail-row row">
                                    <div className="col-5">کد درس :</div>
                                    <div className="col-7 text-center"></div>
                                </div>
                                <div className="modal-PresentationDetail-row row">
                                    <div className="col-6">کد ارائه :</div>
                                    <div className="col-4 text-center">{toPersianNumber(data.presentationCode)}</div>
                                    <div className="col-2 text-center copyIcon">
                                        
                                            <OverlayTrigger
                                                key={data.presentationCode + "GF"}
                                                placement="top"
                                                delay={{ show: 250, hide: 400 }}
                                                containerPadding={60}
                                                overlay={<Tooltip id="custom-tooltip">کپی</Tooltip>}
                                        >
                                            <span>
                                                <BsClipboardPlus onClick={copyPCodeHandler} data-valueToCopy={data.presentationCode} />
                                            </span>

                                            </OverlayTrigger>
                                    </div>

                                </div>
                                <div className="d-flex justify-content-end btn-Group mt-3">
                                    <button className={"btn_custome btn_danger"} onClick={closeHandler}>بستن</button>
                                </div>
                            </div>

                        </Modal.Body>
                    </Modal>)
            }
        </Fragment>
    );
};

export default PresentationDetail; 