import './noAccess.css';
import { Outlet, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NoAccess = () => {
    const isloggedIn = useSelector(state => state.auth.isLoggedIn); 
    return (
        <div className="noAccess container">
            <h4><i className="bi bi-sign-do-not-enter"></i>به صفحه مورد نظر دسترسی ندارید ! </h4>
            <hr></hr>
            {
                !isloggedIn ? <p>به دلیل عدم احراز حویت حساب کاربری شما به این صفحه دسترسی ندارید در صورتی که مایل هستید به این صفحه دسترسی پیدا کنید به حساب کاربری خود وارد شوید</p> :
                    <p>به دلیل احراز حویت شما دیگر نیاز به دسترسی به صفحه مورد نظر را ندارید و  شما از هرگونه دسترسی به این صفحه منع شده اید! </p>
            }
            
            {
                !isloggedIn ? <NavLink className="" to="/authentication/login">برای ورود به حساب کاربری خود روی این لینک کلیک کنید</NavLink> :
                    <NavLink className="" to="/home">برگشت به صفحه اصلی  </NavLink>
            }

        </div>
    );
};

export default NoAccess; 