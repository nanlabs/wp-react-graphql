import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toDate } from '../commons/Dates';

class Excerpt extends Component {

  render() {

    return (
      <div className="excerpt">
        <Link to={{
              pathname: `/blog/post/${this.props.post.slug}`
            }}>
          { this.props.post.featuredImage && <img src={this.props.post.featuredImage.sourceUrl} className="thumbnail" />}
          <div className="excerpt-meta">
            <h2>{this.props.post.title}</h2>
            <time>{toDate(this.props.post.date)}</time>
            <div className="content" dangerouslySetInnerHTML={{__html: this.props.post.excerpt}}></div>
          </div>
        </Link>
      </div>
    );
  }

}

export default Excerpt;
