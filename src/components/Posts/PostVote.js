import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Icon, Caption } from 'react-mdc-web/lib';
import { votePost } from '../../actions/index';

const PostVote = (props) => {
  const addVote = (vote) => {
    props.votePost(props.postId, { option: vote });
  };

  const { voteScore } = props;

  return (
    <span>
      <Button className="card-buttons" primary onClick={() => addVote('downVote')}>
        <Icon name="keyboard_arrow_left" className="mdc-button__icon" />
      </Button>
      <Caption><b>{voteScore} Votes</b></Caption>
      <Button className="card-buttons" primary onClick={() => addVote('upVote')}>
        <Icon name="keyboard_arrow_right" className="mdc-button__icon" />
      </Button>
    </span>
  );
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  votePost: (postId, vote) => dispatch(votePost(postId, vote)),
});

PostVote.propTypes = {
  postId: PropTypes.string,
  voteScore: PropTypes.number,
  votePost: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostVote));
