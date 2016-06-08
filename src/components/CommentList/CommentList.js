import React, { PropTypes as T } from 'react'
//import {Link} from 'react-router'
import Comment from 'components/Comment/Comment'
import styles from './styles.module.css';



export class CommentList extends React.Component{
   render () {
      let commentNodes = this.props.data.map(comment => {
         return(
            <Comment author={comment.author} key={comment.id}>
               {comment.text}
            </Comment>
         );
      });
      return (
         <div className="commentList">
            <h2>hi im the comment list. heres the comments:</h2>
            {commentNodes}
         </div>
      );
   }
}

export default CommentList
