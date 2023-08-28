 import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { uiActions, } from "../../Store/ui-slice";
import { BsHouse, BsChatLeftHeart } from "react-icons/bs";
import './header.css';


const Haeder = () => {
    // states 
    const expandNavbar = useSelector(state => state.ui.expandNavbar);
    /*const isloggedIn = useSelector(state => state.auth.isLoggedIn);*/

    // Hooks
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(location.pathname);
    }, [location])

    // event handlers
    const expandNavbarHandler = () => {
        dispatch(uiActions.NavbarToggler({ }));
    }
    return (
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <div className={"col-6 col-lg-1 custome-brand"}><NavLink className={"nav-brand"} aria-current="page" to='/'>آموزشیاریار</NavLink></div>
                    <div className={"col-6 d-flex d-lg-none justify-content-end toggle-icon"}>
                        <i className="bi bi-grid-fill" data-toggle="tooltip" data-placement="top" data-title="Tooltip on top" onClick={expandNavbarHandler}></i>
                    </div>
                    <div className={!expandNavbar ? "col-6 d-none d-lg-block" : "col-12 col-lg-6 d-inline-block"} >
                        <ul className="navbar-nav d-flex">
                            <li className={location.pathname === '/home' ? "nav-item flex-fill" : "nav-item" }>
                                <NavLink className={"nav-link custome-link"} aria-current="page" to='/home'><BsHouse />  صفحه اصلی</NavLink>
                            </li>
                            <li className={location.pathname === '/aboutUs' ? "nav-item flex-fill" : "nav-item"}>
                                <NavLink className={"nav-link custome-link"} aria-current="page" to='/aboutUs'><BsChatLeftHeart /> درباره ما</NavLink>
                            </li>


                            {/*{isloggedIn && <li className="nav-item"><NavLink className={"nav-link custome-link"} aria-current="page" to='/profile'><i className="bi bi-person-vcard"></i> &nbsp; پروفایل</NavLink></li>}*/}              
                            {/*<li className="nav-item d-block d-lg-none">*/}
                            {/*        {isloggedIn ? <NavLink className={"nav-link custome-link "} aria-current="page" to='/home'><i className="bi bi-box-arrow-left"></i> &nbsp; خروج</NavLink> :*/}
                            {/*            <NavLink className={"nav-link custome-link"} aria-current="page" to='/authentication/login'> <i className="bi bi-box-arrow-in-right"></i> &nbsp; ورود</NavLink>}           */}
                            {/*</li>*/}
                        </ul>
                    </div>
                    <div className={"col-4 justify-content-end d-none d-lg-flex"}>
                    {/*    {isloggedIn ? <NavLink className={"nav-link custome-link"} aria-current="page" to='/home'><i className="bi bi-box-arrow-left"></i> &nbsp; خروج</NavLink> :*/}
                    {/*        <NavLink className={"nav-link custome-link"} aria-current="page" to='/authentication/login'> <i className="bi bi-box-arrow-in-right"></i> &nbsp; ورود</NavLink>}*/}
                    </div>  
                    
                </div>               
            </nav>
        </header>
    );
};

export default Haeder; 