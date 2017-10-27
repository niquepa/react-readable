import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Title, Subheading2, Body1, Button, Icon } from 'react-mdc-web/lib';
import PostVote from './PostVote';
import CommentsList from '../Comments/CommentsList';
import { deletePost, fetchPost } from '../../actions/index';
import * as readableAPI from '../../utils/api';

class PostDetail extends Component {

  componentDidMount() {
    this.props.getPost(this.props.postId);
  }

  removePost = (post) => {
    this.props.deletePost(post.id);
  }

  render() {
    const { post } = this.props;

    return (
      <main className="mdc-content post-detail">
        <Title>{post.title}</Title>
        <caption>
          Last updated: {post.timestamp}
        </caption>
        <Subheading2>by <b>{post.author}</b> in <Link to={`/${post.category}`}>{post.category}</Link> | <b>{post.commentCount}</b> Comments</Subheading2>
        <PostVote postId={post.id} voteScore={post.voteScore} />
        <Body1>{post.body}</Body1>
        <Button raised dense primary className="card-buttons"><Icon name="edit" className="mdc-button__icon" /></Button>
        <Button raised dense primary className="card-buttons" onClick={() => this.removePost(post)}><Icon name="delete" className="mdc-button__icon" /></Button>
        <CommentsList postId={this.props.postId} />
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  post: global.post,
});

const mapDispatchToProps = dispatch => ({
  getPost: post => dispatch(fetchPost(post)),
  deletePost: post => dispatch(deletePost(post)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
