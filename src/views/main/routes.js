import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Container from './Container'
import CommentBox from 'components/CommentBox/CommentBox'
import IndexPage from './indexPage/IndexPage'

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container}>
      <Route path="m/:tabID" component={CommentBox} />
      {/* Lazy-loading */}
      <Route path="about" getComponent={(location, cb) => {
          require.ensure([], (require) => {
            const mod = require('./about/About');
            cb(null, mod.default);
          });
        }} />
      {/* inline loading */}

    </Route>
  )
}

export default makeMainRoutes
//<IndexRoute component={IndexPage} />
