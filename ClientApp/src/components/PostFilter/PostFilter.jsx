import React, { useCallback } from 'react';
import Button from '../../ui/Button/Button';
import cl from './PostFilter.module.css';

const PostFilter = ({ filter, setFilter, compareList, showForm }) => {
  const changeFilter = useCallback((e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  }, [setFilter, filter]);

  const addPost = useCallback(() => {
    showForm({ action: "Add", post: { title: "", body: "" } })
  }, [showForm])

  return (
    <>
      <div>
        <select className={cl.item} value={filter.sort} name="sort" onChange={changeFilter}>
          {compareList.map(i => (<option key={i.value} value={i.value}>{i.text}</option>))}
        </select>
        <input className={cl.item} type="text" name="search" placeholder="filter" value={filter.search} onChange={changeFilter} />
        <Button className={cl.item} onClick={addPost} icon="plus-circle">Add post</Button>
      </div>
    </>
  )
}

export default PostFilter;