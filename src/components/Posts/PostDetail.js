import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Title, Subheading2, Body1, Button, Icon } from 'react-mdc-web/lib';
import PostVote from './PostVote';
import CommentsList from '../Comments/CommentsList';
import { fetchPost } from '../../actions/index';

class PostDetail extends Component {
  componentDidMount() {
    this.props.getPost(this.props.postId);
  }

  render() {
    const post = this.props.post;

    return (
      <main className="mdc-content post-detail">
        { ((post || '').id || '') !== '' ?
          <main>
            <Title>{post.title}</Title>
            <caption>Last updated: {post.timestamp}</caption>
            <Subheading2>by <b>{post.author}</b> in <Link to={`/${post.category}`}>{post.category}</Link> | <b>{post.commentCount}</b> Comments</Subheading2>
            <PostVote postId={post.id} voteScore={post.voteScore} />
            <Body1>{post.body}</Body1>
            <Link to={`/${post.category}/${post.id}/edit`}><Button raised dense primary><Icon name="edit" className="mdc-button__icon" /> Edit</Button></Link>
            <CommentsList postId={this.props.postId} />
          </main>
      :
          <main>
            <Title>POST NOT FOUND</Title>
          </main>
        }
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  post: global.post,
});

const mapDispatchToProps = dispatch => ({
  getPost: post => dispatch(fetchPost(post)),
});

PostDetail.propTypes = {
  post: PropTypes.object,
  postId: PropTypes.number,
  getPost: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
