import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title, Grid } from 'react-mdc-web/lib';
import PostCard from './PostCard';

class PostsList extends Component {
  render() {
    const { posts } = this.props;

    return (
      <main className="mdc-content posts-list">
        <main className="posts-list-int">
          <Grid>
            { posts && posts.map(post => (
              <PostCard post={post} key={post.id} />
            ))}
          </Grid>
        </main>
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  posts: global.posts,
});

export default connect(mapStateToProps)(PostsList);
