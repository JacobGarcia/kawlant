import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// import { Nav } from '../components'
// import { NetworkOperation } from '../lib/NetworkOperation'

class App extends Component {
  componentWillMount() {
    // TODO Verify auth
    // TODO Get user
  }

  render() {
    return (
      <div id="app">
        {/* <Nav /> */}
        <h1>React Boilerplate App</h1>
        <p>React, Redux, HotReload, Axios, React Router, Express and more</p>
        <Switch>
          {/* TODO Add routes */}
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
}

function mapDispatchToProps(dispatch) {
  return {}
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
