import DocumentTitle from 'react-document-title'
import React from 'react'
import {RouteHandler} from 'react-router'

// Leverage webpack require goodness for feature toggle based dead code removal.
require('../../../assets/css/app.less');

export default React.createClass({

  render() {
    return (
      <DocumentTitle title={'Collision game'}>
        <div>
          <RouteHandler />
        </div>
      </DocumentTitle>
    )
  }

})
