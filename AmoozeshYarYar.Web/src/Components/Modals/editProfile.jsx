import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from "../../Store/modal-slice";
import { authActions, requestData } from "../../Store/auth-slice";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './editProfile.css';


const EditProfile = () => {
    // state
    const content = useSelector(state => state.modal.content);
    const userInfo = useSelector(state => state.auth.userInfo);
    // dispatch 
    const dispatch = useDispatch();

    // event handlers
    const emailBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'EMAIL', inputTypeVal: event.target.value }));
        //validate     
        dispatch(authActions.validateInput({ inputType: 'EMAIL', inputTypeVal: event.target.value, inputSideVal: '' }));

    };
    const passwordBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'PASSWORD', inputTypeVal: event.target.value }));
        //validate
        dispatch(authActions.validateInput({ inputType: 'PASSWORD', inputTypeVal: event.target.value, inputSideVal: '' }));
        dispatch(authActions.validateInput({ inputType: 'REPASSWORD', inputTypeVal: userInfo.rePassword, inputSideVal: event.target.value }));

    };
    const phonNumberBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'PHONENUMBER', inputTypeVal: event.target.value }));
        //validate
        dispatch(authActions.validateInput({ inputType: 'PHONENUMBER', inputTypeVal: event.target.value, inputSideVal: '' }));
    };
    const firstNameBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'FIRSTNAME', inputTypeVal: event.target.value }));
        //validate
        dispatch(authActions.validateInput({ inputType: 'FIRSTNAME', inputTypeVal: event.target.value, inputSideVal: '' }));
    };
    const lastNameBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'LASTNAME', inputTypeVal: event.target.value }));
        //validate
        dispatch(authActions.validateInput({ inputType: 'LASTNAME', inputTypeVal: event.target.value, inputSideVal: '' }));
    };
    const uniBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'UNI', inputTypeVal: event.target.value }));
    };
    const subjectBulrHandler = (event) => {
        dispatch(authActions.userInfoKeeper({ inputType: 'SUBJECT', inputTypeVal: event.target.value }));
    };
    const handleClose = () => {
        dispatch(modalActions.hideModal());
    };
    const sumbitHandler = () => { };

    // functions
    const showSelectedInput = () => {
        if (content === "FIRSTNAME") {
            return (
                <Form onSubmit={sumbitHandler}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>نام قدیم :</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={userInfo.firstName}
                            disabled
                            readOnly 
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label><i className="bi bi-pencil-square"></i> نام جدید :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            onBlur={firstNameBulrHandler}
                        />
                    </Form.Group>
                </Form>
            );
        }
        if (content === "LASTNAME") {
            return (
                <Form onSubmit={sumbitHandler}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>نام خانوادگی قدیم :</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={userInfo.lastName}
                            disabled
                            readOnly 
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label><i className="bi bi-pencil-square"></i> نام خانوادگی جدید :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            onBlur={lastNameBulrHandler}
                        />
                    </Form.Group>
                </Form>
            );
        }
        if (content === "EMAIL") {
            return (
                <Form onSubmit={sumbitHandler}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>ایمیل قدیم :</Form.Label>
                        <Form.Control
                            type="email"
                            defaultValue={userInfo.email}
                            disabled
                            readOnly 
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label><i className="bi bi-pencil-square"></i> ایمیل جدید :</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder=""
                            onBlur={emailBulrHandler}
                        />
                    </Form.Group>
                </Form>
            );
        }
        if (content === "PASSWORD") {
            return (
                <Form onSubmit={sumbitHandler}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label> رمز قدیم :</Form.Label>
                        <Form.Control
                            type="password"
                            disabled
                            defaultValue={userInfo.password}
                            readOnly 

                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label><i className="bi bi-pencil-square"></i> رمز جدید :</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder=""
                            onBlur={passwordBulrHandler}
                        />
                    </Form.Group>
                </Form>
            );
        }
        if (content === "PHONENUMBER") {
            return (
                <Form onSubmit={sumbitHandler}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>شماره همراه قدیم :</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={userInfo.phoneNumber}
                            disabled
                            readOnly 
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label><i className="bi bi-pencil-square"></i> شماره همراه  جدید :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            onBlur={phonNumberBulrHandler}
                        />
                    </Form.Group>
                </Form>
            );
        }
        if (content === "UNI") {
            return (
                <Form onSubmit={sumbitHandler}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>دانشگاه قدیم :</Form.Label>
                        <Form.Select aria-label="Default select example" defaultValue={userInfo.uni} disabled readOnly  >
                            <option value="1"> دانشگاه آزاد اسلامی واحد تهران مرکز</option>
                            <option value="2">دانشگاه آزاد اسلامی واحد علوم تحقیقات</option>
                            <option value="3">دانشگاه آزاد اسلامی واحد تهران شمال</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label><i className="bi bi-pencil-square"></i> دانشگاه جدید :</Form.Label>
                        <Form.Select aria-label="Default select example"  onBlur={uniBulrHandler}>
                            <option value="1"> دانشگاه آزاد اسلامی واحد تهران مرکز</option>
                            <option value="2">دانشگاه آزاد اسلامی واحد علوم تحقیقات</option>
                            <option value="3">دانشگاه آزاد اسلامی واحد تهران شمال</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            );
        }
        if (content === "SUBJECT") {
            return (
                <Form onSubmit={sumbitHandler}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>رشته تحصیلی  قدیم :</Form.Label>
                        <Form.Select aria-label="Default select example" defaultValue={userInfo.subject} disabled readOnly>
                            <option value="1">مهندسی کامپیوتر</option>
                            <option value="2"> مهندسی برق</option>
                            <option value="3">مهندسی مکانیک</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label><i className="bi bi-pencil-square"></i> رشته تحصیلی  جدید :</Form.Label>
                        <Form.Select aria-label="Default select example" onBlur={subjectBulrHandler}>
                            <option value="1">مهندسی کامپیوتر</option>
                            <option value="2"> مهندسی برق</option>
                            <option value="3">مهندسی مکانیک</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            );
        }
    }

    return (
        <Modal show={content} onHide={handleClose} centered>
           
            <Modal.Body className={"modal-edit"}>
                <div className="row">
                    {showSelectedInput()}
                </div>
                <div className="row" dir="ltr">
                    <div className="col-3 col-sm-2 ">
                        <Button variant="outline-danger" onClick={handleClose}>
                            بستن
                        </Button>
                    </div>
                    <div className="col-3 col-sm-2 ">
                        <Button variant="outline-success">ذخیره</Button>
                    </div>
                    
                    
                </div>
                
            </Modal.Body>
            
        </Modal>
    );
   
};

export default EditProfile; 