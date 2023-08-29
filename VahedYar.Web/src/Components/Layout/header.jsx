 import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { uiActions, } from "../../Store/ui-slice";
import { BsHouse, BsChatLeftHeart } from "react-icons/bs";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './header.css';
import { FaUserAstronaut, FaRegUser } from "react-icons/fa6";
import { Fragment } from 'react';

const Haeder = () => {
    // states 
    const expandNavbar = useSelector(state => state.ui.expandNavbar);
    const [expandNav, setExpandNav] = useState(false)
    /*const isloggedIn = useSelector(state => state.auth.isLoggedIn);*/

    // Hooks
    const location = useLocation();
    const dispatch = useDispatch();
    const buttonRef = useRef(null);

    useEffect(() => {
        console.log(location.pathname);
    }, [location])

    // event handlers
    const expandNavbarHandler = () => {
        buttonRef.current.click();
        setExpandNav(!expandNav)
    }
    return (
        <header>
            <Navbar collapseOnSelect expand="lg" className="container-fluid p-4 pt-1" dir={""}>
                
                <Navbar.Brand>
                    <NavLink className={"brand"} aria-current="page" to='/home'><img src="/Logo.png" alt="Logo" /></NavLink>                    
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" ref={buttonRef} className={"d-none" } />
                    <div className={"col-6 d-flex d-lg-none justify-content-end toggle-icon"}>

                        <i className={expandNav ?"bi bi-grid-fill open" : "bi bi-grid-fill"} onClick={expandNavbarHandler}></i>
                    </div>
                    <Navbar.Collapse  id="responsive-navbar-nav">
                        <Nav className="me-auto" dir={"ltr"} >
                            <ul className="navbar-nav d-flex">
                                <li className={location.pathname === '/aboutUs' ? "nav-item flex-fill" : "nav-item"}>
                                    <NavLink className={"nav-link custome-link"} aria-current="page" to='/aboutUs'><BsChatLeftHeart /> درباره ما</NavLink>
                                </li>
                                <li className={location.pathname === '/home' ? "nav-item flex-fill" : "nav-item" }>
                                    <NavLink className={"nav-link custome-link"} aria-current="page" to='/home'><BsHouse />  صفحه اصلی</NavLink>
                                </li>
                                {/*{*/}
                                {/*false ? (*/}
                                {/*    <li className={location.pathname === '/home' ? "nav-item d-lg-none flex-fill" : "nav-item d-lg-none"}>*/}
                                {/*        <NavLink className={"nav-link custome-link"} aria-current="page" to='/home'>  خروج</NavLink>*/}
                                {/*    </li>*/}
                                {/*    ) : (*/}
                                {/*    <Fragment>*/}
                                {/*        <li className={location.pathname === '/home' ? "nav-item d-lg-none flex-fill " : " d-lg-none nav-item"}>*/}
                                {/*            <NavLink className={"nav-link custome-link"} aria-current="page" to='/login'>  ورود  </NavLink>*/}
                                {/*        </li >*/}
                                {/*        <li className={location.pathname === '/home' ? "nav-item d-lg-none flex-fill" : "nav-item d-lg-none"}>*/}
                                {/*            <NavLink className={"nav-link custome-link"} aria-current="page" to='/signup'>  ثبت نام</NavLink>*/}
                                {/*        </li>*/}
                                {/*    </Fragment>*/}
                                {/*    ) */}
                                {/*}*/}

                            </ul>
                    </Nav>
                    <Nav dir={"ltr"} >
                        {/*<Dropdown autoClose="outside" className={"d-none d-lg-block"}>*/}
                        {/*    <Dropdown.Toggle id="dropdown-button-dark-example1" className={"nav-link custome-link-user" }>*/}
                        {/*            <FaUserAstronaut />*/}
                        {/*    </Dropdown.Toggle>*/}
                        {/*    <Dropdown.Menu dir={"rtl"}>*/}
                        {/*        {*/}
                        {/*            false ? (*/}
                        {/*                <NavLink className={"d-block text-end"} dir="rtl" aria-current="page" to='/'></NavLink>*/}
                        {/*            ) : (*/}
                        {/*                <Fragment>*/}
                        {/*                   <NavLink className={"d-block text-end p-2"} dir="rtl" aria-current="page" to='/'>ورود  </NavLink>*/}
                        {/*                    <NavLink className={"d-block text-end p-2"} dir="rtl" aria-current="page" to='/'>ثبت نام</NavLink>*/}
                        {/*                </Fragment>*/}
                                        
                        {/*            )*/}
                        {/*        }                               */}
                        {/*    </Dropdown.Menu>*/}
                        {/*</Dropdown>*/}
                        </Nav>
                    </Navbar.Collapse>
                
            </Navbar>
        </header>
    );
};

export default Haeder; 