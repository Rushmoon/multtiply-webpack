import {combineReducers} from 'react-redux'
import First from './firstReducer.js'
import Second from './secondReducer.js'

const Reduces = combineReducers({
    fir:First,
    sec:Second
});
export default Reduces;