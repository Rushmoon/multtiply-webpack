import React from 'react';
import ReactDom from 'react-dom';
import {startModel, register, relate} from '../index';

import MainModel from './models/main';
import HomePage from './container';


register([MainModel]);

const HomePageWithModel = relate(HomePage);

let store = startModel();


ReactDom.render(<HomePageWithModel store={store} />, document.getElementById('app'));
