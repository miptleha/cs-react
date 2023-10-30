import React from 'react';
import cl from './Button.module.css';

const Button = ({ children, ...props }) => {
  const className = `${cl.btn} ${props.className}`;
  const { icon, ...restProps } = props;
  return (
    <button {...restProps} className={className}>
      {icon && (<i className={`bi bi-${icon} ${cl.icon}`}></i>)}
      {children}
    </button>
  )
}

export default Button;