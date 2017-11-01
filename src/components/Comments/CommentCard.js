import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardSubtitle, CardMedia, CardText, CardActions, Button, Icon, Grid, Cell, Caption, Title } from 'react-mdc-web/lib';
import CommentVote from './CommentVote'
import { deleteComment } from '../../actions/index';

class CommentCard extends Component {
  deleteComment = (comment) => {
    this.props.deleteComment(comment.id);
  }

  render() {
    const { comment } = this.props;

    return (
      <Cell col={4} tablet={6} phone={12} key={comment.id}>
        <Card className="post-card" key={comment.id}>
          <CardHeader>
            <CardTitle>by <b>{comment.author}</b>></CardTitle>
            <CardSubtitle>
              Last updated: {comment.timestamp}
            </CardSubtitle>
            <CardSubtitle>
              <CommentVote commentId={comment.id} voteScore={comment.voteScore} />
            </CardSubtitle>
          </CardHeader>
          <CardText>
            {comment.body}
          </CardText>
          <CardActions>
            <Grid>
              <Cell col={12}>
                <Link to={`/${comment.parentID}/${comment.id}/editComment`}><Button raised dense primary className="card-buttons"><Icon name="edit" className="mdc-button__icon" /></Button></Link>
                <Button raised dense primary className="card-buttons" onClick={() => this.deleteComment(comment)}><Icon name="delete" className="mdc-button__icon" /></Button>
              </Cell>
            </Grid>
          </CardActions>
        </Card>
      </Cell>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  // comments: global.comments,
});

const mapDispatchToProps = dispatch => ({
  // fetchComments: post => dispatch(fetchComments(post)),
  deleteComment: comment => dispatch(deleteComment(comment)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentCard));
