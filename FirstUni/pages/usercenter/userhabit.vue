<template>
	<view class="wrap">
		<u-form :model="model" ref="uForm" >
			
		<u-form-item label-width="150" :label-position="left" label="采购日期" prop="shopdate">
			<u-input v-model="model.shopdate" :type="select" :border="true" @click="show = true" />
			<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
		</u-form-item>	
			
		</u-form>

		<view class="mt20">
			<u-button type="success" :ripple="true" :plain="true" shape="circle" @click="submit">提交</u-button>
		</view>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				model: {
					shopdate: '',
				},
				errorType: ['message'],
				show: false,
				actionSheetList: [
					{
						text: 'Monday'
					},
					{
						text: 'Tuesday'
					},
					{
						text: 'Wednesday'
					},
					{
						text: 'Thursday'
					},
					{
						text: 'Friday'
					},
					{
						text: 'Saturday'
					},
					{
						text: 'Sunday'
					},
				],
			
			}
			
			

		},
		onLoad() {
			_this = this;
			_this.username = uni.getStorageSync('nickname')
		},
		onReady() {
		},
		methods: {
			
			actionSheetCallback(index) {
							this.model.shopdate = this.actionSheetList[index].text;
			},
			
			submit() {
						console.log(_this.username),
						uni.request({
							url:'/apis/addShopDate',
							method: "POST",		
							data: {	
								postshopdate: _this.model.shopdate,

							},
							success: (res) => {	
								if (res.data === '') {
									_this.$refs.uToast.show({
										title: '更改成功',
										type: 'success',
										url: 'pages/usercenter/usercenter'
									});
										
								}else {
									uni.showToast({
									title: '错误',
									icon: "loading",	
									});
								}
							}
						});
			},

		}
	}
</script>


<style scoped lang="scss">
	.wrap {
		padding: 30rpx;
		background-color: #fff;
	}

</style>
