import React, { PropTypes as T } from 'react'
//import {Link} from 'react-router'

import styles from './styles.module.css'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

export class CommentForm extends React.Component{
   constructor(props){
     super(props);

     this.state = {
        author: '',
        text  : ''
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

   render () {
      return(
         <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="commentEntry">
            <FormControl type="text"
               placeholder="Your Name"
               value={this.state.author}
               onChange={this.handleAuthorChange.bind(this)} />
            <FormControl
              type="text"
              value={this.state.text}
              placeholder="Say something (with markdown!)"
              onChange={this.handleTextChange}
            />
            <Button bsStyle="primary" bsSize="small" type="submit" value="Post">
              Post
            </Button>
          </FormGroup>
         </form>
      );
   }
}

export default CommentForm
