import './obiWan.css';
import { Fragment, useEffect, useRef } from "react";
import lottie from 'lottie-web';

const ObiWan = () => {
    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            render: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../lottie/animation_obiWan.json')
        });
    }, []);
    return (
        <Fragment>
            <div className="ObiWan" ref={container}></div>
        </Fragment>
    );
};

export default ObiWan; 