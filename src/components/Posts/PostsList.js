import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title, Grid } from 'react-mdc-web/lib';
import { Link, Route, withRouter } from 'react-router-dom';
import PostCard from './PostCard';

class PostsList extends Component {
  
  state = {
    sort: 'voteScore',
  }
  
  
  sortPosts = (posts, method) => {
    let filteredPosts = posts;
    if (filteredPosts) {
      filteredPosts = filteredPosts.sort((a, b) => (b[method] - a[method]));
    }
    return filteredPosts;
  }

  render() {
    const { posts, match } = this.props;

    //const category = ((match.params || '').category || '');
    let filteredPosts = this.sortPosts(posts, this.state.sort);
    // if (category && posts) {
    //   filteredPosts = posts.filter(post => post.category === category);
    // }

    return (
      <main className="mdc-content posts-list">
        <main className="posts-list-int">
          <Grid>
            { filteredPosts && filteredPosts.map(post => (
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

export default withRouter(connect(mapStateToProps)(PostsList));
