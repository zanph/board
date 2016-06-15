import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import Tab from 'components/Tab/Tab'

import styles from './styles.module.css'


export class TabList extends React.Component {



    render () {
    //for each tab passed in by tablist, do something
    //tabs is a list of objects like {name: "name"}
    let tabs = this.props.tabs.map(tab => {
        return(
            <Tab name={tab.name} key={tab.id} />
        );
    });
    //render the tabs with a temp heading
	return (
      <div className={styles.tablist}>
        <h2>this is the TabList. it lists tabs.</h2>
        {tabs}
      </div>
	);
    }
}

export default TabList
