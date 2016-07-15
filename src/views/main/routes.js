import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Container from './Container'
import CommentBox from 'components/CommentBox/CommentBox'
import Landing from 'components/Landing/Landing'

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Landing}>
      <Route path="b/:boardID" component={CommentBox} />  
      {/*this will change*/}
      <Route path="temp" component={Container}/>    
    </Route>
  )
}

export default makeMainRoutes
