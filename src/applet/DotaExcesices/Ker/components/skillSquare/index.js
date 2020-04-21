import React from "react";
import './index.less'

export default class TreeShow extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }



    render() {
        const {skill,image,className,click} = this.props;
        return <div className={`skill ${className}`}>
            <div className='skillContent' onClick={()=>{
                if(click && typeof click === 'function'){
                    click()
                }
            }}>
                <If condition = {!image}>
                    <div className={'empty'}> </div>
                </If>
                <If condition = {image}>
                    <img className='imageStyle' src={image}/>
                </If>

            </div>
            <p>{skill}</p>
        </div>
    }
}