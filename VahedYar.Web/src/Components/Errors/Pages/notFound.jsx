import './notFound.css';
import { Outlet, NavLink,  } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="error-container">
            <div className="notFound container">
                <h4><i className="bi bi-x-circle"></i>صفحه مورد نظر پیدا نشد !</h4>
                <hr></hr>
                <p>صفحه ای با آدرس مورد نظر پیدا نشده است لطفا از درستی آدرس وارد شده اطمینان حاصل کنید</p>
                <NavLink className="" to="/home">برای برگشت به صفحه اصلی رو این لینک کلیک کنید</NavLink>
            </div>
        </div>
        
    );
};

export default NotFound; 