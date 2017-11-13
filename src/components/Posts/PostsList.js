import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title, Grid, RadioGroup, Radio, Dialog, DialogTitle, DialogBody, DialogFooter, DialogHeader, Cell, Textfield, Button, Icon } from 'react-mdc-web/lib';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchPosts, newPost, addSnack } from '../../actions/index';
import PostListActions from './PostListActions';
import PostCard from './PostCard';

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 'voteScore',
      isOpenCreate: false,
      title: '',
      body: '',
      author: '',
      category: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSortMethod = this.handleSortMethod.bind(this);
  }

  componentDidMount() {
    this.props.getPosts(this.props.category);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.category !== nextProps.category) {
      this.props.getPosts(nextProps.category);
    }
    this.assignDefaultCategory(nextProps.categories);
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
    this.props.addSnack('Post created!');
    this.props.createPost({
      id: `p-${Date.now()}`,
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category,
    });
    this.setState({
      isOpenCreate: false,
      title: '',
      body: '',
      author: '',
      category: '',
    });
  }

  handleSortMethod = (method) => {
    this.setState({ sort: method });
  }

  handleOpenCreate = (value) => {
    this.setState({ isOpenCreate: value });
  }

  sortPosts = (posts, method) => {
    let filteredPosts = posts;
    if (filteredPosts) {
      filteredPosts = filteredPosts.sort((a, b) => (b[method] - a[method]));
    }
    return filteredPosts;
  }

  assignDefaultCategory = (categories) => {
    if (categories.length > 0 && this.state.category === '') {
      this.setState({ category: categories[0].path });
    }
  }

  render() {
    const { posts, categories } = this.props;

    const filteredPosts = this.sortPosts(posts, this.state.sort);

    return (
      <main className="mdc-content posts-list">
        <main className="posts-list-int">
          <PostListActions sort={this.state.sort} handleSortMethod={this.handleSortMethod} openCreate={this.state.isOpenCreate} handleOpenCreate={this.handleOpenCreate} />
          <Grid>
            { filteredPosts && filteredPosts.map(post => (
              <PostCard post={post} key={post.id} />
                ))}
          </Grid>
          <Dialog
            open={this.state.isOpenCreate}
            onClose={() => { this.setState({ isOpenCreate: false }); }}
          >
            <form onSubmit={this.handleSubmit}>
              <DialogHeader>
                <DialogTitle>New Post</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <Grid>
                  <Cell col={12}>
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
                    <Textfield
                      name="title"
                      floatingLabel="Your post title"
                      required
                      value={this.state.title}
                      onChange={this.handleInputChange}
                      className="mdc-textfield--fullwidth"
                    />
                  </Cell>
                  <Cell col={12}>
                    <RadioGroup
                      onChange={this.handleInputChange}
                      required
                      name="category"
                      value={this.state.category}
                    >
                      { categories && categories.map(category => (
                        <Radio value={category.path} key={category.path}>{category.name}</Radio>
                      ))}
                    </RadioGroup>
                  </Cell>
                  <Cell col={12}>
                    <Title>Post body:</Title>
                    <div className="mdc-textfield mdc-textfield--textarea mdc-textfield--fullwidth mdc-textfield--upgraded mdc-textfield--multiline">
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
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  posts: global.posts,
  categories: global.categories,
});

const mapDispatchToProps = dispatch => ({
  getPosts: category => dispatch(fetchPosts(category)),
  createPost: post => dispatch(newPost(post)),
  addSnack: snack => dispatch(addSnack(snack)),
});

PostsList.propTypes = {
  category: PropTypes.string,
  posts: PropTypes.array,
  categories: PropTypes.array,
  getPosts: PropTypes.func,
  createPost: PropTypes.func,
  addSnack: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));
