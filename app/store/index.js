import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers'

const enhancer = process.env.NODE_ENV !== 'production' ? composeWithDevTools(applyMiddleware()) : applyMiddleware()

const makeStore = state => createStore(
  reducer,
  state,
  composeWithDevTools(applyMiddleware()),
)

export default makeStore
