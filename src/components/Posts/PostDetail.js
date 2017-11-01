import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Title, Subheading2, Body1, Button, Icon } from 'react-mdc-web/lib';
import PostVote from './PostVote';
import CommentsList from '../Comments/CommentsList';
import { deletePost, fetchPost } from '../../actions/index';

class PostDetail extends Component {
  
  componentDidMount() {
    this.props.getPost(this.props.postId);
  }

  removePost = (post) => {
    this.props.deletePost(post.id);
  }

  render() {
    const { post, postId, Category } = this.props;

    return (
      <main className="mdc-content post-detail">
      { post && (
        <main>
          <Title>{post.title}</Title>
          <caption>Last updated: {post.timestamp}</caption>
          <Subheading2>by <b>{post.author}</b> in <Link to={`/${post.category}`}>{post.category}</Link> | <b>{post.commentCount}</b> Comments</Subheading2>
          <PostVote postId={post.id} voteScore={post.voteScore} />
          <Body1>{post.body}</Body1>
          <Link to={`/${post.category}/${post.id}/edit`}><Button raised dense primary><Icon name="edit" className="mdc-button__icon" /></Button></Link>
          <CommentsList postId={this.props.postId} />
        </main>
      )}
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
