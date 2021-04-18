import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
import setTitle from './common/setTitle.js'
// main.js from https://www.jianshu.com/p/d2900005b32a
import uView from "uview-ui";
Vue.use(uView);

//import Navbar custom navigation bar  https://ext.dcloud.net.cn/plugin?id=52
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
export default {
    components: {uniNavBar}
}

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.mixin(setTitle);

const i18n = new VueI18n({
	locale: 'en',
	messages: {
		'cn': require('./lang/cn.json'),
		'en': require('./lang/en.json')
	}
});

Vue.prototype._i18n = i18n
Vue.prototype.$eventHub = new Vue();
Vue.prototype.appurl='http://192.168.3.28:62210'  //自家局域网ip ipconfig
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
