import React from 'react';
import cl from './Pages.module.css';

const Pages = ({ count, active, setActive }) => {
  if (count <= 2) {
    return;
  }

  return (
    <div className={cl.pages} >
      {[...Array(count)].map((e, i) => (<span key={i} className={i === active ? [cl.item, cl.active].join(" ") : cl.item} onClick={() => setActive(i)}>{i + 1}</span>))}
    </div>
  )
}

export default Pages;