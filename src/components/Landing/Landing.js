import React from 'react'
import styles from './styles.module.css';
import { Jumbotron, Button } from 'react-bootstrap'
import Remarkable from 'remarkable'
import 'font-awesome/css/font-awesome.css'

//highlightjs isn't playing nice with import for right now? 
var hljs = require('highlight.js');

export class Landing extends React.Component {
  render() {
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

    const mdExample = md.render('`markdown`');
    const codeExample = md.options.highlight('while(true) {std::cout << "code blocks!";}', 'c++');
    return (
        <div className={styles.wrapper}>
            <Jumbotron>
                <h1>Hello!</h1>
                <p>
                    board is a collaborative chat tool with support for
                    <span className={styles.mdExample} 
                    dangerouslySetInnerHTML={{__html: mdExample}}/> 
                    
                    <p>and</p>
                    
                    <code className={styles.codeBlock + " hljs"} 
                        dangerouslySetInnerHTML={{__html: codeExample}} />
                </p>
                <p>
                <Button bsStyle="primary" bsSize="large">Let's get started!</Button>
                <Button bsStyle="info" bsSize="large"><i className="fa fa-github fa-lg" aria-hidden="true"></i>github</Button>
                </p>
            </Jumbotron>
        </div>
    );
  }
}

export default Landing