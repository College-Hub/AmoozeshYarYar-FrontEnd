import './loadSpiner.css';
import { Fragment, useEffect, useRef } from "react";
import lottie from 'lottie-web';

const LoadSpiner = () => {
    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            render: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../lottie/animation_bookSpiner.json')
        });

    }, []);

    return (
        <Fragment>
            <div className="load-spiner-container">
                <div className="load-spiner-book" ref={container}></div>
            </div>
        </Fragment>
    );
};

export default LoadSpiner; 