
// asyncMethods是个对象，键是model.name，值是module.async
export default (asyncMethods) => {

	return ({dispatch, getState}) => next => action => {

		let asyncAction = null;
		let actionType = action.type;

		let ifHasFieldName = actionType.indexOf('/') >=0 && actionType.indexOf('@redux') < 0 ;


		if(ifHasFieldName) {
			let fieldName = actionType.split('/')[0];
			let methodName = actionType.split('/')[1];
			asyncAction = asyncMethods[fieldName][methodName];
		}
		else {
			Object.keys(asyncMethods).map((key) => {
				if(action.type in asyncMethods[key]) {
					asyncAction = asyncMethods[key][action.type];
				}
			});
		}

		if(asyncAction) {
			return asyncAction(dispatch, getState, action.payload);
		}

		return next(action);

	}

};
