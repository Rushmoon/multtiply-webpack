import {connect} from "react-redux";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
	return {
		dispatch
	}
};

export default (component) => {
	return connect(mapStateToProps, mapDispatchToProps)(component);
}
