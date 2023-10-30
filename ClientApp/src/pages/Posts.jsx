import React, { useCallback, useState, useEffect, useMemo } from 'react';
import PostFilter from '../components/PostFilter/PostFilter';
import PostForm from '../components/PostForm/PostForm';
import PostList from '../components/PostList/PostList';
import Dialog from '../ui/Dialog/Dialog';
import Notify from '../ui/Notify/Notify';
import Pages from '../ui/Pages/Pages';
import { fetchData, postData } from '../utils/api';

const compareList = [
  { value: "new", text: "Newest" },
  { value: "old", text: "Oldest" },
  { value: "asc", text: "Title: A - Z" },
  { value: "desc", text: "Title: Z - A" },
]

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: "new", search: "" });
  const [formState, setFormState] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notify, setNotify] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [activePage, setActivePage] = useState(0);
  const [perPage] = useState(5);

  const getData = useCallback(() => {
    postData('api/posts/getposts', { start: activePage * perPage, count: perPage, filter: filter }, (data) => {
      setPosts(data.posts);
      setTotalPages(Math.ceil(data.total / perPage));
      setIsLoading(false);
    }, (err) => {
      setIsLoading(false);
      setNotify(err);
    })
  }, [activePage, filter, perPage]);

  useEffect(() => {
    getData();
  }, [getData])

  const formAction = useCallback((post) => {
    setFormVisible(false)
    if (!formState) {
      return;
    }
    if (formState.action === "Add") {
      let p = { ...post, id: Date.now().toString(), date: new Date() }
      setPosts([...posts, p]);
      postData('api/posts/add', p, null, (err) => { setNotify(err) });
    } else if (formState.action === "Edit") {
      let p = posts.find(p => p.id === post.id);
      p.title = post.title;
      p.body = post.body;
      setPosts([...posts]);
      postData('api/posts/edit', p, null, (err) => { setNotify(err) });
    } else if (formState.action === "Delete") {
      setPosts(posts.filter(p => p.id !== post.id));
      fetchData(`api/posts/delete?id=${post.id}`, null, (err) => { setNotify(err) })
    } else {
      console.log(`Unknown form state: '${formState.action}'`)
    }
    getData()
    setActivePage(0)
  }, [posts, formState, getData, setActivePage]);

  const showForm = useCallback((state) => {
    setFormState(state)
    setFormVisible(true)
  }, [setFormState, setFormVisible])

  const closeForm = useCallback(() => {
    setFormVisible(false)
  }, [setFormVisible])

  const setFilterExt = useCallback((f) => {
    setFilter(f)
    setActivePage(0)
  }, [setFilter, setActivePage])

  const posts2 = useMemo(() => {
    if (isLoading) {
      return []
    }
    const dated = posts.map(p => ({ ...p, date: p.date instanceof Date ? p.date : new Date(p.date) }));
    return dated;
  }, [posts, isLoading])

  return (
    <>
      <Dialog visible={formVisible} setVisible={setFormVisible}>
        <PostForm okAction={formAction} cancelAction={closeForm} state={formState} />
      </Dialog>

      <h1 className="header">Posts</h1>
      <PostFilter filter={filter} setFilter={setFilterExt} compareList={compareList} showForm={showForm} />
      <PostList posts={posts2} showForm={showForm} />
      <Pages count={totalPages} active={activePage} setActive={setActivePage} />

      <Notify text={notify} setText={setNotify} />
    </>
  )
}

export default Posts;
