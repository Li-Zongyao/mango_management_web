// pages/index/index.vue
<template>
<view>
	<view>欢迎来到首页</view>
	<view class="text-blue">							
		 <text>name：{{name}}</text>						 							 
	</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
			name:'',
			}
		},
		onLoad() {
			this.name = uni.getStorageSync('nickname')
		},
		methods: {

		}
	}
</script>

<style lang="scss">

</style>