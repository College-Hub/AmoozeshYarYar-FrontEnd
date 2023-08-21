import { Fragment } from 'react';
import './aboutUs.css';
import ObiWan from "../Animations/obiWan";

const AboutUs = () => {

    return (
        <Fragment>
            <section id="aboutUs">
                <div className="row">
                    <h4>سلام!</h4>
                    <div className="col-12 col-md-6"></div>
                    <div className="obiWan-Container"><ObiWan /></div>
                </div>
            </section>
        </Fragment>
    );
};

export default AboutUs; 