import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Nav = (props) => {

  const pages = (props.data.pages && props.data.pages.items) ? props.data.pages.items : [];

  return (
    <nav>
      { pages.map(item => {
        return (
          <Link key={item.page.slug} 
                to={`/${item.page.slug}`}
                className={(props.location.pathname == `/${item.page.slug}`) ? 'active' : '' }>
            {item.page.title}
          </Link>
        );
      }) }
    </nav>
  );
};

export default graphql(gql`
  query GetFirstLevelPages {
    pages(first: 20) {
      items: edges {
        page: node {
          title
          slug
        }
      }
    }
  }
`)(withRouter(Nav));