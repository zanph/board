import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import styles from './styles.module.css'


export class Tab extends React.Component {
    render () {
	return (
      <div className={styles.tab}>
        this will be a tab with prop: {this.props.group}
      </div>
	);
    }
}

export default Tab
