import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardSubtitle, CardText, CardActions, Button, Icon, Grid, Cell, Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter, Textfield, Title } from 'react-mdc-web/lib';
import CommentVote from './CommentVote';
import { deleteCommentFetchPost, editComment, addSnack } from '../../actions/index';

class CommentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: this.props.comment.author,
      body: this.props.comment.body,
      isOpen: false,
      isOpenDelete: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addSnack('Comment updated!');
    this.props.editComment(this.props.comment.id, {
      author: this.state.author,
      body: this.state.body,
    });
    this.setState({ isOpen: false });
  }

  deleteComment = (comment) => {
    this.props.deleteComment(comment);
    this.props.addSnack('Comment deleted!');
    this.setState({ isOpenDelete: false });
  }

  render() {
    const { comment } = this.props;

    return (
      <Cell col={4} tablet={6} phone={12} key={comment.id}>
        <Card className="post-card" key={comment.id}>
          <CardHeader>
            <CardTitle>by <b>{comment.author}</b></CardTitle>
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
                <Button raised dense primary className="card-buttons" onClick={() => { this.setState({ isOpen: true }); }}><Icon name="edit" className="mdc-button__icon" /> Edit</Button>
                <Button raised dense primary className="card-buttons" onClick={() => { this.setState({ isOpenDelete: true }); }}><Icon name="delete" className="mdc-button__icon" /> Delete</Button>
              </Cell>
            </Grid>
          </CardActions>
        </Card>
        <Dialog
          open={this.state.isOpen}
          onClose={() => { this.setState({ isOpen: false }); }}
        >
          <form onSubmit={this.handleSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Comment</DialogTitle>
            </DialogHeader>
            <DialogBody>
              {comment &&
              <Grid>
                <Cell col={12}>
                  <Textfield
                    name="author"
                    floatingLabel="Your comment author"
                    required
                    value={this.state.author}
                    onChange={this.handleInputChange}
                    className="mdc-textfield--fullwidth"
                  />
                </Cell>
                <Cell col={12}>
                  <Title>Comment body:</Title>
                  <div
                    className="mdc-textfield mdc-textfield--textarea mdc-textfield--fullwidth mdc-textfield--upgraded"
                  >
                    <textarea
                      name="body"
                      required
                      className="mdc-textfield__input"
                      rows="20"
                      value={this.state.body}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </Cell>
              </Grid>
              }
            </DialogBody>
            <DialogFooter>
              <Button raised dense primary type="button" onClick={() => { this.setState({ isOpen: false }); }}><Icon name="cancel" className="mdc-button__icon" /> Cancel</Button>
              <Button raised dense primary type="submit" ><Icon name="save" className="mdc-button__icon" /> Accept</Button>
            </DialogFooter>
          </form>
        </Dialog>
        <Dialog
          open={this.state.isOpenDelete}
          onClose={() => { this.setState({ isOpenDelete: false }); }}
        >
          <DialogHeader>
            <DialogTitle>Delete Comment</DialogTitle>
          </DialogHeader>
          <DialogBody>
            Are you sure?
          </DialogBody>
          <DialogFooter>
            <Button raised dense primary type="button" onClick={() => { this.setState({ isOpenDelete: false }); }}><Icon name="cancel" className="mdc-button__icon" /> Cancel</Button>
            <Button raised dense primary type="button" onClick={() => this.deleteComment(comment)}><Icon name="delete" className="mdc-button__icon" /> Delete</Button>
          </DialogFooter>
        </Dialog>
      </Cell>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  // comments: global.comments,
});

const mapDispatchToProps = dispatch => ({
  editComment: (commentId, body) => dispatch(editComment(commentId, body)),
  deleteComment: comment => dispatch(deleteCommentFetchPost(comment)),
  addSnack: snack => dispatch(addSnack(snack)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentCard));
