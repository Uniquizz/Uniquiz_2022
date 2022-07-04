import * as types from "../Constants/actionsTypes"
import * as service from "../Constants/serviceStatus";

/**
 * CLEAR STATE
 */
export const clearBuro = (dispatch, state) => () => {
	return dispatch({
		type: types.CLEAR_STATE,
	})
}


/**
 * GET USER DATA
 */

export const getRiskProfile = (dispatch, state) => (status, data={}) =>{
	let payload= {};
	switch(status){
		case service.STATUS_OK:
			const userData = data;
			payload = {
                ...state,
				user: {
                    email: userData.userEmail,
                    userName: userData.userName,
                    profileImage: userData.profileImage,
				}
			}
		break;
		case service.STATUS_ERROR:
		payload = {
			...state,
			errorState: true,
		}
		break;
	}

	return dispatch({
        type: types.GET_USER_DATA,
        payload
	});
}