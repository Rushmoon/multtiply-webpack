import React from 'react'
import ReactDom from 'react-dom'
import Skill from '../components/skillSquare'
import '../components/skillSquare/index.less'
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
        return <div>
            <Skill
                skill = {'qqq'}
            />
        </div>

    }
}
ReactDom.render((
    <Invoker />
),document.getElementById('app'));