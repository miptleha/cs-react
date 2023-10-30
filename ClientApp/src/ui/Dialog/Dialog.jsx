import React, { useCallback, useState } from 'react';
import cl from './Dialog.module.css';

const Dialog = ({ children, visible, setVisible }) => {

  const [outsideClick, setOutsideClick] = useState(false);

  const mouseDown = () => {
    setOutsideClick(true);
  }

  const closeDialog = useCallback((e) => {
    if (!outsideClick) {
      return; //selection
    }
    setVisible(false);
    setOutsideClick(false)
  }, [setVisible, outsideClick])

  if (!visible) {
    return null;
  }

  return (
    <div className={cl.background} onClick={closeDialog} onMouseDown={mouseDown}>
      <div className={cl.dialog} onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Dialog;