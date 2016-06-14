import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import TabList from 'components/TabList/TabList'
//import Listing from 'components/Listing/Listing'
import styles from './styles.module.css'


export class Sidebar extends React.Component {
    render () {
	return (
      <div className={styles.sidebar}>
         <div className={styles.heading}>
	      <h1>{this.props.title}</h1>
		  <TabList />
	    </div>
	   </div>
	);
    }
}

export default Sidebar
