/* jshint esversion: 6 */ 
import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import home from '@/components/HomePage';
import personal from '@/components/PersonalPage';
import toolbar from '@/components/Toolbar';
import snapbar from '@/components/Snapbar';

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/toolbar',
      name: 'toolbar',
      component: toolbar
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/snapbar',
      name: 'snapbar',
      component: snapbar
    },
  ]
})
