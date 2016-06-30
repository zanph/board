import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import styles from './styles.module.css'
import { Button } from 'react-bootstrap'


export class Tab extends React.Component {

    update () {
        this.props.onTabClick(this);
    }


    /*important: 
    *
    * right now we use props to determine whether the tab is active, but this is probably better
    * represented as state? worth looking at .... 
    */
    render () {        
        return (
            <Button onClick={this.update.bind(this)} 
                bsStyle="default" bsSize="large" block 
                active={(this.props.active) ? true : false} >
                {this.props.name}
            </Button>
        );
    }
}

export default Tab
