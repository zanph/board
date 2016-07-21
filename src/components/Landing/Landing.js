import React, { PropTypes as T } from 'react'
import { Link } from 'react-router'
import styles from './styles.module.css'
import { Jumbotron, Button } from 'react-bootstrap'
import Remarkable from 'remarkable'
import $ from 'jquery'

//highlightjs isn't playing nice with import for right now? 
var hljs = require('highlight.js');

export class Landing extends React.Component {
    constructor(props) {
        super(props)
    }
    
    postNewBoard() {
        const board = Math.random().toString(36).replace(/([^a-z])+/g, '').substr(0,7);
        console.log(board);
        $.ajax({
            //how to pass this in via props??
            url: 'http://localhost:3001/api/board/new',
            dataType: 'json',
            data: {board: board},
            type: 'POST',
            success: function(data) {

            }.bind(this),
            error: function(xhr, status, err) {
                //if the board already exists, try another one
                console.error(err);
                if(err === 'BOARD_EXISTS') { this.postNewBoard(); }
                //else handle it
                else { return ''; }
            }.bind(this)
        });
        return board;
    }
    
    handleNewBoard () {
        const {push} = this.context.router;
        const url = this.postNewBoard();
        console.log('url: ' + url);
        if(!url) {
            //an error occurred!
            console.error('no url provided!');

        }
        push('/b/' + url);
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
                            view board on github
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