import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Icon, Caption } from 'react-mdc-web/lib';
import { votePost } from '../../actions/index';

class PostVote extends Component {
  addVote = (vote) => {
    this.props.votePost(this.props.postId, { option: vote });
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
  votePost: (postId, vote) => dispatch(votePost(postId, vote)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostVote));
