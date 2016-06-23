import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import styles from './styles.module.css'


export class Tab extends React.Component {

    update () {
        console.log(this.props);
        this.props.onTabClick(this);
    }

    render () {
        return (
            <div className={styles.tabForm}>
                this is a tab. its name is:<br/>
                {this.props.name}      
                <input type="button" onClick={this.update.bind(this)} value="Update"/>
            </div>
        );
    }
}

export default Tab
