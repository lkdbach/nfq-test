import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
import { Routes } from './routes'
import './assets/styles/index.scss'
import { useLocalStorage } from './hooks'
import { MY_COLLECTION_KEY } from './commons/constants'
import { initMyCollection } from './stores/actions'
import { useWindowUnloadEffect } from './hooks/useWindowUnloadEffect'

const App = ({ initMyCollection, myCollection }) => {
  const [myInitCollection, setMyInitCollection] = useLocalStorage(MY_COLLECTION_KEY, [])

  useWindowUnloadEffect(() => setMyInitCollection(myCollection), true)

  useEffect(() => {
    initMyCollection(myInitCollection)
    return () => setMyInitCollection(myCollection)
  }, [])

  return (
    <div className="app-root">
      <Routes />
    </div>
  )
}

const mapStateToProps = state => ({
  myCollection: state.collection.myCollection
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators(
    {
      initMyCollection
    },
    dispatch
  )
})

App.defaultProps = {}

App.propTypes = {
  initMyCollection: PropTypes.func.isRequired,
  myCollection: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
