import React from "react";
import './index.css'

export default class TreeShow extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }



    render() {
        const {skill} = this.props;

        return <div className={'skill'}>
            <div className={'skillContent'}>{skill}</div>
        </div>
    }
}