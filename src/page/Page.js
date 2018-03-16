import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { sanitize } from '../commons/HtmlSanitizer';

class Page extends Component {

  render() {
    const props = this.props;

    return (
      <div className="page">
        <h1>{(props.data.page) ? props.data.page.title : '-'}</h1>
        <div id="page-content" className="content" dangerouslySetInnerHTML={{
          __html: (props.data.page) ? sanitize(props.data.page.content) : ''
        }}></div>
      </div>
    );
  }

  componentDidUpdate() {
    let pageContent = document.getElementById('page-content');
    let links = Array.from(pageContent.querySelectorAll('a'));
    links.map( (node) => node.onclick = this.onLinkClicked.bind(this) );
  }

  onLinkClicked(event) {
    event.preventDefault();
    this.props.history.push(event.currentTarget.pathname);
  }
}

const GetPageBySlug = gql`
  query GetPageBySlug($slug: String) {
    page: pageBy(uri: $slug) {
      id
      title
      slug
      date
      content
    }
  }`;

export default graphql(GetPageBySlug, {
  options: (props) => {
    
    let { slug, parent } = props.match.params;
    if (parent) {
      slug = `${parent}/${slug}`
    }

    return {
      variables: {
        slug
      }
    }
  }
})(Page);