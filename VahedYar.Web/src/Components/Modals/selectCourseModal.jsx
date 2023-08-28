import './selectCourseModal.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from "../../Store/modal-slice";
import { courseActions } from "../../Store/course-slice";
import { uiActions } from "../../Store/ui-slice";
import { Fragment, useEffect, useState } from 'react';
import LoadSpiner from '../Animations/loadSpiner';

const SelectCourseModal = (prop) => {
    // state
    const { isloading, itemPerPage } = useSelector(state => state.ui);
    const { content } = useSelector(state => state.modal);
    const { courses, selectedcourses, page, filteredCourses } = useSelector(state => state.course);
    const [pageIndex, setPageIndex] = useState(0);
    const [amount, setAmount] = useState(Math.ceil(courses?.length / 5));

    //paginator
    const dispatch = useDispatch();

    //event handler 
    const closeHandler = () => {
        dispatch(modalActions.hideModal());
        dispatch(courseActions.clearFilter())

    };
    const selectCourseHandler = event => {
        let courseId = event.target.getAttribute("id");
        let checked = event.target.checked;
        if (checked) {
            dispatch(courseActions.selectCourse({ courseId }))
        } else {
            dispatch(courseActions.removeCourse({ courseId }))
        }
    };
    const filterTitleHandler = (event) => {
        let value = event.target.value;
        dispatch(courseActions.setFiterForCourses({ filter: value }));
    };

    //pagination
    //event handler
    const paginationHandler = (event) => {
        let pageNO = event.target.getAttribute("data-name");
        let i = pageIndex;
        if (pageNO === "PREV" && (pageIndex > 0)) {
            setPageIndex(i - 1);
        }
        else if (pageNO === "NEXT" && (pageIndex + 1 < amount)) {
            setPageIndex(i + 1);
        }
        else if (pageNO !== "NEXT" && pageNO !== "PREV") {
            setPageIndex(parseInt(pageNO) - 1);
        }
        dispatch(uiActions.setPageNO({ pageNO: pageIndex }));
    };

    //functions
    let pages = [];
    for (let i = 1; i <= amount; i++) {
        pages.push(i);
    }
    const checkForSeletedCourse = (id) => {
        return selectedcourses?.find(seleted => seleted.courseId === id) ? true : false;
    }
    // onload 
    useEffect(() => {

    }, []);

    useEffect(() => {
        dispatch(courseActions.renderPage({ pageNO: pageIndex + 1, itemPerPage }));
    }, [pageIndex]);

    useEffect(() => {
        dispatch(courseActions.renderPage({ pageNO: pageIndex + 1, itemPerPage }));
        if (!filteredCourses?.length) setAmount(Math.ceil(courses?.length / 10));
        else setAmount(Math.ceil(filteredCourses?.length / 10));
        setPageIndex(0);
    }, [filteredCourses]);

    return (
        <Fragment>
            {
                isloading && !page?.length ? <LoadSpiner /> : (
                    <Modal show={content === "COURSE"} fullscreen={true} onHide={closeHandler} size="xl" centered>
                        <Modal.Body className={"modal-course"}>
                            <div className="m-2 mt-3">
                                <div className="select-course-Modal-info row" dir="ltr">
                                    <div className="col-12" dir="rtl" >
                                        <h4><i className="bi bi-search"></i> فیلتر درس  </h4 >
                                    </div>
                                    {/*<div className="d-none d-lg-block col-lg-4"></div>*/}
                                    <div className="col-12 col-md-6 col-lg-8 mb-4 pt-4" dir="rtl">
                                        <div className="">
                                            <span className="ms-2"><i className="bi bi-exclamation-circle"></i></span>
                                            <span>برای برداشتن درس های معارف راحت تر هستش که فیلتر گروه ارائه دهنده رو به گروه معارف تغییر بدی!</span>
                                        </div>
                                        <div className="mt-4">
                                            <span className="ms-2"><i className="bi bi-exclamation-circle"></i></span>
                                            <span>یادت باشه ما فقط داریم درس هایی رو بهت نشون میدیم که گروه درسی خودت ارائه میده! در صورتی که گروه درسیت رو اشتباه انتخاب کردی روی لینک تغییر مشخصات اولیه کلیک کن.</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4" dir="rtl">
                                        <div className="select-course-Modal-search-row row">
                                            <div className="col-12 mt-2">
                                                <label className="mb-2">عنوان درس :</label>
                                                <div className="search-input-group mb-1">
                                                    <input className="form-control form-control-sm" type="text" placeholder="" id="filterTitleInput" onChange={filterTitleHandler} aria-label=".form-control-sm example" />
                                                </div>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <label className="mb-2">گروه ارائه دهنده :</label>
                                                <select className="form-select form-select-sm custome-selectInput-course-Modal " aria-label="Default select example">
                                                    <option>همه</option>
                                                </select>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <label className="mb-2">واحد درسی :</label>
                                                <select className="form-select form-select-sm custome-selectInput-course-Modal " aria-label="Default select example">
                                                    <option>همه</option>
                                                </select>
                                            </div>

                                        </div>
                                        <div className="col-12 mt-4">
                                            <button className="custome-btn-danger">حذف فیلتر</button>
                                        </div>

                                    </div>
                                    <div className="col-4 d-flex justify-content-end" dir="rtl">
                                        <button className="custome-btn-info" onClick={closeHandler}>بازگشت</button>
                                    </div>

                                </div>

                                <div className="select-course-Modal-table-header row">
                                    <div className="d-none d-lg-block col-2 ">انتخاب <span className="d-none d-lg-inline">درس</span></div>
                                    <div className="col-6 col-lg-3 text-center text-lg-end">عنوان <span className="d-none d-lg-inline">درس</span></div>
                                    <div className="col-6 col-lg-3 text-end">گروه <span className="d-none d-lg-inline">ارائه دهنده</span></div>
                                    <div className="d-none d-lg-block col-2 textcenter">واحد(نظری/عملی)</div>
                                    <div className="col-1"></div>
                                </div>
                                <div className="select-course-Modal-table-body">
                                    {
                                        page?.map(course => (
                                            <div key={course.courseId} className="row">
                                                <div className="col-2  d-flex justify-content-center">
                                                    <input checked={checkForSeletedCourse(course.courseId)} className="form-check-input m-2" type="checkbox" id={course.courseId} onChange={selectCourseHandler} />
                                                </div>
                                                <div className="col-6 col-lg-3 ">
                                                    <span >{course.title}</span>
                                                </div>
                                                <div className="col-5 col-lg-3 ">
                                                    <span >{course.group}</span>
                                                </div>
                                                <div className="d-none d-lg-block col-2 text-center">
                                                    <span >{course.theoreticalUnits}/{course.practicalUnits}</span>
                                                </div>
                                                <div className="col-1 d-flex justify-content-center">
                                                    <span >{course.unit}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="select-course-Modal-table-footer row">
                                    <div className={"d-flex"} dir="ltr" >
                                        <div className="pagination">
                                            <div className={amount > 1 ? "pagination-page" : "d-none"} data-name="1" onClick={paginationHandler}>{1}</div>
                                            <div className={(pageIndex < 1) ? "pagination-page disabled" : "pagination-page"} data-name="PREV" onClick={paginationHandler}>قبلی</div>
                                            <div className={"pagination-page"} data-name={pageIndex}>{pageIndex + 1}</div>
                                            <div className={(pageIndex + 1 === amount) ? "pagination-page disabled" : "pagination-page"} data-name="NEXT" onClick={paginationHandler}>بعدی</div>
                                            <div className={amount > 1 ? "pagination-page" : "d-none"} data-name={amount} onClick={paginationHandler}>{amount}</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                )
            }
        </Fragment>


    );
};
export default SelectCourseModal;