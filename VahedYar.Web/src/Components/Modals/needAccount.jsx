import './needAccount.css';
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from "../../Store/modal-slice";
import { useNavigate, useLocation } from "react-router-dom";
import { authActions } from '../../Store/auth-slice';
import Modal from 'react-bootstrap/Modal';
import { BsExclamationTriangle } from "react-icons/bs";

const NeedAccount = () => {



    // state
    const { isloading, NoResponseFromServer } = useSelector(state => state.ui);
    const { content, data} = useSelector(state => state.modal);
    //hooks 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    // event handler 

    const closeHandler = () => {
        dispatch(modalActions.hideModal());
    };
    const submitHandler = () => {
        dispatch(authActions.setLastPageUrl(location.pathname));
        navigate("/authentication/signup");
        dispatch(modalActions.hideModal());
    }; 
    // content handler


    return (
        <Fragment>
            <Modal show={content === "NEEDACC"} onHide={closeHandler} size="md" centered>
                <Modal.Body className={"modal-NeedAcc"}>
                    <div className="row">
                        <div className="col-12">
                            <h2><BsExclamationTriangle /></h2>
                            {
                                data === "MoreTimeTable" && <p>برای ادامه فعالیت مدنظرت نیازه که داخل حساب‌کاربریت باشی تا ما بتونیم تغییراتی که داری میدی رو برات ذخیره کنیم!</p>
                            }
                            {
                                data === "LikeEnable" && <p>برای اینکه بتونیم برنامه مورد نظرت رو به لیست مورد علاقت اضافه کنیم باید داخل حساب کاربریت باشی!</p>
                            }
                        </div>
                    </div>
 

                    <div className="d-flex justify-content-end btn-Group mt-3">
                        <button className={"btn_custome btn_danger"} onClick={closeHandler}>برگشت</button>
                        <button className={"btn_custome btn_primary"} onClick={submitHandler}>ورود به حساب‌کاربری</button>
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default NeedAccount; 