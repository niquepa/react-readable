import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GridList, Tile, TileContent, TilePrimary, TileSecondary, Icon, TileTitle, TileSupportText } from 'react-mdc-web/lib';

class PostsList extends Component {
  
  render() {
    const { posts } = this.props;
    
    return (
      <main className="mdc-content posts-list">
        <main className="posts-list-int">
          { posts && posts.map(post => (
            <GridList twoLineCaption captionIconAlign="start">
              <Tile>
                <TilePrimary>
                  <TileContent src= "/card_bg.jpg"/>
                </TilePrimary>
                <TileSecondary>
                  <Icon name="star_border"/>
                  <TileTitle>{post.title}</TileTitle>
                  <TileSupportText>{post.body}</TileSupportText>
                </TileSecondary>
              </Tile>
              {/* ... */}
            </GridList>
          ))}
        </main>
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  posts: global.posts,
});

export default connect(mapStateToProps)(PostsList);