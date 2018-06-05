/* jshint esversion: 6 */
import { RECORD_USERINFO, GET_USERINFO, CLEAR_USERINFO } from './mutation-types.js';
import { setStore, getStore, isEmpty, removeStore } from '../utils';


export default {

	//存储userinfo
	[RECORD_USERINFO](state, userInfo) {

		if (!isEmpty.userInfo) {
			state.token = userInfo.token;
			state.isLogin = userInfo.isLogin;
			state.imgArr = userInfo.imgArr;
			setStore('token', state.token);
		}

	},
	//清空用户信息
	[CLEAR_USERINFO](state) {
		removeStore('token');
		state.token = ""
		state.isLogin = false;
		state.imgArr = "";
	},


};
