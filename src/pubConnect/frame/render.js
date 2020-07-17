
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import BaseComponent from './BaseComponent';

export default (config = {}) => {

    return (renderFn) => {

        let {
            actions = {}, 
            state = {}, 
            init = () => {},
            ...others
        } = config;

        class CustomComponentWithAction extends BaseComponent {
            static contextTypes = {
                scope: PropTypes.object
            }
            constructor(props) {
                super(props);
                
                this.state = state;

                this.loadActions();
            }

            actions = actions
    
            render() {
                const Wrapper = renderFn({
                    props: this.props, 
                    action: this.action, 
                    state: this.state,
                    scope: this.context.scope
                }, others);
                return Wrapper;
            }
        }

        return CustomComponentWithAction;
    }
}