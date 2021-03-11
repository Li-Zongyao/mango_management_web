import Vue from 'vue'
import App from './App'

// main.js from https://www.jianshu.com/p/d2900005b32a
import uView from "uview-ui";
Vue.use(uView);

//import Navbar custom navigation bar  https://ext.dcloud.net.cn/plugin?id=52
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
export default {
    components: {uniNavBar}
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
