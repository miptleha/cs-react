import React from 'react';
import cl from './Loader.module.css';

const Loader = ({ visible }) => {
    if (!visible) {
        return null;
    }

    return (<div className={cl.loader}></div>);
}

export default Loader;