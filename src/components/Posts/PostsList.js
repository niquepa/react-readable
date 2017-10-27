import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title, Grid, RadioGroup, Radio } from 'react-mdc-web/lib';
import { withRouter } from 'react-router-dom';
import { fetchPosts } from '../../actions/index';
import PostCard from './PostCard';

class PostsList extends Component {
  state = {
    sort: 'voteScore',
  }

  componentDidMount() {
    this.props.getPosts(this.props.match.path.replace('/', ''));
  }

  sortPosts = (posts, method) => {
    let filteredPosts = posts;
    if (filteredPosts) {
      filteredPosts = filteredPosts.sort((a, b) => (b[method] - a[method]));
    }
    return filteredPosts;
  }

  render() {
    const { posts } = this.props;

    const filteredPosts = this.sortPosts(posts, this.state.sort);

    return (
      <main className="mdc-content posts-list">
        <main className="posts-list-int">
          <RadioGroup
            onChange={({ target: { value } }) => { this.setState({ sort: value }); }}
            name="saturn"
            value={this.state.sort}
          >
            <Radio value="voteScore">Votes</Radio>
            <Radio value="timestamp">Date</Radio>
            <Radio value="commentCount">Comments</Radio>
          </RadioGroup>
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

const mapDispatchToProps = dispatch => ({
  getPosts: category => dispatch(fetchPosts(category)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));
