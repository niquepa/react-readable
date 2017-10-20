import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title } from 'react-mdc-web/lib';

class PostsList extends Component {
  
  render() {
    const { posts } = this.props;
    
    return (
      <div>
        { posts && posts.map(post => (
          <Title>{post.title}</Title>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  posts: global.posts,
});

export default connect(mapStateToProps)(PostsList);