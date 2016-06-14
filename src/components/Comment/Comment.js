import React, { PropTypes as T } from 'react'
//import {Link} from 'react-router'
import ReactDOM from 'react-dom'

import styles from './styles.module.css';

import marked, { Renderer } from 'marked'
import highlightjs from 'highlight.js'
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});
// Create your custom renderer.
// const renderer = new Renderer();
// renderer.code = (code, language) => {
//   // Check whether the given language is valid for highlight.js.
//   const validLang = !!(language && highlightjs.getLanguage(language));
//   // Highlight only if the language is valid.
//   const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
//   // Render the highlighted code with `hljs` class.
//   return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
// };

// // Set the renderer to marked.
// marked.setOptions({ renderer });

export class Comment extends React.Component {

   rawMarkup () {
      let raw = marked(this.props.children.toString(), {sanitize: true});
      return { __html: raw};
   }
//    componentDidMount () {
//     // var current = ReactDOM.findDOMNode(this);
//     // highlightjs.highlightBlock(current);
//     // console.log(current);
//  }
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
