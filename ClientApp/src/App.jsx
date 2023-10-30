import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Posts from './pages/Posts';
import Layout from './components/Layout/Layout';
import About from './pages/About';
import './App.css';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route index={true} element={<Posts />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  )
}

export default App;
