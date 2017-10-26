import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardSubtitle, CardMedia, CardText, CardActions, Button, Icon, Grid, Cell, Caption, Title } from 'react-mdc-web/lib';
import PostVote from './PostVote';

class PostCard extends Component {
  render() {
    const { post, comments } = this.props;

    let postComments = ((comments || '')[post.id] || '');
    if (postComments !== '') {
      postComments = comments[post.id];
    }
    return (
      <Cell col={4} tablet={6} phone={12} key={post.id}>
        <Card className="post-card" key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardSubtitle>
              by <b>{post.author}</b> in <Link to={post.category}>{post.category}</Link>
            </CardSubtitle>
            <CardSubtitle>
              <b>{postComments.length}</b> Comments |
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
            {post.body}
          </CardText>
          <CardActions>
            <Grid>
              <Cell col={6}>
                <Button raised compact primary>Read more ...</Button>
              </Cell>
              <Cell col={6}>
                <Button raised dense primary className="card-buttons"><Icon name="edit" className="mdc-button__icon" /></Button>
                <Button raised dense primary className="card-buttons"><Icon name="delete" className="mdc-button__icon" /></Button>
              </Cell>
            </Grid>
          </CardActions>
        </Card>
      </Cell>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  comments: global.comments,
});

const mapDispatchToProps = dispatch => ({
  // fetchComments: post => dispatch(fetchComments(post)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCard));
