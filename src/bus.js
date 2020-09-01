import Vue from 'vue';

Vue.prototype.$bus = new Vue();

/**
 * @param {String} 'messsage:push' 自定義名稱
 * @param {String} message 傳入參數
 * @param {String} status 樣式，預設值為 warning
 */