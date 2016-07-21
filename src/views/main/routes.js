import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Main from './Main'
import Container from './Container'
import CommentBox from 'components/CommentBox/CommentBox'
import Landing from 'components/Landing/Landing'

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Main}>
      <IndexRoute component={Landing} />
        <Route path="b/:boardID" component={Container} />
    </Route>
  )
}

export default makeMainRoutes
