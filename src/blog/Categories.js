import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, withRouter } from 'react-router-dom';

const Categories = (props) => {

  const categories = (props.data.categories && props.data.categories.items) ? props.data.categories.items : [];

  return (
    <nav>
      { categories.map(item => {
        return (
          <Link key={item.category.slug} 
                to={{
                  pathname: `/blog/category/${item.category.slug}`
                }}>
            {item.category.name}
          </Link>
        );
      }) }
    </nav>
  );
};

export default graphql(gql`
  query GetBlogCategories {
    categories {
      items: edges {
        category: node {
          id
          name
          link
          slug
        }
      }
    }
  }
`)(withRouter(Categories));