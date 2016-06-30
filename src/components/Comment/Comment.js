import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'
import Remarkable from 'remarkable'
import styles from './styles.module.css'

//highlightjs isn't playing nice with import for right now? 
var hljs = require('highlight.js');

export class Comment extends React.Component {

  codeBlock () {
    //setup the default highlighting function for Remarkable
    var md = new Remarkable({
      highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}

      return ''; // use external default escaping
    }
    });
    //todo use this.props.lang instead of hardcoding
    let code = md.options.highlight(this.props.children.toString(), "c++");
    return { __html: code };
  }

   rawMarkup () {
      let md = new Remarkable();
      let raw = md.render(this.props.children.toString(), {sanitize: true});
      return { __html: raw };
   }
   render() {
     let commentBody;
     //if the comment is code, render it as a code block
     //i.e. use highlightjs classes
     if (this.props.code) {
       console.log(this.codeBlock()); 
       commentBody = 
        <code className={styles.codeBlock + " hljs"} dangerouslySetInnerHTML={this.codeBlock()} />
     }
     //otherwise use the raw markup
     else {
       commentBody =
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
     }

     console.log(commentBody);
      return(
         <div className="comment">
            <h2 className="commentAuthor">
               {this.props.author}
            </h2>
            {commentBody}
         </div>
      );
   }

}
export default Comment