import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory, Route, IndexRedirect } from 'react-router'
import process from 'nprogress'
import Components from './Components/index.js'
import Button from 'bocomui/Button'

import './common.less'

render((
  <Router onUpdate={() => {
    process.done()
    window.scrollTo(0, 0)
  }} history={hashHistory}>
    <Route
      path="/"
      onEnter={() => process.start()}
      onChange={() => process.start()}
      component={Components}
    >
      <IndexRedirect to="/Button" />
      <Route path=":component" getComponent={(nextState, cb) => {
          const component = nextState.location.pathname.split('/').pop()
          require.ensure([], require => {
            cb(null, require(`./Components/docs/${component}.doc`).default)
          })
        }} />
    </Route>
  </Router>
), document.getElementById('app'));
