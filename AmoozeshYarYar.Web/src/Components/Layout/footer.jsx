import './footer.css';
import { BsGoogle } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="mt-3">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-3"></div>
                <div className="col-3"><BsGoogle /></div>
            </div>
        </footer>
    );
};

export default Footer; 