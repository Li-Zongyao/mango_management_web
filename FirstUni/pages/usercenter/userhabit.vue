<template>
	<view class="wrap">
		<u-form :model="model" ref="uForm" >
			
		<u-form-item label-width="150" :label-position="'left'" label="Shopping date" prop="shopdate">
			<u-input v-model="model.shopdate" :type="'select'" :border="true" @click="show = true" />
			<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
		</u-form-item>	
			
		</u-form>

		<view class="mt20">
			<u-button type="success" :ripple="true" :plain="true" shape="circle" @click="submit">submitt</u-button>
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
				dateNumberOfList: 100,
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
			_this.username = uni.getStorageSync('nickname');
			
		},
		onReady() {
		},
		methods: {
			
			actionSheetCallback(index) {
							this.model.shopdate = this.actionSheetList[index].text;
			},
			
			submit() {
				if(_this.model.shopdate==='Sunday') 	{this.dateNumberOfList = 0}
				if(_this.model.shopdate==='Monday')  	{this.dateNumberOfList = 1}
				if(_this.model.shopdate==='Tuesday')	{this.dateNumberOfList = 2}
				if(_this.model.shopdate==='Wednesday')	{this.dateNumberOfList = 3}
				if(_this.model.shopdate==='Thursday')	{this.dateNumberOfList = 4}
				if(_this.model.shopdate==='Friday')		{this.dateNumberOfList = 5}
				if(_this.model.shopdate==='Saturday')	{this.dateNumberOfList = 6}

						console.log(_this.username),
						uni.request({
							// #ifdef APP-PLUS
							url: this.appurl+'/user/editPurchaseDate?userAccount='+ _this.username + '&date=' + this.dateNumberOfList,
							// #endif	
							// #ifndef APP-PLUS
							url:'/apis/user/editPurchaseDate?userAccount='+ _this.username + '&date=' + this.dateNumberOfList,
							// #endif
							method: "POST",		
							data: {	
								postshopdate: _this.model.shopdate,
							},
							success: (res) => {	
								if (res.data === 'update purchase date successfully') {
									_this.$refs.uToast.show({
										title: '更改成功',
										type: 'success',
										url: 'pages/usercenter/usercenter'
									});
									
									
									uni.switchTab({
										url: '/pages/usercenter/usercenter',
									    
										success() {
		                                    let page = getCurrentPages().pop();
											console.log(page);
		
		                                    if (page == undefined || page == null) return;
											//page.onLoad();
											window.location.reload();
		                                }	
										
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
