import React from 'react'
import ReactDom from 'react-dom'

import container from '../container/index.js'
import {Provider} from 'react-redux'
import Reducers from '../models/index.js'
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const store = createStore(Reducers,applyMiddleware(thunk));
ReactDom.render(
    <Provider store={store}>
        <container />
    </Provider> ,document.getElementById("app")
);


