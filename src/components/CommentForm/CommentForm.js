import React, { PropTypes as T } from 'react'
//import {Link} from 'react-router'

import styles from './styles.module.css'
import { FormGroup, FormControl, HelpBlock, ControlLabel, 
  InputGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap'
import $ from 'jquery'


export class CommentForm extends React.Component{
   constructor(props){
     super(props);
     const crypto = require('crypto');
     let tempName;
     crypto.randomBytes(2, function(err, buffer) {
      tempName = buffer.toString('hex');
     });
     this.state = {
        author:       'anon-'+tempName,
        text  :       '',
        expandedText: '', //for the expanded editor
        showCodeBox:  false,
        idLocked:     false, //maybe this should just be 'name set'
        isCode:       false
     }
   }

   handleAuthorChange (e) {
      this.setState({author: e.target.value});
   }

   lockUserID () {
     this.setState({ idLocked: true });
   }

   handleTextChange (e) {
      this.setState({text: e.target.value});
   }

   handleExpandedTextChange (e) {
     this.setState({expandedText: e.target.value});
   }

   handleSubmit (e) {
      e.preventDefault();
      let author = this.state.author.trim();
      let text = this.state.text.trim();
      if (!text || !author){ return; }
      this.props.onCommentSubmit({author: author, text: text, isCode: false});
      this.setState({text: ''});
   }

   handleExpandedSubmit (e) {
      e.preventDefault();
      let author = this.state.author.trim();
      let text = this.state.expandedText.trim();
      if (!text || !author){ return; }
      //todo: add lang value to this function call?
      //todo: if(code button is toggled) isCode: true;
      console.log(text);
      this.props.onCommentSubmit({author: author, text: text, isCode: this.state.isCode});
      this.setState({expandedText: ''});
   }

   handleCodeEntry () {
     /*********partial implementation************ */
     //if the user clicks 'toggle' and the regular input has text but the
     //expanded doesn't, copy the text over to the expanded input.
    //  if(this.state.expandedText === '' && this.state.text !== '') {
    //    this.setState({ expandedText: this.state.text});
    //  }
     //toggle expanded editor
     this.setState({ showCodeBox: !(this.state.showCodeBox)});
   }

   handleToggleCode () {
     this.setState({
       isCode: !(this.state.isCode)
     });
   }
   
   render () {
      return(
        <div className={styles.commentFormContainer}>
         <form className={styles.commentForm} 
          onSubmit={this.handleSubmit.bind(this)}
          >
          <FormGroup controlId="commentEntry">
            <ControlLabel>Your id</ControlLabel>
            <div className={styles.idForm}>
              <FormControl type="text"
               placeholder="Your Name"
               value={this.state.author}
               onChange={this.handleAuthorChange.bind(this)} 
               disabled={this.state.idLocked}
               id="user_id_display"
                 />
              <Button className={styles.editID}
                onClick={this.lockUserID.bind(this)}
                disabled={this.state.idLocked}
                >
                <i className={"fa fa-check"} aria-hidden="true"></i>
              </Button>
            </div>
            <HelpBlock id="user_id_note">
              Your ID is set automatically. You can change it once per session.
            </HelpBlock>
            <InputGroup>
                <InputGroup.Button>
                  <Button bsStyle="info" 
                  onClick={this.handleCodeEntry.bind(this)}>
                    Expanded Editor
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
          </FormGroup>
         </form>

         <form className={styles.expandedCommentForm} 
          onSubmit={this.handleExpandedSubmit.bind(this)}
          >
            <FormGroup controlId="formControlsTextarea" 
              style={{display : (this.state.showCodeBox)? "block":"none"}}
              >
                <ControlLabel>Expanded Editor</ControlLabel>
                <FormControl componentClass="textarea" 
                placeholder={this.state.isCode ? "Enter some code!" : "Enter some markdown!"} 
                onChange={this.handleExpandedTextChange.bind(this)}/>
              <Button id="preview-post" disabled='true'>
                Preview
              </Button>
              <Button bsStyle="info" onClick={this.handleToggleCode.bind(this)}>
                {this.state.isCode ? 'Code' : 'Markdown'}
              </Button>
              <Button bsStyle="primary" type="submit" value="Post">
                Post
              </Button>
            </FormGroup>
         </form>
        </div>
      );
   }
}

export default CommentForm
