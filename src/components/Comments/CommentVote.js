import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Icon, Caption } from 'react-mdc-web/lib';
import { voteComment } from '../../actions/index';

class CommentVote extends Component {
  addVote = (vote) => {
    this.props.voteComment(this.props.commentId, { option: vote });
  }
  render() {
    const { voteScore } = this.props;

    return (
      <span>
        <Button className="card-buttons" primary onClick={() => this.addVote('downVote')}>
          <Icon name="keyboard_arrow_left" className="mdc-button__icon" />
        </Button>
        <Caption><b>{voteScore} Votes</b></Caption>
        <Button className="card-buttons" primary onClick={() => this.addVote('upVote')}>
          <Icon name="keyboard_arrow_right" className="mdc-button__icon" />
        </Button>
      </span>
    );
  }
}

const mapStateToProps = ({ global }) => ({
});

const mapDispatchToProps = dispatch => ({
  voteComment: (commentId, vote) => dispatch(voteComment(commentId, vote)),
});

CommentVote.propTypes = {
  voteScore: PropTypes.number,
  voteComment: PropTypes.func,
  commentId: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentVote));
