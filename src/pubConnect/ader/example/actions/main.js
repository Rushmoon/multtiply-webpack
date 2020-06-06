

import ExtendMethods from './extend-methods';

export default class MainAction {
    constructor(c) {
        this.c = c;
    }

    extend = [ExtendMethods]

    didMount = () => {
        setTimeout(() => {
            this.c.setState({
                name: 'ader-example-is-running'
            });
            this.c.props.store.setData('main.description', '一个整合react的框架');
        }, 3000);
    }

    didUpdate = () => {
        console.log('has update component');

        // 从ExtendMethods继承来的方法
        this.getName();
    }

    willUnMount = () => {
        console.log('unMount component');
    }

    didInstance = () => {
        console.log('本action类已经实例化完成');
    }

    didAllInstance = () => {
        console.log('与本组件相关action全部实例化完成');
    }
}