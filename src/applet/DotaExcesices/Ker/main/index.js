import React from 'react'
import ReactDom from 'react-dom'
import Skill from '../components/skillSquare'
import images from '../public/image.js'
import MYButton from '../public/button/button.js'
import './index.less'
class Invoker extends React.Component {
    constructor(){
        super();
        this.state = {
            skillStatus:[],
            eleMap:{
                'Q':'ice',
                'W':'thunder',
                'E':'fire',
            },
            map: {
                'QQQ': 'rapidCool',
                'QQW': 'hurryStorm',
                'QQE': 'iceWall',
                'WWW': 'magneticStorm',
                'WWQ': 'ghostWalk',
                'WWE': 'quiteSmart',
                'EEE': 'skyFire',
                'EEQ': 'furnaceSpirit',
                'EEW': 'Meteorite',
                'QWE': 'superWave',
            },
            DIndex:{
                skillName:'???',
                image:null
            },
            FIndex:{
                skillName:'???',
                image:null
            },
        };
    }
    initData = ()=>{
      console.log(images);
      // this.ImageArr.push()
    };
    componentDidMount() {
        // this.initData();
        window.addEventListener('keypress',this.handleEntryKey)
    }

    componentWillUnmount() {
        window.removeEventListener("keypress",this.handleEntryKey);
    }
    handleEntryKey = (e)=>{
        if(e.keyCode === 101){
            this.printE()
        }
        else if(e.keyCode === 113){
            this.printQ()
        }
        else if(e.keyCode === 119){
            this.printW()
        }else if (e.keyCode === 114){
            this.printMake()
        }
        else {
            console.log(e.key);
            console.log(e.keyCode)
        }
    };
    onclick = ()=>{
        console.log('print so the start')
    };
    printQ = ()=>{
        console.log('printQ');
        let result = [...this.state.skillStatus];
        result.push('Q');
        if(result.length > 3){
            result = result.slice(-3)
        }
        this.setState({
            skillStatus:result
        })
    };
    printW = ()=>{
        console.log('printW');
        let result = [...this.state.skillStatus];
        result.push('W');
        if(result.length > 3){
            result = result.slice(-3)
        }
        this.setState({
            skillStatus:result
        })
    };
    printE = ()=>{
        console.log('printE');
        let result = [...this.state.skillStatus];
        result.push('E');
        if(result.length > 3){
            result = result.slice(-3)
        }
        this.setState({
            skillStatus:result
        })
    };
    printMake = ()=>{
        console.log('makeMagic');
        console.log(this.state.skillStatus);
        let currentEle = [...this.state.skillStatus];
        let magic = '';
        if(new Set(currentEle).size !== currentEle.length){
            let temp = '';
            if(currentEle[2] === currentEle[0]){
                temp = currentEle[1];
                currentEle[1] = currentEle[2];
                currentEle[2] = temp
            }else if(currentEle[2] === currentEle[1]){
                temp = currentEle[0];
                currentEle[0] = currentEle[2];
                currentEle[2] = temp
            }
        }else{
            console.log(currentEle);
            magic = 'QWE'
        }
        if(magic !== 'QWE'|| magic ==='') {
            magic = currentEle[0] + currentEle[1] + currentEle[2]
        }
        let currentD = {...this.state.DIndex};
        let map = {...this.state.map};
        let skillName = map[magic];
        if(!currentD.image){
            this.setState({
                DIndex:{
                    skillName:skillName,
                    image:images[skillName]
                },
            });
        }else {
            this.setState({
                FIndex:currentD,
                DIndex:{
                    skillName:skillName,
                    image:images[skillName]
                },
            });
        }

        console.log(magic)
    };
    
    render() {
        return <div>
            <div className='head'>
                {"WELCOME TO THE KAERSKILLS EXERCISE"}
                <MYButton
                    className = {'rt'}
                    click = {this.onclick}
                >
                    开始
                </MYButton>
            </div>

            <div className={'randomBody'}>
                <Skill
                    className = {'skillBox'}
                    // image = {images.ice}
                    skill = {'???'}
                />
            </div>
            <If condition = {this.state.skillStatus.length > 0}>
                <div className={'randomBody'}>
                    {
                        this.state.skillStatus.map((item,index)=>{
                            let name = this.state.eleMap[item];
                            return(
                                <div
                                    className = {'littleBall'}
                                ><img className={'ballImage'} src={images[name]} /></div>
                            )
                        })
                    }
                </div>
            </If>
            <div className='body'>
                <Skill
                    className = {'skillBox'}
                    // image = {images.ice}
                    click = {this.printQ}
                    skill = {'ice'}
                />
                <Skill
                    className = {'skillBox'}
                    // image = {images.thunder}
                    click = {this.printW}
                    skill = {'thunder'}
                />
                <Skill
                    className = {'skillBox'}
                    // image = {images.fire}
                    click = {this.printE}
                    skill = {'fire'}
                />
                <Skill
                    className = {'skillBox'}
                    image = {this.state.DIndex.image}
                    // click = {}
                    skill = {this.state.DIndex.skillName}
                />
                <Skill
                    className = {'skillBox'}
                    image = {this.state.FIndex.image}
                    // click = {}
                    skill = {this.state.FIndex.skillName}
                />
                <Skill
                    className = {'skillBox'}
                    // image = {images.magicMake}
                    click = {this.printMake}
                    skill = {'magicMake'}
                />
            </div>
        </div>

    }
}
ReactDom.render((
    <Invoker />
),document.getElementById('app'));