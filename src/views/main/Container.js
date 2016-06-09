import React, { PropTypes as T } from 'react'

import Header     from 'components/Header/Header'
import CommentBox from 'components/CommentBox/CommentBox'
import Sidebar    from 'components/Sidebar/Sidebar'

import styles from './styles.module.css'

export class Container extends React.Component {
  // onTabClick(item) {
  //      const {push} = this.context.router;
  //      //todo: setup routing for arbitrary tabs
  //      push(`/m/${abcxyz}`);
  //      //make sure onTabClick is passed to the child component necessary.
  //   }
  
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
    //  var data = [
    //    {id: 1, author: "Pete Hunt", text: "This is one comment"},
    //    {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
    //  ];
    return (
      <div className={styles.wrapper}>
        <Header title="board" />
        <Sidebar title="sidebar" />
        <div className={styles.content}>
          {this.renderChildren()}
        </div>
        <CommentBox pollInterval={1800}
           url="http://localhost:3001/api/comments"/>
      </div>
    )
  }
}

Container.contextTypes = {
  router: T.object
}

export default Container
