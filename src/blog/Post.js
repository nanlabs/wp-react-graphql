import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { sanitize } from '../commons/HtmlSanitizer';

const Post = (props) => {
  const { post, loading } = props.data;
  if (loading) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <div className="post">
      { post.featuredImage && <img src={post.featuredImage.sourceUrl} className="featured-img" />}
      <div className="post-content">
        <h1>{post.title}</h1>
        <div className="content" dangerouslySetInnerHTML={{__html: sanitize(post.content)}}></div>
      </div>
    </div>
  );
}

const GetPostBySlug = gql`
  query GetPostBySlug($slug: String) {
    post: postBy(slug: $slug) {
      id
      title
      date
      slug
      uri
      featuredImage {
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