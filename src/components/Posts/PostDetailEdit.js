import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Title, Subheading2, Body1, Button, Icon, Cell, Textfield, Grid, RadioGroup, Radio } from 'react-mdc-web/lib';
import { deletePost, fetchPost, editPost } from '../../actions/index';
import * as readableAPI from '../../utils/api';

class PostDetailEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      body: '',
      category: '',
      submitted: false,
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
    this.props.router.push('/');
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
    this.props.editPost(this.props.postId, {
      title: this.state.title,
      author: this.state.author,
      body: this.state.body,
      category: this.state.category,
    });
    // .then(this.setState({ submmited: true }));
    this.setState({ submitted: true });
  }

  render() {
    const { post, postId, category, categories } = this.props;
    const { submitted } = this.state;


    return (
      <main className="mdc-content post-detail">
        { submitted && (
          <Redirect to={`/${this.state.category}/${post.id}`}/>
        )}
        <Title>{JSON.stringify(post)} - {JSON.stringify(this.state.submitted)}</Title>
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
              />
              <Textfield
                name="author"
                floatingLabel="Your post author"
                required
                value={this.state.author}
                onChange={this.handleInputChange}
              />
            </Cell>
            <Cell col={12}>
              <Textfield
                name="body"
                floatingLabel="Your post body"
                textarea="textarea"
                rows="10"
                cols="100"
                required
                value={this.state.body}
                onChange={this.handleInputChange}
              />
            </Cell>
          </Grid>
          <Button raised dense primary type="submit" value="submit"><Icon name="save" className="mdc-button__icon" /></Button>
          <Button raised dense primary onClick={() => this.removePost(post)}><Icon name="delete" className="mdc-button__icon" /></Button>
        </form>
        }
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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetailEdit));
