import React from 'react';
import cl from './Notify.module.css';

const Notify = ({text, setText}) => {

  const closeAction = () => {
    setText("");
  }

  if (!text) {
    return null;
  }

  return (
    <div className={`${cl.notify} alert alert-danger`} role="alert">
      <i className={`${cl.close} bi bi-x-circle`} onClick={closeAction}></i>
      <pre>{text}</pre>
    </div>
  )
}

export default Notify;