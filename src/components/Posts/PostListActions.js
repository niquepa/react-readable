import React, { Component } from 'react';
import { Grid, RadioGroup, Radio, Cell, Button, Icon } from 'react-mdc-web/lib';
import PropTypes from 'prop-types';

// class PostListActions extends Component {
const PostListActions = props =>
  // render() {
  (
    <div className="post-title mdc-theme--primary-light-bg">
      <Grid>
        <Cell col={4} tablet={12}>
          <h1 className="mdc-toolbar__title text-white">Posts</h1>
        </Cell>
        <Cell col={1} tablet={3} phone={12}>
          <ul className="mdc-list">
            <li className="mdc-list-item">
              <span className="mdc-toolbar__title">Sort by:</span>
            </li>
          </ul>
        </Cell>
        <Cell col={3} tablet={9} phone={12}>
          <RadioGroup
            onChange={({ target: { value } }) => { props.handleSortMethod(value); }}
            name="saturn"
            value={props.sort}
            className="radio-horizontal"
          >
            <Radio value="voteScore">Votes</Radio>
            <Radio value="timestamp">Date</Radio>
            <Radio value="commentCount">Comments</Radio>
          </RadioGroup>
        </Cell>
        <Cell col={4} tablet={12} className="text-centered">
          <Button raised dense primary className="card-buttons" onClick={() => { props.handleOpenCreate(true); }}><Icon name="add_circle" className="mdc-button__icon" /> New Post</Button>
        </Cell>
      </Grid>
    </div>
  );
  // }


PostListActions.propTypes = {
  sort: PropTypes.string,
  handleSortMethod: PropTypes.func,
  handleOpenCreate: PropTypes.func,
};

export default PostListActions;
