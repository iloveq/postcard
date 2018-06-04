import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';

Vue.use(Vuex);

const state = {
	login: true,//是否登录
	imgArr:"",//头像avatar
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})