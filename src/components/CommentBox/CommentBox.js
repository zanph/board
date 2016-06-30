import React, { PropTypes as T } from 'react'
import $ from 'jquery' //todo remove jquery dependency, see note in handleCommentSubmit

import styles from './styles.module.css'
import CommentList from 'components/CommentList/CommentList'
import CommentForm from 'components/CommentForm/CommentForm'
import {Grid, Row, Col} from 'react-bootstrap'


export class CommentBox extends React.Component {
   constructor(props) {
     super(props);

     this.state = {
        data : []
        }
   }

   handleCommentSubmit (comment) {
     //TODO/FIX: remove jquery dependnecy and use fetch() 
     let comments = this.state.data;
     console.log(comments);
     //use optimistic updating to id the comment now (this will be replaced)
     //and display to the user.
     comment.id = Date.now();
     let newComments = comments.concat([comment]);
     this.setState({data: newComments});
     //submit to server and refresh the comment list
     $.ajax({
       url: this.props.url,
       dataType: 'json',
       type: 'POST',
       data: {comment: comment, tabName: this.props.tab},
       success: function(data){
         this.setState({data: data});
       }.bind(this),
       error: function(xhr, status, err){
         //if something went wrong, set the state so the comments reflect
         //what's actually on the server.
         this.setState({data: comments});
         console.error(this.props.url, status, err.toString());
       }.bind(this)
     });
   }

   loadCommentsFromServer () {
     console.log(this.props.tab);
      $.ajax({
         url: this.props.url,
         data: {tabName: this.props.tab},
         dataType: 'json',
         cache: false,
         success: function(data) {
            this.setState({data: data});
         }.bind(this),
         error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
         }.bind(this)
      });
   }

   componentDidMount () {
      this.loadCommentsFromServer();
      setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
   }

   render() {
     return(
       <div className={styles.content}>
            <Row>
              <Col xs={12}>
                <h1 className={styles.padding}>Comments for tab: {this.props.tab}</h1>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <CommentList data={this.state.data} />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
              </Col>
            </Row>
        </div>
     );
  }
}

// CommentBox.propTypes = {
//   title: T.string
// }

// CommentBox.defaultProps = {
//   title: 'board'
// }

export default CommentBox
