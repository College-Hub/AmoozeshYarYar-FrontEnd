 import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { uiActions, } from "../../Store/ui-slice";
import { BsHouse, BsChatLeftHeart } from "react-icons/bs";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCookies } from 'react-cookie';
import './header.css';
import { FaUserAstronaut, FaRegUser } from "react-icons/fa6";
import { BsBoxArrowLeft, BsBoxArrowInLeft } from "react-icons/bs";
import { Fragment } from 'react';
import { authActions } from '../../Store/auth-slice';
import { useLogoutQuery } from '../../feratures/api/apiSlice';

const Haeder = () => {
    // states 
    const expandNavbar = useSelector(state => state.ui.expandNavbar);
    const { token } = useSelector(state => state.auth);
    const [expandNav, setExpandNav] = useState(false)
    /*const isloggedIn = useSelector(state => state.auth.isLoggedIn);*/

    // Hooks
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const buttonRef = useRef(null);
    const [cookies, setCookie, removeCookie] = useCookies(['JWT']);
    const { data, isLoading, isError, refetch } = useLogoutQuery({ skip: true });

    useEffect(() => {
        
    }, [location])

    // event handlers
    const goToAuthHandler = () => {
        dispatch(authActions.setLastPageUrl(location.pathname))
    };
    const expandNavbarHandler = () => {
        buttonRef.current.click();
        setExpandNav(!expandNav)
    }
    const logoutHandler = () => {
        dispatch(authActions.clearToken());
        refetch();
        removeCookie('JWT', { path: '/' });
        navigate("/home");
    }
    return (
        <header>
            <Navbar collapseOnSelect expand="md" className="container-fluid p-4 pt-1" dir={""}>
                
                <Navbar.Brand>
                    <NavLink className={"brand"} aria-current="page" to='/home'><img src="/Logo.png" alt="Logo" /></NavLink>                    
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" ref={buttonRef} className={"d-none" } />
                    <div className={"col-6 d-flex d-md-none justify-content-end toggle-icon"}>

                        <i className={expandNav ?"bi bi-grid-fill open" : "bi bi-grid-fill"} onClick={expandNavbarHandler}></i>
                    </div>
                    <Navbar.Collapse  id="responsive-navbar-nav">
                        <Nav className="me-auto" dir={"ltr"} >
                            <ul className="navbar-nav d-flex">
                                <li className={location.pathname === '/aboutUs' ? "nav-item flex-fill" : "nav-item"}>
                                <NavLink className={"nav-link custome-link d-md-none"} onClick={expandNavbarHandler} aria-current="page" to='/aboutUs'><BsChatLeftHeart /> درباره ما</NavLink>
                                <NavLink className={"nav-link custome-link d-none d-md-block"} aria-current="page" to='/aboutUs'><BsChatLeftHeart /> درباره ما</NavLink>
                                </li>
                                <li className={location.pathname === '/home' ? "nav-item flex-fill" : "nav-item" }>
                                <NavLink className={"nav-link custome-link d-md-none"} onClick={expandNavbarHandler} aria-current="page" to='/home'><BsHouse />  صفحه اصلی</NavLink>
                                <NavLink className={"nav-link custome-link d-none d-md-block"} aria-current="page" to='/home'><BsHouse />  صفحه اصلی</NavLink>
                                </li>
                                {
                                false ? (
                                    <li className={location.pathname === '/home' ? "nav-item d-md-none flex-fill" : "nav-item d-md-none"}>
                                        <NavLink className={"nav-link custome-link"} aria-current="page" to='/home' onClick={expandNavbarHandler}>  خروج</NavLink>
                                    </li>
                                    ) : (
                                    <Fragment>
                                        <li className={location.pathname === '/home' ? "nav-item d-md-none flex-fill " : " d-md-none nav-item"}>
                                                <NavLink className={"nav-link custome-link"} aria-current="page" to='/authentication/login' onClick={expandNavbarHandler}>  ورود  </NavLink>
                                        </li >
                                        <li className={location.pathname === '/home' ? "nav-item d-md-none flex-fill" : "nav-item d-md-none"}>
                                                <NavLink className={"nav-link custome-link"} aria-current="page" to='/authentication/signup' onClick={expandNavbarHandler}>  ثبت نام</NavLink>
                                        </li>
                                    </Fragment>
                                    ) 
                                }

                            </ul>
                    </Nav>
                    <Nav dir={"ltr"} >
                        <div className={"justify-content-start w-100 account-icon d-none d-md-block"}>
                            {
                                token ? <BsBoxArrowLeft onClick={logoutHandler} /> : <NavLink className={""} aria-current="page" to='/authentication/login' onClick={goToAuthHandler}><BsBoxArrowInLeft /></NavLink>
                            }
                        </div>
                    </Nav>
                    </Navbar.Collapse>
                
            </Navbar>
        </header>
    );
};

export default Haeder; 