import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Excerpt extends Component {

  render() {

    return (
      <div className="excerpt">
        <Link to={{
              pathname: `/blog/post/${this.props.post.slug}`
            }}>
          { this.props.post.featuredImage && <img src={this.props.post.featuredImage.sourceUrl} />}
          <h2>{this.props.post.title}</h2>
          <h3>{this.props.post.author.name}</h3>
          <time>{this.props.post.date}</time>
          <div className="content" dangerouslySetInnerHTML={{__html: this.props.post.excerpt}}></div>
        </Link>
      </div>
    );
  }

}

export default Excerpt;
