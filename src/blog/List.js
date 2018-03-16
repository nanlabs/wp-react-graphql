import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Excerpt from './Excerpt';

class List extends Component {

  render() {
    let { loading, error, posts, fetchMore, loadMoreEntries } = this.props;

    if (loading) {
      return (
        <div>Loading...</div>
      );
    }

    if (error) {
      console.error(error);
    }
    
    return (
      <div>
        <div className="post-list">
          { posts.edges.map(post => <Excerpt key={post.node.slug} post={post.node} />) }
          { posts.pageInfo.hasNextPage && <button onClick={loadMoreEntries}>Load More</button> }
        </div>
      </div>
    );
  }

}

// For pagination reference go here:
// https://www.apollographql.com/docs/react/recipes/pagination.html#relay-cursors

const PaginatedPostsQuery = gql`
  query PaginatedPosts($cursor: String) {
    posts(first: 6, after: $cursor) {
      edges {
        cursor
        node {
          title
          date
          excerpt
          slug
          featuredImage {
            sourceUrl
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
    }
  }
`;

export default graphql(PaginatedPostsQuery, {
  // This function re-runs every time `data` changes, including after `updateQuery`,
  // meaning our loadMoreEntries function will always have the right cursor
  props({ data: { loading, posts, fetchMore } }) {
    return {
      loading,
      posts,
      loadMoreEntries: () => {
        return fetchMore({
          query: PaginatedPostsQuery,
          variables: {
            cursor: posts.pageInfo.endCursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.posts.edges;
            const pageInfo = fetchMoreResult.posts.pageInfo;

            return {
              // Put the new posts at the end of the list and update `pageInfo`
              // so we have the new `endCursor` and `hasNextPage` values
              posts: {
                __typename: previousResult.posts.__typename,
                edges: [...previousResult.posts.edges, ...newEdges],
                pageInfo,
              }
            };

          },
        });
      },
    };
  },
})(List);