import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title, Card, CardHeader, CardTitle, CardSubtitle, CardMedia, CardText, CardActions, Button, Fab, Icon, Grid, Cell } from 'react-mdc-web/lib';

class PostsList extends Component {
  
  render() {
    const { posts } = this.props;
    
    return (
      <main className="mdc-content posts-list">
        <main className="posts-list-int">
          <Grid>
            { posts && posts.map(post => (
              // TODO: Change the key for cell
              <Cell col={4} tablet={6} phone={12} key={post.id}>
                <Card className="post-card" key={post.id}>
                  <CardHeader>
                    <CardTitle>{post.title} <Fab mini><Icon name='create'/></Fab><Fab mini><Icon name='delete'/></Fab></CardTitle>
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
                        <Button compact >action 2</Button>
                      </Cell>
                      <Cell col={1}>
                        {post.voteScore}
                      </Cell>
                      <Cell col={3}>
                        <Fab mini><Icon name='thumb_up'/></Fab>
                        <Fab mini><Icon name='thumb_down'/></Fab>
                      </Cell>
                    </Grid>
                  </CardActions>
                </Card>
              </Cell>
            ))}
          </Grid>
        </main>
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  posts: global.posts,
});

export default connect(mapStateToProps)(PostsList);