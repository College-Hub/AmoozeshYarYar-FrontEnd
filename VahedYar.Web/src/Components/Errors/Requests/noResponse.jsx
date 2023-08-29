import './noResponse.css';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';



const NoResponse = () => {
    const navigate = useNavigate();

    return (
        <div className="noResponse-container ">
            <div className="noResponse container">
                <h4><i className="bi bi-heartbreak"></i>سرور در دسترس نیست! </h4>
                <hr></hr>
                <p>سرور جوابی به درخواستت نمیده. نمی‌دونیم چرا!  (احتمالا دیگه دوسِت نداره <i className="bi  bi-emoji-smile"></i>) </p>
                <p>برو دوراتو بزن دوباره بیا؛ شاید نظرش عوض شد.</p>
                <NavLink to="/" className="">بازگشت به صفحه اصلی </NavLink>
            </div>
        </div>
    );
};

export default NoResponse; 