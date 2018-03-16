import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Excerpt from './Excerpt';

class List extends Component {

  render() {
    let posts = [];
    if (this.props.data.posts) {
      posts = this.props.data.posts.edges;
    }
    
    return (
      <div className="post-list">
        { posts.map(post => <Excerpt key={post.node.id} post={post.node} />) }
      </div>
    );
  }

}

export default graphql(gql`
  {
    posts {
      edges {
        node {
          id
          title
          date
          excerpt
          slug
          author {
            name
            avatar {
              url
            }
          }
          featuredImage {
            sourceUrl
          }
        }
      }
    }
  }
`)(List);
