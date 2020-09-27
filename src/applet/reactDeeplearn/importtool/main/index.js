import Component from '../container/index.js'
import Start from "../reHook/start";
import ReactDOM from 'react-dom'
import model from "../model/main.js"
import './index.less'


// 孙组件

ReactDOM.render(<Start model = {model}>
    <Component />
</Start>, document.getElementById('app'));