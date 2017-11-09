import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title, Grid, RadioGroup, Radio, Dialog, DialogTitle, DialogBody, DialogFooter, DialogHeader, Cell, Textfield, Button, Icon, Toolbar, ToolbarSection, ToolbarTitle, ToolbarRow } from 'react-mdc-web/lib';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchComments, newCommentFetchPost, addSnack } from '../../actions/index';
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
      id: Date.now(),
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
        <Toolbar className="toolbar mdc-theme--primary-light-bg post-title">
          <ToolbarRow>
            <ToolbarSection align="start">
              <ToolbarTitle>
                Comments
                <Button raised dense primary className="card-buttons" onClick={() => { this.setState({ isOpenCreate: true }); }}><Icon name="add_circle" className="mdc-button__icon" /> New Comment</Button>
              </ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection>
              <Grid>
                <Cell col={2}>
                  <ul className="mdc-list">
                    <li className='mdc-list-item'>
                      <span className="mdc-toolbar__title">Sort by:</span>
                    </li>
                  </ul>
                </Cell>
                <Cell col={10}>
                  <RadioGroup
                    onChange={({ target: { value } }) => { this.setState({ sort: value }); }}
                    name="saturn"
                    value={this.state.sort}
                    className="radio-horizontal"
                  >
                    <Radio value="voteScore">Votes</Radio>
                    <Radio value="timestamp">Date</Radio>
                  </RadioGroup>
                </Cell>
              </Grid>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
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
