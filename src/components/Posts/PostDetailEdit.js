import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Title, Button, Icon, Cell, Textfield, Grid, RadioGroup, Radio, Dialog, DialogHeader, DialogBody, DialogFooter, DialogTitle } from 'react-mdc-web/lib';
import { deletePost, fetchPost, editPost, addSnack } from '../../actions/index';

class PostDetailEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      body: '',
      category: '',
      isOpenDelete: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getPost(this.props.postId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.post) {
      this.assignState(nextProps.post);
    }
  }

  removePost = (post) => {
    this.props.deletePost(post.id);
    this.props.addSnack('Post deleted!');
    this.props.history.push('/');
  }

  assignState = (post) => {
    if (post) {
      this.setState({
        title: post.title,
        author: post.author,
        body: post.body,
        category: post.category,
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
    this.props.addSnack('Post updated!');
    this.props.editPost(this.props.postId, {
      title: this.state.title,
      author: this.state.author,
      body: this.state.body,
      category: this.state.category,
    });
    this.props.history.push(`/${this.state.category}/${this.props.postId}`);
  }

  render() {
    const {
      post, categories,
    } = this.props;
    const { redirect } = this.state;


    return (
      <main className="mdc-content post-detail">
        { redirect && (
          <Redirect to={redirect} />
        )}
        { post &&
        <form onSubmit={this.handleSubmit}>
          <Grid>
            <Cell col={12}>
              <RadioGroup
                onChange={this.handleInputChange}
                name="category"
                value={this.state.category}
              >
                { categories && categories.map(category => (
                  <Radio value={category.path} key={category.path}>{category.name}</Radio>
                ))}
              </RadioGroup>
              <Textfield
                name="title"
                floatingLabel="Your post title"
                helptext="For example, Udacity is the best place to learn React"
                helptextPersistent
                required
                value={this.state.title}
                onChange={this.handleInputChange}
                className="mdc-textfield--fullwidth"
              />
              <Textfield
                name="author"
                floatingLabel="Your post author"
                required
                value={this.state.author}
                onChange={this.handleInputChange}
                className="mdc-textfield--fullwidth"
              />
            </Cell>
            <Cell col={12}>
              <Title>Post body:</Title>
              <div className="mdc-textfield mdc-textfield--textarea mdc-textfield--fullwidth mdc-textfield--upgraded mdc-textfield--multiline">
                <textarea
                  id="post-body"
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
          <Button raised dense primary type="button" onClick={() => this.setState({ isOpenDelete: true })}><Icon name="delete" className="mdc-button__icon" /> Delete</Button>
          <Button raised dense primary type="button" onClick={this.props.history.goBack}><Icon name="cancel" className="mdc-button__icon" /> Cancel</Button>
          <Button raised dense primary type="submit" ><Icon name="save" className="mdc-button__icon" /> Save</Button>
        </form>
        }
        <Dialog
          open={this.state.isOpenDelete}
          onClose={() => { this.setState({ isOpenDelete: false }); }}
        >
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
          </DialogHeader>
          <DialogBody>
            Are you sure?
          </DialogBody>
          <DialogFooter>
            <Button raised dense primary type="button" onClick={() => { this.setState({ isOpenDelete: false }); }}><Icon name="cancel" className="mdc-button__icon" /> Cancel</Button>
            <Button raised dense primary type="button" onClick={() => this.removePost(post)}><Icon name="delete" className="mdc-button__icon" /> Delete</Button>
          </DialogFooter>
        </Dialog>
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  post: global.post,
  categories: global.categories,
});

const mapDispatchToProps = dispatch => ({
  getPost: post => dispatch(fetchPost(post)),
  deletePost: post => dispatch(deletePost(post)),
  editPost: (postId, body) => dispatch(editPost(postId, body)),
  addSnack: snack => dispatch(addSnack(snack)),
});

PostDetailEdit.propTypes = {
  history: PropTypes.object,
  post: PropTypes.object,
  postId: PropTypes.string,
  categories: PropTypes.array,
  getPost: PropTypes.func,
  deletePost: PropTypes.func,
  editPost: PropTypes.func,
  addSnack: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetailEdit));
