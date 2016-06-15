import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import styles from './styles.module.css'


export class Tab extends React.Component {


    render () {
        return (
            <div className={styles.tabForm}>
                this is a tab. its name is:<br/>
                {this.props.name}      
            </div>
        );
    }
}

export default Tab
