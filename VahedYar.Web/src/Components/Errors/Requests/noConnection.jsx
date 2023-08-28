import './noConnection.css';
import { Outlet, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NoConnection = () => {
    return (
        <div className="noConnection container">
            <h4><i className="bi bi-sign-do-not-enter"></i>ارتباط شما قطع شده است ! </h4>
            <hr></hr>
            <p>ارتباطت با سرور قطع شده است برای دسترسی به صفحه مورد نظرت از اتصال خودت به اینترنت مطمئن شی. درصورتی مشکل رفع نشد بعد از چند دقیقه دوباره امتحان کن </p>
            <NavLink className="" to="/home">برگشت به صفحه اصلی  </NavLink>
        </div>
    );
};

export default NoConnection; 