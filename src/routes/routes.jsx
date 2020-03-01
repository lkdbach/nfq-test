import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CollectionPage, SearchPage, VideoPage } from '../pages'
import { SEARCH, COLLECTION, VIDEO } from './route.constants'

const Routes = () => {
  return (
    <Switch>
      <Route component={SearchPage} path={SEARCH} />
      <Route component={VideoPage} path={VIDEO} />
      <Route component={CollectionPage} exact path={COLLECTION} />
    </Switch>
  )
}

export default Routes
