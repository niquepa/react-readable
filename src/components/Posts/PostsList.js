import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title, Grid, RadioGroup, Radio, Dialog, DialogTitle, DialogBody, DialogFooter, DialogHeader, Cell, Textfield, Button, Icon } from 'react-mdc-web/lib';
import { withRouter } from 'react-router-dom';
import { fetchPosts, newPost, addSnack } from '../../actions/index';
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
      id: Date.now(),
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

  componentDidMount() {
    this.props.getPosts(this.props.category);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.category != nextProps.category) {
      this.props.getPosts(nextProps.category);
    }
  }

  sortPosts = (posts, method) => {
    let filteredPosts = posts;
    if (filteredPosts) {
      filteredPosts = filteredPosts.sort((a, b) => (b[method] - a[method]));
    }
    return filteredPosts;
  }

  render() {
    const { posts, categories } = this.props;

    const filteredPosts = this.sortPosts(posts, this.state.sort);

    return (
      <main className="mdc-content posts-list">
        <main className="posts-list-int">
          <RadioGroup
            onChange={({ target: { value } }) => { this.setState({ sort: value }); }}
            name="saturn"
            value={this.state.sort}
          >
            <Radio value="voteScore">Votes</Radio>
            <Radio value="timestamp">Date</Radio>
            <Radio value="commentCount">Comments</Radio>
          </RadioGroup>
          <Button raised dense primary className="card-buttons" onClick={() => { this.setState({ isOpenCreate: true }); }}><Icon name="add_circle" className="mdc-button__icon" /> New Post</Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));
