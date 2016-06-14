import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import Tab from 'components/Tab/Tab'

import styles from './styles.module.css'


export class TabList extends React.Component {
    render () {
    //for each tab passed in by tablist, do something
    let tabs = this.props.tabs.map(tab => {
        return(
            <Tab group="friends"/>
        );
    });
    //render the tabs with a temp heading
	return (
      <div className={styles.tablist}>
        <h2>tabs will go here</h2>
        {tabs}
      </div>
	);
    }
}

export default TabList
