


export default class ExtendsMethods {
    constructor(sourceAction, component) {
        this.c = component
    }

    getName = () => {
        console.log(`名字是${this.c.state.name}`);
        console.log(this.c.props.store.getData('main.description'));
    }
}