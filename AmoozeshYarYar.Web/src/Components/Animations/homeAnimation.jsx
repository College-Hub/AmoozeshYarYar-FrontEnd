import './homeAnimation.css';
import { Fragment, useEffect, useRef } from "react";
import lottie from 'lottie-web';

const HomeAnimation = () => {
    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            render: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../lottie/animation_person.json')
        });

    }, []);

    return (
        <Fragment>
            <div className="person" ref={container}></div>            
        </Fragment>
    );
};

export default HomeAnimation; 