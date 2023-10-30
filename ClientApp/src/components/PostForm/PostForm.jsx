import React, { useCallback, useState } from 'react';
import Button from '../../ui/Button/Button';
import cl from './PostForm.module.css';

const styleError = (error, name) => {
  return error.name === name ? { outline: "1px solid red" } : {}
}

const emptyError = { name: "", text: "" };
const emptyPost = { title: "", body: "" };

const PostForm = ({okAction, cancelAction, state}) => {

  const [post, setPost] = useState(state.post);
  const [error, setError] = useState(emptyError);

  const onOk = useCallback((e) => {
    if (post.title === "") {
      setError({ name: "title", text: "Enter title" });
      return;
    } else if (post.body === "") {
      setError({ name: "body", text: "Enter text" });
      return;
    } else {
      setError(emptyError)
    }

    okAction(post)
    setPost(emptyPost)
  }, [post, setPost, okAction])

  const onCancel = useCallback((e) => {
    cancelAction()
    setPost(emptyPost)
  }, [setPost, cancelAction])

  const onChange = useCallback((e) => {
    setError(emptyError)

    const c = e.target;
    setPost({ ...post, [c.name]: c.value })
  }, [post, setPost, setError])

  const disabled = state.action === "Delete";

  return (<>
    <h2>{state.action} post</h2>
    <div>
      <div>
        <input className={cl.title} disabled={disabled} type="text" style={styleError(error, "title")} name="title" value={post.title} placeholder="Enter title" onChange={onChange} />
      </div>
      <div>
        <textarea className={cl.body} disabled={disabled} type="memo" style={styleError(error, "body")} name="body" placeholder="Enter text" rows="5" value={post.body} onChange={onChange}></textarea>
      </div>
      <div className={cl.error}>{error.text}&nbsp;</div>
      <div>
        <Button className={cl.ok_btn} onClick={onOk} icon="check2-circle">{state.action}</Button>
        <Button onClick={onCancel} icon="x-octagon">Close</Button>
      </div>
    </div>
  </>)
}

export default PostForm;