import React, { PropTypes as T } from 'react'
import $ from 'jquery' //todo remove jquery dependency, see note in handleCommentSubmit

import styles from './styles.module.css'
import CommentList from 'components/CommentList/CommentList'
import CommentForm from 'components/CommentForm/CommentForm'
import {Grid, Row, Col, Alert} from 'react-bootstrap'


export class CommentBox extends React.Component {
   constructor(props) {
     super(props);

     this.state = {
        data : [],
        alertVisible: true
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
       data: {comment: comment, boardName: this.props.board},
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
     console.log(this.props.board);
      $.ajax({
         url: this.props.url,
         data: {boardName: this.props.board},
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

   handleAlertDismiss () {
     this.setState({ alertVisible: false });
   }

   componentDidMount () {
      this.loadCommentsFromServer();
      setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
   }

   render() {
     let hideAlert = this.state.alertVisible ? false : true;
     return(
       <div className={styles.content}>
            <Row className={styles.shareMessage} hidden={hideAlert}>
              <Col xs={12}>
                  <Alert bsStyle="info" onDismiss={this.handleAlertDismiss.bind(this)}>
                    <span>Want to share your board with classmates or 
                    friends? Give them this link!
                    </span>
                    {/* link logic goes here */}
                  </Alert>
              </Col>
            </Row>
            <Row className={styles.commentList}>
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
