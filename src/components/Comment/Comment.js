import React, { PropTypes as T } from 'react'
//import {Link} from 'react-router'

import styles from './styles.module.css';
import marked from 'marked'
export class Comment extends React.Component {

   rawMarkup = () => {
      let raw = marked(this.props.children.toString(), {sanitize: true});
      return { __html: raw};
   }
   render() {
      return(
         <div className="comment">
            <h2 className="commentAuthor">
               {this.props.author}
            </h2>
            <span dangerouslySetInnerHTML={this.rawMarkup()} />
         </div>
      );
   }

}
export default Comment
// <div className="comment">
//    <h2 className="commentAuthor">
//       {this.props.author}
//    </h2>
//    {this.props.children}
// </div>
