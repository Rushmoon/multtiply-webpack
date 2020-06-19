import React, { Component } from 'react';
import ReactDom from 'react-dom'
import { TransitionGroup } from 'react-transition-group';
import GSAP from 'react-gsap-enhancer'
import { TimelineMax, Back, Sine } from 'gsap';
import fire from "../../translate/images/appear.png"
import ice from "../../translate/images/enter.png"
import thunder from "../../translate/images/leave.png"
class Photo extends Component {
    constructor(props) {
        super(props);
    }

    componentWillEnter(callback) {
        this.addAnimation(this.enterAnim, {callback: callback})
    }

    componentWillLeave(callback) {
        this.addAnimation(this.leaveAnim, {callback: callback})
    }

    enterAnim = (utils) => {
        const { id } = this.props;
        return new TimelineMax()
            .from(utils.target, 1, {
                x: `+=${( 4 - id ) * 60}px`,
                autoAlpha: 0,
                onComplete: utils.options.callback,
            }, id * 0.7);
    };

    leaveAnim = (utils) => {
        const { id } = this.props;
        return new TimelineMax()
            .to(utils.target, 0.5, {
                scale: 0,
                ease: Sine.easeOut,
                onComplete: utils.options.callback,
            }, (4 - id) * 0.7);
    };

    render() {
        const { url } = this.props;
        return (
            <div className="photo">
                <img src={url} />
            </div>
        )
    }
}

const WrappedPhoto = GSAP()(Photo);

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            photos: [{
                id: 1,
                url: fire
            }, {
                id: 2,
                url: ice
            }, {
                id: 3,
                url: thunder
            }]
        };
    }

    toggle = () => {
        this.setState({
            show: !this.state.show
        })
    };

    render() {
        const { show, photos } = this.state;

        const renderPhotos = () => {
            return photos.map((item, index) => {
                return <WrappedPhoto id={item.id} url={item.url} key={`photo${item.id}`} />;
            })
        };

        return (
            <div>
                <button onClick={this.toggle}>toggle</button>
                <TransitionGroup component="div">
                    {show && renderPhotos()}
                </TransitionGroup>
            </div>
        );
    }
}
ReactDom.render(<Gallery/>,document.getElementById("app"));