import React, { PropTypes as T } from 'react'

import classnames from 'classnames'
import styles from './styles.module.css'

//Tab listings are groups that a user can click in the sidebar to
//view a different conversation. (chat groups, PMs, etc)
export class GroupItem extends React.Component {
    render () {
        //just a link (will probably want to do dynamic routing with a hash for each
        //listing the user creates)
	return (
        <a href="/">{this.props.name}</a>
	);
    }
}

export default GroupItem
