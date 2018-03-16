import React from 'react';
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import Nav from './page/Nav';
import Page from './page/Page';
import Blog from './blog/Blog';

const App = () => (
  <div className="container">
    <Nav />
    <Switch>
      <Route path="/blog" component={Blog} />
      <Route path="/:parent/:slug" component={Page} />
      <Route path="/:slug" component={Page} />
      <Redirect to="/home" />
    </Switch>
  </div>
);

export default App;
