import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { fetchComments } from '../../actions/index';
import { Card, CardHeader, CardTitle, CardSubtitle, CardMedia, CardText, CardActions, Button, Fab, Icon, Grid, Cell } from 'react-mdc-web/lib';

class PostCard extends Component {
  componentDidMount() {
    this.props.fetchComments(this.props.post.id)
      .then(comments => console.log(`COMMENTS: ${comments}`))
  }

  render() {
    const { post } = this.props;

    return (
      // TODO: Change the key for cell
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
                {}<Icon name="comment" />
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
  //comments: global.comments.filter(comment => comment === this.props.post.id),
  // posts: global.posts,
});

const mapDispatchToProps = dispatch => ({
  fetchComments: post => dispatch(fetchComments(post)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCard));
