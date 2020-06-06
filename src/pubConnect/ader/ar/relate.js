import React, { Component } from 'react';

export default function relate(Com) {
	class Relate extends Component {
		constructor(props) {
			super();

			let data = props.store.getData();

			props.store.pubSub.subscribe('CALL_SET_DATA', () => {
				let data = props.store.getData();
				this.setState({
					...data.value
				});
			});

			this.state = {
				...data.value
			};
		}

		render() {
			return <Com {...this.state} {...this.props} ref={ref => this.ins = ref}/>;
		}
	}

	return Relate;
}
