import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FrameContaner extends Component {
    static childContextTypes = {
        scope: PropTypes.object
    }
    constructor(props) {
        super(props)
    }
    getChildContext() {
        return {
          scope: this.props.scope
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}
export default FrameContaner