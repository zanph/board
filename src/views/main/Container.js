import React, { PropTypes as T } from 'react'

import Header     from 'components/Header/Header'
import CommentBox from 'components/CommentBox/CommentBox'
import Sidebar    from 'components/Sidebar/Sidebar'
import Landing    from 'components/Landing/Landing'

import styles from './styles.module.css'

export class Container extends React.Component {
  constructor(props, context){
   	super(props, context);
   	
    this.state = {
       loading : true,
       board : ''
     }
  }
  
  componentDidUpdate (prevProps) {
    if (prevProps.params.boardID !== this.state.board) {
      //if we loaded a new board get its info
      this.getBoardInfo();
    }
  }
  
  componentDidMount () {
    this.getBoardInfo();
    console.log(this.state.board);
  }

  getBoardInfo () {
    console.log(this.props.params);
    //get the board name from the url
    this.setState({
      loading: true
    });
    const {boardID} = this.props.params;
    this.setState({
      loading: false,
      board: boardID
    });
  }
  

  // renderChildren() {
  //   const childProps = {
  //     ...this.props
  //   };
  //   const {children} = this.props;
  //   console.log(children);
  //   return React.Children.map(children,
  //             c => React.cloneElement(c, childProps));
  // }
  render() {
    if(this.state.loading) {
      return( <div className={styles.wrapper}>
                Loading...
              </div>
      );
    }
    //done loading, render the board and its comments
    return (
      <div className={styles.wrapper}>
        <Header title="board" />
        {/*<Sidebar title="your groups" onTabClick={this.onTabClick.bind(this)}
          activeTab={this.state.tab}/>*/}
        <CommentBox pollInterval={10000}
           url="http://localhost:3001/api/comments"
           board={this.state.board}/>
      </div>
    )
  }
}

// Container.contextTypes = {
//   router: T.object
// }
//         <div className={styles.content}>
//           {this.renderChildren()}
//         </div>

export default Container
