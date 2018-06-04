/* jshint esversion: 6 */ 
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';

Vue.use(Vuex);

const state = {

	token:"",
	isLogin: false,//是否登录
	imgArr:"",//头像avatar
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
});