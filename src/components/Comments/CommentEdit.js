import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Icon, Grid, Cell, Title, Textfield } from 'react-mdc-web/lib';
import { deleteComment, fetchComment, editComment } from '../../actions/index';

class CommentEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      body: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getComment(this.props.commentId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.comment) {
      this.assignState(nextProps.comment);
    }
  }

  assignState = (comment) => {
    if (comment) {
      this.setState({
        author: comment.author,
        body: comment.body,
      });
    }
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
    this.props.editComment(this.props.commentId, {
      author: this.state.author,
      body: this.state.body,
    });
    // TODO: Redirect to the post
    this.props.history.push('/');
    // this.props.history.push(`/${this.props.category}/${this.props.commentId}`);
   //this.props.history.goBack;
  }

  removeComment = (comment) => {
    this.props.deleteComment(comment.id);
  }

  render() {
    const { comment } = this.props;

    return (
      <main className="mdc-content post-detail">
        <Title>RAW COMMENT:{JSON.stringify(comment)}</Title>
        {comment &&
        <form onSubmit={this.handleSubmit}>
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
              <div className="mdc-textfield mdc-textfield--textarea mdc-textfield--fullwidth mdc-textfield--upgraded">
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
          <Button raised dense primary type="submit" ><Icon name="save" className="mdc-button__icon" /></Button>
          <Button raised dense primary type="button" onClick={() => this.removeComment(comment)}><Icon name="delete" className="mdc-button__icon" /></Button>
          <Button raised dense primary type="button" onClick={this.props.history.goBack}><Icon name="cancel" className="mdc-button__icon" /></Button>
        </form>
        }
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  comment: global.comment,
});

const mapDispatchToProps = dispatch => ({
  getComment: comment => dispatch(fetchComment(comment)),
  deleteComment: comment => dispatch(deleteComment(comment)),
  editComment: (commentId, body) => dispatch(editComment(commentId, body)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentEdit));
