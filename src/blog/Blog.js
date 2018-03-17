import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Categories from './Categories';
import Post from './Post';
import List from './List';
import CategoryList from './CategoryList';

const Blog = ({ match }) => (
  <div className="blog">
    <div>
      <h4>Categories</h4>
      <Categories />
    </div>
    <Switch>
      <Route path={`/blog/post/:slug`} component={Post} />
      <Route path={`/blog/category/:slug`} component={CategoryList} />
      <Route path={`/blog`} component={List} />
    </Switch>
  </div>
);

export default Blog;
