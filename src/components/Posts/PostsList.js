import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title, Grid } from 'react-mdc-web/lib';
import { Link, Route, withRouter } from 'react-router-dom';
import PostCard from './PostCard';

class PostsList extends Component {
  render() {
    const { posts } = this.props;

    return (
      <main className="mdc-content posts-list">
        <main className="posts-list-int">
          <Grid>
            <Route
              key={category.path}
              path={`/${category.path}`}
              children={({ match }) => (
                { posts && posts.map(post => (
                  <PostCard post={post} key={post.id} />
                ))}
              )}
            />
          </Grid>
        </main>
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  posts: global.posts,
});

export default withRouter(connect(mapStateToProps)(PostsList));
