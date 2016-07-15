import React, { PropTypes as T } from 'react'
import { Link } from 'react-router'
import styles from './styles.module.css'
import { Jumbotron, Button } from 'react-bootstrap'
import Remarkable from 'remarkable'
import $ from 'jquery'

//highlightjs isn't playing nice with import for right now? 
var hljs = require('highlight.js');

export class Landing extends React.Component {
    constructor(props){
        super(props)
        // this.setState({
        //     showLanding: true
        // });
    }

  handleNewBoard () {
      const {push} = this.context.router;
    //   this.setState({
    //       showLanding: false
    //   });
      push('/temp');
      $('#landing_page').fadeOut();
  }

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
        <div>
            <Jumbotron className={styles.wrapper} id="landing_page">
                <h1>Hello!</h1>
                <p>
                    board is a collaborative chat tool with support for
                    <span className={styles.mdExample} 
                    dangerouslySetInnerHTML={{__html: mdExample}}/> 
                    
                    and
                    
                    <code className={styles.codeBlock + " hljs"} 
                        dangerouslySetInnerHTML={{__html: codeExample}} />
                </p>
                <p>
                    <Button bsStyle="primary" bsSize="large" onClick={this.handleNewBoard.bind(this)}>
                        Let's get started!
                    </Button>
                    <Button bsStyle="info" bsSize="large" href="https://github.com/zanph/board">
                        <i className={styles.github + " fa fa-github-alt fa-lg"} aria-hidden="true"></i>
                        github
                    </Button>
                </p>
            </Jumbotron>
            {this.props.children}
        </div>
    );
  }
}

Landing.contextTypes = {
  router: T.object
}

export default Landing