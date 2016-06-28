import React, { PropTypes as T } from 'react'

import Header     from 'components/Header/Header'
import CommentBox from 'components/CommentBox/CommentBox'
import Sidebar    from 'components/Sidebar/Sidebar'

import styles from './styles.module.css'

export class Container extends React.Component {
  constructor(props){
   	super(props);

   	this.state = {
       tab : 'chat'
     }
    
  }
  onTabClick(tab) {
    /* when a tab is clicked, we push to a new view (of its comments) */
    //const {push} = this.context.router
    console.log(tab);
    this.setState({tab: tab.props.name});
    //push(`/m/${tab.id}`);
    //make sure onTabClick is passed to the child component necessary.
    }
  
  renderChildren() {
    const childProps = {
      ...this.props
    };
    const {children} = this.props;
    console.log(children);
    return React.Children.map(children,
              c => React.cloneElement(c, childProps));
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <Header title="board" />
        <Sidebar title="sidebar" onTabClick={this.onTabClick.bind(this)}
          activeTab={this.state.tab}/>
        <CommentBox pollInterval={1800}
           url="http://localhost:3001/api/comments"
           tab={this.state.tab}/>
      </div>
    )
  }
}

Container.contextTypes = {
  router: T.object
}
//         <div className={styles.content}>
//           {this.renderChildren()}
//         </div>

export default Container
