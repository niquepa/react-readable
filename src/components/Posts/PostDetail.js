import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Title, Subheading2, Body1, Button, Icon, Grid } from 'react-mdc-web/lib';
import PostVote from './PostVote';
import CommentCard from '../Comments/CommentCard';
import { deletePost, fetchComments } from '../../actions/index';
import * as readableAPI from '../../utils/api';

class PostDetail extends Component {
  state = {
    post: '',
    comments: '',
  }

  componentDidMount() {
    // this.props.getComments(this.props.post.id);
    if (this.props.postId) {
      readableAPI.getPost(this.props.postId)
        .then(post => (
          this.setState({ post })
        ));
      this.props.getComments(this.props.postId);
    }
  }

  removePost = (post) => {
    this.props.deletePost(post.id);
  }

  render() {
    const { post } = this.state;
    const { comments } = this.props;

    return (
      <main className="mdc-content post-detail">
        <Title>{post.title}</Title>
        <caption>
          Last updated: {post.timestamp}
        </caption>
        <Subheading2>by <b>{post.author}</b> in <Link to={`/${post.category}`}>{post.category}</Link> | <b>{post.commentCount}</b> Comments</Subheading2>
        <Body1>{post.body}</Body1>
        <Button raised dense primary className="card-buttons"><Icon name="edit" className="mdc-button__icon" /></Button>
        <Button raised dense primary className="card-buttons" onClick={() => this.removePost(post)}><Icon name="delete" className="mdc-button__icon" /></Button>
        <Grid>
          { comments && comments.map(comment => (
            <CommentCard comment={comment} key={comment.id} />
          ))}
        </Grid>
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  comments: global.comments,
});

const mapDispatchToProps = dispatch => ({
  getComments: post => dispatch(fetchComments(post)),
  deletePost: post => dispatch(deletePost(post)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
