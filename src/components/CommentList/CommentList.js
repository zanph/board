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
      const test = "for(int i = 0; i < max; ++i){\n  std::cout << this->name(i);\n}";
      return (
         <div className={styles.commentList}>
            <pre className="prettyprint lang-c++">{test}</pre>
            {commentNodes}
         </div>
      );
   }
}

export default CommentList
