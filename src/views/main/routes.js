import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Container from './Container'
import CommentBox from 'components/CommentBox/CommentBox'
import Landing from 'components/Landing/Landing'

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container}>
      <Route path="b/:boardID" component={CommentBox} />
      <Route path="landing" component={Landing} />
    </Route>
  )
}

export default makeMainRoutes
