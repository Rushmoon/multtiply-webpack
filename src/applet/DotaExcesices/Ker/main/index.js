import React from 'react'
import ReactDom from 'react-dom'
import Skill from '../skill'
import ReactTree from "../../../simpleTree/tree/container";

class Invoker extends React.Component {
    constructor(){
        super();
        this.state = {
            Q:'ice',
            W:'thunder',
            E:'fire',
            firstSkill:null,
            secondSkill:null
        }
    }

    render() {
        return
            <Skill {...this.props} />

    }
}
ReactDom.render((
    <Invoker />
),document.getElementById('app'))