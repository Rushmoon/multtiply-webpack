

export default class MainModel {
    name = 'main'

    data = {
        description: '这是什么'
    }

    methods = {}

    didInstance = function(store) {
        console.log('本model类实例化完成')
    }

    didAllInstance = function(store) {
        console.log('所有model类实例化完成');
    }
}