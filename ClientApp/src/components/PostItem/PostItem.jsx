import React, { useCallback } from 'react';
import Button from '../../ui/Button/Button';
import cl from './PostItem.module.css';

const PostItem = ({ item, showForm }) => {

  const editClick = useCallback(() => {
    showForm({action: "Edit", post: item})
  }, [showForm, item])

  const deleteClick = useCallback(() => {
    showForm({action: "Delete", post: item})
  }, [showForm, item])
  return (
    <>
      <div className={cl.posts}>
        <div className={cl.post}>
          <div className={cl.title}>{item.title}</div>
          <div className={cl.text}>{item.body}</div>
          <div className={cl.date}>{item.date.toLocaleString()}</div>
        </div>
        <div className={cl.btns}>
          <Button className={cl.first_btn} onClick={editClick} icon="pencil">Edit</Button>
          <Button onClick={deleteClick} icon="dash-circle">Delete</Button>
        </div>
      </div>
    </>
  )
}

export default PostItem;