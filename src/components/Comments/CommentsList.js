import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title, Grid, RadioGroup, Radio } from 'react-mdc-web/lib';
import { withRouter } from 'react-router-dom';
import { fetchComments } from '../../actions/index';
import CommentCard from './CommentCard';

class CommentsList extends Component {
  state = {
    sort: 'voteScore',
  }
  
  componentDidMount() {
    this.props.getComments(this.props.postId);
  }
  
  sortComments = (comments, method) => {
    let filteredComments = comments;
    if (filteredComments) {
      filteredComments = filteredComments.sort((a, b) => (b[method] - a[method]));
    }
    return filteredComments;
  }
  
  render() {
    const { comments } = this.props;
    
    const filteredComments = this.sortComments(comments, this.state.sort);
    
    return (
      <main className="mdc-content post-detail">
        <Title>Comments:</Title>
        <RadioGroup
          onChange={({ target: { value } }) => { this.setState({ sort: value }); }}
          name="saturn"
          value={this.state.sort}
        >
          <Radio value="voteScore">Votes</Radio>
          <Radio value="timestamp">Date</Radio>
        </RadioGroup>
        <Grid>
          { filteredComments && filteredComments.map(comment => (
            <CommentCard comment={comment} key={comment.id} />
          ))}
        </Grid>
      </main>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  comments: global.comments,
});

const mapDispatchToProps = dispatch => ({
  getComments: post => dispatch(fetchComments(post)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsList));