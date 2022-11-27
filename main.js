import App from './App'
import Vue from 'vue'
import request from './utils/request.js';

Vue.prototype.$get = request.get;
Vue.prototype.$post = request.post;
Vue.config.productionTip = false

uni.addInterceptor('switchTab',{
	invoke(e){
		if (!uni.getStorageSync('cookie') && e.url === "/pages/profile/profile"){
			uni.redirectTo({
				url:'/pages/loign/loign'
			})
			return false
		}
		return true
	}
})

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()