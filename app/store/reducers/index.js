import { combineReducers } from 'redux'

import jokes from './jokes'
import statistics from './statistics'

export default combineReducers({ jokes, statistics })
