import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import TabList from 'components/TabList/TabList'
import TabForm from 'components/TabForm/TabForm'

import styles from './styles.module.css'

export class TabBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs : []
        }
    }
    handleNewTab (newTab) {
        let oldTabs = this.state.tabs;
        let newTabs = oldTabs.concat([newTab]);
        newTab.id = Date.now();
        //we'll be optimistic and show the new tab before the server sees it
        this.setState({tabs : newTabs});
        /*todo: make server request and set tabs here*/
        //make server request
        //if there's an error, reset the state
    }
    
    loadTabsFromServer () {
        //todo//
    }

   componentDidMount () {
      this.loadTabsFromServer();
      setInterval(this.loadTabsFromServer.bind(this), this.props.pollInterval);
   }
   render () {
       return (
           <div className={styles.tabBox}>
            <h2> i'm the tab box. i contain the tab list </h2>
            <TabList tabs={this.state.tabs} />
            <TabForm onTabSubmit={this.handleNewTab.bind(this)} />
           </div>
       );
   }


}

export default TabBox