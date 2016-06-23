import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import TabBox from 'components/TabBox/TabBox'
import styles from './styles.module.css'


export class Sidebar extends React.Component {
    render () {
	return (
      <div className={styles.sidebar}>
         <div className={styles.heading}>
	      <h1>{this.props.title}</h1>
	     </div>
		  <TabBox pollInterval={1800}
           url="http://localhost:3001/api/tabs"
		   onTabClick={this.props.onTabClick.bind(this)}/>
	   </div>
	);
    }
}

export default Sidebar
