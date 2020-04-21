import React from 'react'
import './index.less'
export default class DivButton extends React.Component{
    constructor(){
        super()
    }

    render() {
        const {click,className} = this.props;
        return (
            <div className={`${className}`} style={{'display':"inline-block"}}>
                <button onClick={()=>{
                    if(click && typeof click === 'function'){
                        click()
                    }
                }} className='colorChange' type={'summit'} >
                    {this.props.children}
                </button>
            </div>
        );
    }
}