import React, { PropTypes as T } from 'react'
//import {Link} from 'react-router'
import ReactDOM from 'react-dom'
import Remarkable from 'remarkable'
import styles from './styles.module.css'

//import highlightjs from 'highlight.js'

export class Comment extends React.Component {

   rawMarkup () {
     let md = new Remarkable(); 
     let raw = md.render(this.props.children.toString(), {sanitize: true});
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
