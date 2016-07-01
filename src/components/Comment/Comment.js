import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'
import Remarkable from 'remarkable'
import styles from './styles.module.css'
import { Button, Glyphicon } from 'react-bootstrap'

//highlightjs isn't playing nice with import for right now? 
var hljs = require('highlight.js');

export class Comment extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      highlighted: false
    }
  }

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
       commentBody = 
        <code className={styles.codeBlock + " hljs"} dangerouslySetInnerHTML={this.codeBlock()} />
     }
     else {
       //otherwise use raw markup
       commentBody =
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
     }
    //  let highlightIcon;
    //  //if the comment is already favorited (state), display a filled star, otherwise don't.
    //  //follow up - have a count of # times favorited in a group?
    //  if (this.state.highlighted) {
    //   highlightIcon =
    //     <Button bsSize="small"><Glyphicon glyph="star" /></Button>
    //  }
    //  else {
    //   highlightIcon = 
    //     <Button bsSize="small"><Glyphicon glyph="star-empty" /></Button>
    //  }
      return(
         <div className={styles.comment}>
            <h2 className="commentAuthor">
               {this.props.author}
            </h2>
            <div className={styles.commentBlock}>
              {commentBody}
              {/*highlightIcon*/}
            </div>
         </div>
      );
   }

}
export default Comment