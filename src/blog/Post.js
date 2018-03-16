import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { sanitize } from '../commons/HtmlSanitizer';

const Post = (props) => (
  <div>
    <h1>{(props.data.post) ? props.data.post.title : '-'}</h1>
    <div className="content" dangerouslySetInnerHTML={{__html: (props.data.post) ? sanitize(props.data.post.content) : ''}}></div>
  </div>
);

const GetPostBySlug = gql`
  query GetPostBySlug($slug: String) {
    post: postBy(slug: $slug) {
      id
      title
      date
      slug
      uri
      featuredImage {
        id
        sourceUrl
      }
      author {
        name
      }
      excerpt
      content
    }
  }`;

export default graphql(GetPostBySlug, {
  options: (props) => {
    return {
      variables: {
        slug: props.match.params.slug
      }
    }
  }
  // options: ({ match }) => ({ variables: { slug: match.params.slug } })
})(Post);