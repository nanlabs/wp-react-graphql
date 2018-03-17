import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Nav = (props) => {

  const { loading, pages } = props.data;

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  if (pages.items) {
    return (
      <nav>
        { pages.items.map(item => {
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
  }

  return (<div>No pages</div>);

};

export default graphql(gql`
  query GetFirstLevelPages {
    pages(first: 100, where: {
      orderby: {
        field: DATE,
        order: ASC
      }
    }) {
      items: edges {
        page: node {
          title
          slug
        }
      }
    }
  }
`)(withRouter(Nav));