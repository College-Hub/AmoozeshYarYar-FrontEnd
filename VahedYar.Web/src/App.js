import { Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Haeder from './Components/Layout/header';
import Footer from './Components/Layout/footer';
import Signup from './Components/Auth/signup';
//import Login from './Components/Auth/login';
//import Auth from './Components/Auth/auth';
import Home from './Components/Pages/home';
import AboutUs from './Components/Pages/aboutUs';
import Profile from './Components/Pages/profile';
import TimeTable from './Components/Pages/timeTable';
import SelectCourses from './Components/Pages/selectCourses';
import NoAccess from './Components/Errors/Pages/noAccess';
import NotFound from './Components/Errors/Pages/notFound';
import NoResponse from './Components/Errors/Requests/noResponse';
import LoadSpiner from "./Components/Animations/loadSpiner";
import './App.css';
import { useEffect } from 'react';
import { useGetUniversiyQuery } from "./feratures/api/apiSlice";
import { courseActions } from "./Store/course-slice";
import { uiActions } from './Store/ui-slice';


const App = () => {
    //const isloggedIn = useSelector(state => state.auth.isLoggedIn);
    const { startUpData } = useSelector(state => state.course);


    ////query

    const {
        data, error, isLoading
    } = useGetUniversiyQuery(undefined, { skip: startUpData ? true : false });

    // usedispatch
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(uiActions.setLoader(isLoading));
    }, []);
    
    useEffect(() => {
        if (data) {
            dispatch(courseActions.initiateStartUpData({ uniData: data }));
            dispatch(courseActions.StartUpHandler());
            dispatch(uiActions.deleteError({ type: "NO-RESPONSE" }));
        }
        else if (error) {
            dispatch(uiActions.setError({ type: "NO-RESPONSE" }));
           
        }
        dispatch(uiActions.setLoader(isLoading));
    }, [isLoading]);

    if (isLoading) {
        
    }
    if (error) {
        
    }

    return (
        <Fragment>
        <Haeder />
            <Fragment>
                <main className="container-sm">
                    <Routes>
                        <Route path='/' element={<Navigate to='/home' />} ></Route>
                        <Route path='/home' element={<Home />} ></Route>
                        <Route path='/aboutUs' element={<AboutUs />} ></Route>
                        {/*<Route path='/authentication/*' element={isloggedIn ? <Auth /> : <NoAccess />} >*/}
                        {/*    <Route path='login' element={ <Login /> } />*/}
                        {/*    <Route path='signup' element={<Signup />} />*/}
                        {/*</Route>*/}
                        {/* <Route path='/profile' element={isloggedIn ? <Profile /> : <NoAccess />} ></Route>*/}
                        <Route path='/selectCourses' element={<SelectCourses />} ></Route>
                        <Route path='/timetable' element={<TimeTable />} ></Route>
                        <Route path='/Register' element={<Signup />} ></Route>
                        <Route path='/NotFound' element={<NoResponse />} ></Route>
                        <Route path='/*' element={<NotFound />} ></Route>
                    </Routes>
                </main>
            </Fragment>  
        <Footer />   
        </Fragment>
    

    );
};

export default App;
