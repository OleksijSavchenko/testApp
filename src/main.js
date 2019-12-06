import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import data from './products.json';

class TestApp {
  constructor() {
    this.el = '#app';
    if (!document.querySelector(this.el)) {
      this.errorMessage('Error! App`s container haven`t been find.')
    }
    if (process.env.NODE_ENV !== 'development') {
      Vue.config.devtools = false;
    }
  }
  init() {
    if (!this.checkDataLocalStorage()) { // check local storage
      this.load();
    }
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount(this.el)
  }
  checkDataLocalStorage() {
    if(this.checkLocalStorage()) {
      return localStorage.getItem ('products')
    }
    this.errorMessage('Sorry! LocalStorage objects are not supported in your browser.');
  }
  load() {
    localStorage.setItem ('products', JSON.stringify(
        data.products
    )); // set products`s data if storage is empty
  }
  checkLocalStorage() {
    return window.localStorage;
  }
  errorMessage(message) {
    const h1 = document.createElement('h1');
    document.body.appendChild(h1);
    h1.innerHTML= message;
    h1.style='padding:50px;text-align:center'
  }
}

const testApp = new TestApp();
testApp.init();
