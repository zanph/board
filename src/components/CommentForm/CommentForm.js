import React, { PropTypes as T } from 'react'
//import {Link} from 'react-router'

import styles from './styles.module.css'
import { FormGroup, FormControl, ControlLabel, InputGroup, Button } from 'react-bootstrap'

export class CommentForm extends React.Component{
   constructor(props){
     super(props);

     this.state = {
        author: '',
        text  : '',
        showCodeBox: false
     }
   }

   handleAuthorChange (e) {
      this.setState({author: e.target.value});
   }

   handleTextChange (e) {
      this.setState({text: e.target.value});
   }

   handleSubmit (e) {
      e.preventDefault();
      let author = this.state.author.trim();
      let text = this.state.text.trim();
      if (!text || !author){ return; }
      this.props.onCommentSubmit({author: author, text: text});
      this.setState({author: '', text: ''});
   }

   handleCodeEntry () {
     //toggle expanded editor
     this.setState({ showCodeBox: !(this.state.showCodeBox)});
   }

   closeCodeBox () {
     this.setState({ showCodeBox: false });
   }
   render () {
      return(
         <form className={styles.commentForm} onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="commentEntry">
            <FormControl type="text"
               placeholder="Your Name"
               value={this.state.author}
               onChange={this.handleAuthorChange.bind(this)} 
               />
            <InputGroup>
                <InputGroup.Button>
                  <Button bsStyle="info" 
                  onClick={this.handleCodeEntry.bind(this)}>
                    Toggle code
                  </Button>
                </InputGroup.Button>
              <FormControl type="text"
                value={this.state.text}
                placeholder="Say something (with markdown!)"
                onChange={this.handleTextChange.bind(this)}
                />
                <InputGroup.Button>
                  <Button bsStyle="primary" type="submit" value="Post">
                    Post
                  </Button>
                </InputGroup.Button>
           </InputGroup>
            <FormGroup controlId="formControlsTextarea" 
              style={{display : (this.state.showCodeBox)? "block":"none"}}>
              <ControlLabel>Expanded Editor</ControlLabel>
              <FormControl componentClass="textarea" placeholder="Enter some code!" />
            </FormGroup>
          </FormGroup>

         </form>
      );
   }
}

export default CommentForm
