import { createSlice } from "@reduxjs/toolkit";


// local Storage
const startUpData = JSON.parse(localStorage.getItem('startUpData'));
let pagesNO = JSON.parse(localStorage.getItem('pages'));
let courses = JSON.parse(localStorage.getItem('courses'));
let selectedcourses = JSON.parse(localStorage.getItem('selectedcourses'));

const initialState = {
    startUpData,
    pagesNO,
    courses,
    filteredCourses: [],
    page: [],
    selectedcourses,
    days: [
        { id: 0, isSelected: false, time: ['600', '2300'], title: "شنبه" },
        { id: 1, isSelected: false, time: ['600', '2300'], title: "یک شنبه" },
        { id: 2, isSelected: false, time: ['600', '2300'], title: "دو شنبه" },
        { id: 3, isSelected: false, time: ['600', '2300'], title: "سه شنبه" },
        { id: 4, isSelected: false, time: ['600', '2300'], title: "چهار شنبه" },
        { id: 5, isSelected: false, time: ['600', '2300'], title: "پنج شنبه" },
        { id: 6, isSelected: false, time: ['600', '2300'], title: "جمعه" },
    ],
    presentation: [],
    error: { noCourseModel: false },
    isloading: false,
    daySelectTable: false,
    nerdAlert: false,
    scatteration: 1,
    TimeTableFilter: { Courses: [], DayAndTime: [], CompressionPreference: 0 },
};



const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        StartUpHandler(state) {
            state.selectedcourses = [];
            localStorage.setItem('selectedcourses', JSON.stringify(state.selectedcourses));
        },
        initiateStartUpData(state, action) {
            state.startUpData = action.payload.uniData.data;
            localStorage.setItem('startUpData', JSON.stringify(state.startUpData));
        },
        // course reducers
        initiateCourse(state, action) {
            state.courses = action.payload.course;
            localStorage.setItem('courses', JSON.stringify(state.courses));
            state.page = state.courses?.slice(0, 10);
        },
        clearCourses(state, action) {
            state.courses = null;
            localStorage.setItem('courses', JSON.stringify(state.courses));
        },
        renderPage(state, action) {

            let pageNO = parseInt(action.payload.pageNO);
            let itemPerPage = parseInt(action.payload.itemPerPage);
            let indexStart = (pageNO * itemPerPage) - itemPerPage;
            let indexEnd = pageNO * itemPerPage;
            if (state.filteredCourses?.length) state.page = state.filteredCourses?.slice(indexStart, indexEnd);
            else state.page = state.courses?.slice(indexStart, indexEnd);
        },
        teacherSelect(state, action) {
            const courseId = action.payload.courseId;
            const teacherId = action.payload.selectedTeacherId;
            state.selectedcourses.find(course => course.courseId === courseId).instructorsIds = [teacherId];
            localStorage.setItem('selectedcourses', JSON.stringify(state.selectedcourses));
        },
        selectCourse(state, action) {
            let courseId = action.payload.courseId;
            state.courses.map(course => course.courseId === courseId ? state.selectedcourses.push({ ...course, instructors: null, instructorsNames: null }) : null);
            localStorage.setItem('selectedcourses', JSON.stringify(state.selectedcourses));
        },
        removeCourse(state, action) {
            let courseId = action.payload.courseId;
            state.selectedcourses.map((course, index) => course.courseId === courseId ? state.selectedcourses.splice(index, 1) : null);
            localStorage.setItem('selectedcourses', JSON.stringify(state.selectedcourses));
        },
        //filtering handlation
        setFiterForCourses(state, action) {
            let { filter } = action.payload;
            state.filteredCourses = state.courses.filter(course => course.title.includes(filter))
        },
        clearFilter(state, action) {
            state.filteredCourses = []
        },
        //days reducers
        daySeletViewChange(state, action) {
            state.daySelectTable = !state.daySelectTable;
        },
        selectDay(state, action) {
            let dayId = parseInt(action.payload.dayId);
            let inputType = action.payload.inputType;
            for (let day of state.days) {
                if (day.id === dayId) {
                    if (inputType === "SELECT") day.isSelected = true;
                    if (inputType === "REMOVE") day.isSelected = false;
                }
            }
        },
        setTime(state, action) {
            let Time = action.payload.enteredTime;
            let dayId = parseInt(action.payload.dayId);
            let typeOfInput = action.payload.typeOfInput;

            for (let day of state.days) {
                if (day.id === dayId) {
                    if (typeOfInput === "STARTtime") day.time[0] = Time;
                    if (typeOfInput === "ENDtime") day.time[1] = Time;
                }
            }
        },
        activeNerdAlert(state, action) {
            state.nerdAlert = !state.nerdAlert;
        },

        // Cleaners
        resetDays(state, action) {
            state.days.map(day => day.isSelected = false);
        },
        resetTime(state, action) {
            let dayId = parseInt(action.payload.dayId);
            for (let day of state.days) {
                if (day.id === dayId) {
                    day.time[1] = '';
                    day.time[2] = '';
                }
            }
        },
        //errorhandlerse
        setError(state, action) {
            let type = action.payload.type;
            if (type === "No-COURSE") state.error.noCourseModel = true;
        },
        clearError(state, action) {
            let type = action.payload.type;
            if (type === "No-COURSE") state.error.noCourseModel = false;
        },
        //more settings 
        setScatteration(state, action) {
            state.scatteration = parseInt(action.payload.value);
        },
        // final 
        createFilterForTimeTable(state, action) {
            state.TimeTableFilter.Courses = [];
            state.TimeTableFilter.DayAndTime = [];
            state.selectedcourses?.map(course => state.TimeTableFilter.Courses.push({ courseId: course.courseId, instructorIds: course.instructorsIds }));
            state.days.filter(day => day.isSelected).map(day => state.TimeTableFilter.DayAndTime.push({ day: day.id, startTime: day.time[0], endTime: day.time[1] }));
            state.TimeTableFilter.CompressionPreference = state.scatteration;
        },
    },
    extraReducers: {

    }
});

export const courseActions = courseSlice.actions;
export default courseSlice;