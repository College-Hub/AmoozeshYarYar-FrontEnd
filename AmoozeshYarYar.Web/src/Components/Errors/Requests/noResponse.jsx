import './noResponse.css';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NoResponse = () => {
    const navigate = useNavigate();
    const ReloadHandler = () => {
        navigate(0);
    }
    return (
        <div className="noResponse container">
            <h4><i className="bi bi-heartbreak"></i>سرور در دسترس نیست! </h4>
            <hr></hr>
            <p>سرور جوابی به درخواستت نمیده. نمی‌دونیم چرا!  (احتمالا دیگه دوسِت نداره <i className="bi  bi-emoji-smile"></i>) </p>
            <p>برو دوراتو بزن دوباره بیا؛ شاید نظرش عوض شد.</p>
            <NavLink className="" onClick={ReloadHandler}>غرورتو زیر پا بذار و دوباره درخواست بده!</NavLink>
        </div>
    );
};

export default NoResponse; 