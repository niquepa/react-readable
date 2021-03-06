import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title, Grid, Dialog, DialogTitle, DialogBody, DialogFooter, DialogHeader, Cell, Textfield, Button, Icon } from 'react-mdc-web/lib';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchComments, newCommentFetchPost, addSnack } from '../../actions/index';
import CommentsListActions from './CommentsListActions';
import CommentCard from './CommentCard';

class CommentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 'voteScore',
      author: '',
      body: '',
      isOpenCreate: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getComments(this.props.postId);
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
    this.props.addSnack('Comment created!');
    this.props.createComment({
      id: `c-${Date.now()}`,
      parentId: this.props.postId,
      timestamp: Date.now(),
      author: this.state.author,
      body: this.state.body,
    });
    this.setState({
      isOpenCreate: false,
      author: '',
      body: '',
    });
  }

  handleSortMethod = (method) => {
    this.setState({ sort: method });
  }

  handleOpenCreate = (value) => {
    this.setState({ isOpenCreate: value });
  }

  sortComments = (comments, method) => {
    let filteredComments = comments;
    if (filteredComments) {
      filteredComments = filteredComments.sort((a, b) => (b[method] - a[method]));
    }
    return filteredComments;
  }

  render() {
    const { comments } = this.props;

    const filteredComments = this.sortComments(comments, this.state.sort);

    return (
      <main className="mdc-content post-detail">
        <CommentsListActions
          total={comments.length ? comments.length : '0'}
          sort={this.state.sort}
          handleSortMethod={this.handleSortMethod}
          openCreate={this.state.isOpenCreate}
          handleOpenCreate={this.handleOpenCreate}
        />
        <Grid>
          { filteredComments && filteredComments.map(comment => (
            <CommentCard comment={comment} key={comment.id} />
          ))}
        </Grid>
        <Dialog
          open={this.state.isOpenCreate}
          onClose={() => { this.setState({ isOpenCreate: false }); }}
        >
          <form onSubmit={this.handleSubmit}>
            <DialogHeader>
              <DialogTitle>New Comment</DialogTitle>
            </DialogHeader>
            <DialogBody>
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
                  <div className="mdc-textfield mdc-textfield--textarea mdc-textfield--fullwidth mdc-textfield--upgraded mdc-textfield--multiline">
                    <textarea
                      name="body"
                      required
                      className="mdc-textfield__input"
                      rows="10"
                      value={this.state.body}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </Cell>
              </Grid>
            </DialogBody>
            <DialogFooter>
              <Button raised dense primary type="button" onClick={() => { this.setState({ isOpenCreate: false }); }}><Icon name="cancel" className="mdc-button__icon" /> Cancel</Button>
              <Button raised dense primary type="submit" ><Icon name="save" className="mdc-button__icon" /> Accept</Button>
            </DialogFooter>
          </form>
        </Dialog>
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  comments: global.comments,
});

const mapDispatchToProps = dispatch => ({
  getComments: post => dispatch(fetchComments(post)),
  createComment: comment => dispatch(newCommentFetchPost(comment)),
  addSnack: snack => dispatch(addSnack(snack)),
});

CommentsList.propTypes = {
  comments: PropTypes.array,
  getComments: PropTypes.func,
  createComment: PropTypes.func,
  addSnack: PropTypes.func,
  postId: PropTypes.string,

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsList));
