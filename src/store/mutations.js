/* jshint esversion: 6 */ 
import { RECORD_USERINFO } from './mutation-types.js';
import {setStore,getStore, isEmpty} from '../utils';


export default {
	
	//获取用户信息存入vuex
	[RECORD_USERINFO](state, userInfo) {

		if(!isEmpty.userInfo){
			state.token = userInfo.token;
			state.isLogin = userInfo.isLogin;
			state.imgArr = userInfo.imgArr;
			setStore('token',state.token);
		}
		
	}
	
};
