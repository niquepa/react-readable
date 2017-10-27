import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardSubtitle, CardMedia, CardText, CardActions, Button, Icon, Grid, Cell, Caption, Title } from 'react-mdc-web/lib';
import PostVote from './PostVote';
import { deletePost } from '../../actions/index';

class PostCard extends Component {
  removePost = (post) => {
    this.props.deletePost(post.id);
  }

  summary = (str) => {
    if (str.length > 50) {
      return str.substr(0, 50);
    }

    return str;
  }

  render() {
    const { post } = this.props;

    return (
      <Cell col={4} tablet={6} phone={12} key={post.id}>
        <Card className="post-card" key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardSubtitle>
              by <b>{post.author}</b> in <Link to={post.category}>{post.category}</Link>
            </CardSubtitle>
            <CardSubtitle>
              <b>{post.commentCount}</b> Comments |
              <PostVote postId={post.id} voteScore={post.voteScore} />
            </CardSubtitle>
          </CardHeader>
          <CardMedia
            style={{
              backgroundImage: 'url("/card_bg.jpg")',
              height: '300px',
              backgroundSize: 'cover',
            }}
          />
          <CardText>
            {this.summary(post.body)}
          </CardText>
          <CardActions>
            <Grid>
              <Cell col={6}>
                <Button raised compact primary><Link to={`/${post.category}/${post.id}`}>Read more ...</Link></Button>
              </Cell>
              <Cell col={6}>
                <Button raised dense primary className="card-buttons"><Icon name="edit" className="mdc-button__icon" /></Button>
                <Button raised dense primary className="card-buttons" onClick={() => this.removePost(post)}><Icon name="delete" className="mdc-button__icon" /></Button>
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
  deletePost: post => dispatch(deletePost(post)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCard));
