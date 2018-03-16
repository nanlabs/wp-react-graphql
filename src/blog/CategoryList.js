import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Excerpt from './Excerpt';

class CategoryList extends Component {

  render() {
    let categories = this.props.data.categories;
    let posts = [];
    let category = null;

    if (categories && categories.edges && categories.edges.length > 0) {
      category = categories.edges[0].node;
      posts = category.posts.edges;
    }
    
    return (
      <div className="post-list">
        { posts.map(post => <Excerpt key={post.node.id} post={post.node} />) }
      </div>
    );
  }

}

const GetPostsByCategory = gql`
  query GetCategoryPosts($first: Int, $where: RootCategoriesTermArgs!) {
    categories(first: $first, where: $where) {
      edges {
        node {
          id
          name
          slug
          count
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
                }
                featuredImage {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    }
  }`;

export default graphql(GetPostsByCategory, {
  options: (props) => {
    let { slug } = props.match.params;
    return {
      variables: {
        first: 1,
        where: {
          slug: slug
        }
      }
    }
  }
})(CategoryList);