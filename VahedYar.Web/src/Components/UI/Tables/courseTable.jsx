import './courseTable.css';

import { courseActions } from "../../../Store/course-slice";
import { modalActions } from "../../../Store/modal-slice";
import { useSelector, useDispatch } from 'react-redux';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { toPersianNumber } from '../../../feratures/helper/helper';
const CourseTable = () => {
    const { selectedcourses, courses, error, } = useSelector(state => state.course);
    const { pageNO } = useSelector(state => state.ui);


    //query 
    

    // dispatch
    const dispatch = useDispatch();

    // event handler
    const TeacherSelectHandler = event => {
        let id = event.target.getAttribute("id");
        let selectedTeacherId = event.target.value;
        dispatch(courseActions.teacherSelect({ courseId: id, selectedTeacherId }));
    };
    const deleteCourseHandler = event => {
        let courseId = event.target.getAttribute("id");
        dispatch(courseActions.removeCourse({ courseId}))
    };
    const selectCourseModalHandler = () => {
        dispatch(modalActions.setModalData({ content: "COURSE" }));
    };

    //functions 
    const renderInstructors = (id) => {
        const course = courses?.find(course => course.courseId === id);
        return course?.instructors?.map(instructor => <option key={instructor.instructorId} value={instructor.instructorId} >{instructor.name}</option>);
    };
    const generateTotalUnit = () => {
        let arr = selectedcourses?.map(course => course.practicalUnits + course.theoreticalUnits);
        return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    }

    //useEffect(() => {
    //    console.log(selectedcourses);
    //}, [selectedcourses])

    return (
        <Fragment>
            <div className="lesson-list">
                <div className="lesson-list-header row">
                    <div className="col-5 col-lg-3">عنوان <span className="d-none d-md-inline">درس</span></div>
                    <div className="col-3 d-none d-lg-block">گروه <span className="d-none d-md-inline">ارائه دهنده</span></div>
                    <div className="col-2 d-none d-lg-block">واحد(نظری/عملی)</div>
                    <div className="col-5 col-lg-2 text-end">استاد <span className="d-none d-md-inline">ارائه کننده</span></div>
                    <div className="col-2 d-flex justify-content-end">
                        <div className="p-1">
                            <button className="custome-btn-info" onClick={selectCourseModalHandler}>انتخاب </button>
                        </div>
                    </div>
                </div>
                <div className="lesson-list-body">
                    {
                        selectedcourses.map(course => 
                            <div key={course.courseId} className={"lesson-list-body-row row"}>
                                <div className="col-5 col-lg-3">
                                    <span >{course.title}</span>
                                </div>
                                <div className="col-3 d-none d-lg-block">
                                    <span >{course.group}</span>
                                </div>
                                <div className="col-2 d-none d-lg-block text-center">
                                    <span >{course.theoreticalUnits}/{course.practicalUnits}</span>
                                </div>
                                <div className="col-6 col-lg-3  d-flex justify-content-start" >
                                    <div className="selectContainer">
                                        <select className="form-select cutomeSelect " id={course.courseId} onChange={TeacherSelectHandler} aria-label="Default select example">
                                            <option value={courses?.find(item => item.courseId === course.courseId)?.instructorsIds}>همه</option>
                                            {
                                                renderInstructors(course.courseId)
                                            }
                                            {course.instructors?.map(instructor => <option key={instructor.instructorId} value={instructor.instructorId} >{instructor.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-1 d-flex justify-content-center DelectIcon" >
                                    <i className="bi bi-trash3" id={course.courseId} onClick={deleteCourseHandler}></i>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="lesson-list-footer row">
                    <div className="col-12 col-md-6">
                        <span>تعداد درس انتخاب شده : <span>{toPersianNumber(selectedcourses.length)}</span> </span>
                    </div>
                    <div className="col-12 col-md-6">
                        <span>مجموع واحد های درسی : <span>{toPersianNumber(generateTotalUnit())}</span></span>
                    </div>
                    
                </div>
            </div>
        </Fragment>
    );
};

export default CourseTable; 