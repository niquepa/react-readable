import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardSubtitle, CardMedia, CardText, CardActions, Button, Fab, Icon, Grid, Cell } from 'react-mdc-web/lib';

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
            <CardTitle>{post.title} <Fab mini><Icon name="create" /></Fab><Fab mini><Icon name="delete" /></Fab></CardTitle>
            <CardSubtitle>by {post.author} in {post.category}</CardSubtitle>
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
              <Cell col={8}>
                <Button compact >Read more ...</Button>
                {postComments.length}<Icon name="comment" />
              </Cell>
              <Cell col={1}>
                {post.voteScore}
              </Cell>
              <Cell col={3}>
                <Fab mini><Icon name="thumb_up" /></Fab>
                <Fab mini><Icon name="thumb_down" /></Fab>
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
