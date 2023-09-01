import './userInfo.css';
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

const UserInfo = () => {

    

    // state
    const { isloading , NoResponseFromServer } = useSelector(state => state.ui);
    const { content } = useSelector(state => state.modal);
    const { startUpData } = useSelector(state => state.course);
    const [uni, setUni] = useState(undefined);
    const [group, setGroup] = useState(undefined);
    const [educLevel, setEducLevel] = useState(undefined);
    const [view, setView ] = useState();

    //hooks 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // event handler 
    const uniBulrHandler = event => {
        setUni(startUpData?.find(uni => uni.universityId === event.target.value));
        setGroup(undefined)
    };
    const groupBulrHandler = event => {
        setGroup(startUpData?.find(item => item.universityId === uni.universityId).groups.find(gp => gp.groupId === event.target.value));
    };
    const educationalHandler = event => {
        setEducLevel(event.target.value)
    }
    const closeHandler = () => {
        dispatch(modalActions.hideModal());
    };
    const submitHandler = async () => {
        if (uni && group  ) {
            dispatch(courseActions.clearCourses());
            dispatch(courseActions.StartUpHandler());
            dispatch(authActions.userInfoKeeper({ inputType: 'UNI', inputTypeVal: uni, inputSideVal: '' }));
            dispatch(authActions.userInfoKeeper({ inputType: 'GROUP', inputTypeVal: group, inputSideVal: '' }));
            dispatch(authActions.userInfoKeeper({ inputType: 'EDLEVEL', inputTypeVal: educLevel, inputSideVal: '' }));
            navigate("/selectCourses");
            dispatch(modalActions.hideModal());
        }
        
    };

    useEffect(() => {
        if (NoResponseFromServer) { 
            navigate("/NotFound");
            dispatch(modalActions.hideModal());
        }
        else if (isloading) 
            setView(<LoadSpiner />);
        else
            setView(null);
    }, [isloading, NoResponseFromServer]);

    // content handler
 

    return (
        <Fragment>
            
                
            {
                view ? view : (
                    <Modal show={content === "USERINFO"} onHide={closeHandler} size="md" centered>
                    <Modal.Body className={"modal-userInfo"}>
                        <div className="row">
                            <div className="col-12">
                                <span>اطلاعات زیر را برای شروع وارد کن</span>
                            </div>
                            <div className="col-12">
                                <div className="col-12 mt-3">
                                        <label htmlFor="exampleInputUni" className="form-label"><BsBuildings /> دانشگاه :</label>
                                    <select className="form-select custome-modal-input" aria-label="Default select example" onChange={uniBulrHandler} id="exampleInputUni" aria-describedby="uniHelp">
                                        <option value={undefined}>انتخاب</option>
                                        {
                                            startUpData?.map(item => <option key={item.universityId} value={item.universityId}>{item.title}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="col-12 mt-3">
                                        <label htmlFor="exampleInputgroup" className="form-label"><BsBook /> رشته تحصیلی :</label>
                                    <select className="form-select custome-modal-input" aria-label="Default select example" onChange={groupBulrHandler} id="exampleInputgroup" aria-describedby="groupHelp" disabled={!uni}>
                                        <option value={undefined}>انتخاب</option>
                                        {
                                            uni?.groups?.map(group => <option key={group.groupId} value={group.groupId}>{group.title}</option>)
                                        }
                                    </select>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <label htmlFor="exampleInputgroup" className="form-label"><FaUserGraduate /> مقطع تحصیلی :</label>
                                        <select className="form-select custome-modal-input" aria-label="Default select example" onChange={educationalHandler} id="exampleInputgroup" aria-describedby="groupHelp" disabled={false}>
                                            <option value={undefined}>انتخاب</option>
                                            {/*{*/}
                                            {/*    uni?.groups?.map(group => <option key={group.groupId} value={group.groupId}>{group.title}</option>)*/}
                                            {/*}*/}
                                        </select>
                                    </div>
                            </div>
                        </div>
                            <div className="d-flex justify-content-end btn-Group mt-3">
                                <button className={"custome-btn-danger"} onClick={closeHandler}>برگشت</button>
                                <button className={!uni || !group ? "custome-disabled" : "custome-btn-primary"} onClick={submitHandler}>ادامه</button>
                        </div>
                    </Modal.Body>
                </Modal>)
            }

        </Fragment>
    );
};

export default UserInfo; 