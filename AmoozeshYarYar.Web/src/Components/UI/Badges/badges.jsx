
import { Fragment } from "react";
import { useEffect, useState } from 'react';


const Badges = (prop) => {
    const {variant, text , padding } = prop
    return (
        <Fragment>
            <span className={`badges badges-${variant} ${padding ? "align-badges"  : ""}`}>{text}</span>  
        </Fragment>
    );
};
export default Badges; 

// usage exampel
//<Badges variant={"info"} text={"2 روز"} /> 