import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Title, Subheading2, Body1, Button, Icon, Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, Cell, Card, CardHeader, CardTitle, CardSubtitle, CardMedia, CardText, CardActions, Grid } from 'react-mdc-web/lib';
import Moment from 'react-moment';
import PostVote from './PostVote';
import CommentsList from '../Comments/CommentsList';
import { fetchPost } from '../../actions/index';

class PostDetail extends Component {
  componentDidMount() {
    this.props.getPost(this.props.postId);
  }

  render() {
    const post = this.props.post;

    return (
      <main className="mdc-content post-detail">
        { ((post || '').id || '') !== '' ?
          <Cell col={12} key={post.id}>
            <Card className="post-card" key={post.id}>
              <CardHeader>
                <CardTitle>
                  <div className="post-title mdc-theme--primary-light-bg">
                    <Grid>
                      <Cell col={4} tablet={12}>
                        <h2 className="text-white">{post.title}</h2>
                      </Cell>
                      <Cell col={4} tablet={12} phone={12} className="text-centered">
                        <PostVote postId={post.id} voteScore={post.voteScore} />
                      </Cell>
                      <Cell col={4} tablet={12} className="text-centered">
                        <Link to={`/${post.category}/${post.id}/edit`}><Button raised dense primary><Icon name="edit" className="mdc-button__icon" /> Edit Post</Button></Link>
                      </Cell>
                    </Grid>
                  </div>
                </CardTitle>
                <CardSubtitle>
                  by <b>{post.author}</b> in <Link to={post.category}>{post.category}</Link>
                </CardSubtitle>
                <CardSubtitle>
                  Last updated: <b><Moment format="YYYY-MM-DD HH:mm">{post.timestamp}</Moment></b>
                </CardSubtitle>
              </CardHeader>
              <CardMedia
                style={{
                  backgroundImage: 'url("/card_bg.jpg")',
                  height: '400px',
                  backgroundSize: 'cover',
                }}
              />
              <CardText>
                {post.body}
              </CardText>
            </Card>
            <CommentsList postId={this.props.postId} />
          </Cell>
          // <main>
          //   <Toolbar className="toolbar mdc-theme--primary-light-bg post-title">
          //     <ToolbarRow>
          //       <ToolbarSection align="start">
          //         <ToolbarTitle>{post.title}</ToolbarTitle>
          //       </ToolbarSection>
          //       <ToolbarSection>
          //         <PostVote postId={post.id} voteScore={post.voteScore} />
          //       </ToolbarSection>
          //       <ToolbarSection>
          //         <Link to={`/${post.category}/${post.id}/edit`}><Button raised dense primary><Icon name="edit" className="mdc-button__icon" /> Edit Post</Button></Link>
          //       </ToolbarSection>
          //     </ToolbarRow>
          //   </Toolbar>
          //   <caption>Last updated: {post.timestamp}</caption>
          //   <Subheading2>by <b>{post.author}</b> in <Link to={`/${post.category}`}>{post.category}</Link></Subheading2>
          //   <Body1>{post.body}</Body1>
          //   <CommentsList postId={this.props.postId} />
          // </main>
      :
          <main>
            <Title>POST NOT FOUND</Title>
          </main>
        }
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  post: global.post,
});

const mapDispatchToProps = dispatch => ({
  getPost: post => dispatch(fetchPost(post)),
});

PostDetail.propTypes = {
  post: PropTypes.object,
  postId: PropTypes.string,
  getPost: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
