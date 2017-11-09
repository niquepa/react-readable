import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardSubtitle, CardMedia, CardText, CardActions, Button, Icon, Grid, Cell } from 'react-mdc-web/lib';
import Moment from 'react-moment';
import PostVote from './PostVote';

class PostCard extends Component {
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
            <CardTitle><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></CardTitle>
            <CardSubtitle>
              by <b>{post.author}</b> in <Link to={post.category}>{post.category}</Link>
            </CardSubtitle>
            <CardSubtitle>
              Last updated: <b><Moment format="YYYY-MM-DD HH:mm">{post.timestamp}</Moment></b>
            </CardSubtitle>
            <CardSubtitle>
              <b>{post.commentCount}</b> Comments |
              <PostVote postId={post.id} voteScore={post.voteScore} />
            </CardSubtitle>
          </CardHeader>
          <Link to={`/${post.category}/${post.id}`}>
            <CardMedia
              style={{
                backgroundImage: 'url("/card_bg.jpg")',
                height: '300px',
                backgroundSize: 'cover',
              }}
            />
          </Link>
          <CardText>
            {this.summary(post.body)}
          </CardText>
          <CardActions>
            <Grid>
              <Cell col={6}>
                <Link to={`/${post.category}/${post.id}`}><Button raised compact primary>Read more ...</Button></Link>
              </Cell>
              <Cell col={6}>
                <Link to={`/${post.category}/${post.id}/edit`}><Button raised dense primary className="card-buttons"><Icon name="edit" className="mdc-button__icon" /> Edit</Button></Link>
              </Cell>
            </Grid>
          </CardActions>
        </Card>
      </Cell>
    );
  }
}

const mapStateToProps = ({ global }) => ({
});

const mapDispatchToProps = dispatch => ({
});

PostCard.propTypes = {
  post: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCard));
