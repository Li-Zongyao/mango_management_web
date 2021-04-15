<template>
	<view class="wrap">
		<u-form :model="model" ref="uForm" :errorType="errorType">
			<u-form-item  label-width="150"
			 :label-position="labelPosition" label="Item name" prop="name">
				<u-input :border="border" placeholder="Please input NAME of the item" v-model="model.name" type="text"></u-input>
			</u-form-item>


<!-- 			<u-form-item :label-position="labelPosition" label="sellerID" prop="sellerID" label-width="150">
				<u-input :border="border" placeholder="Please input SellerID" v-model="model.sellerID" type="text"></u-input>
			</u-form-item>
			 -->
			
			<u-form-item  label-width="150" :label-position="labelPosition" label="amount" prop="amount">
				<u-input :border="border" placeholder="Please input amount" v-model="model.amount" type="text"></u-input>
			</u-form-item>
			
			<u-form-item :label-position="labelPosition" label="unit" prop="unit" label-width="150">
				<u-input :border="border" placeholder="Please input unit" v-model="model.unit" type="text"></u-input>
			</u-form-item>
			
			<u-form-item :label-position="labelPosition" label="price" prop="price" label-width="150">
				<u-input :border="border" placeholder="Please input price" v-model="model.price" type="text"></u-input>
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
					name: '',
					amount:'',
					unit:'',
					sellerID:'0',
					price:'',
				},

				actionSheetShow: false,
				pickerShow: false,
				border: false,
				errorType: ['message'],
				labelPosition: 'left',
				selectList: [],
				unitList: [],
				unitListShow: false,
				number:2,
				username:'',
			}

		},
		onLoad() {
			_this = this;
			_this.username = uni.getStorageSync('nickname')
		},
		onReady() {
		},
		methods: {
			submit() {
						console.log(_this.username),
						uni.request({
							url:'/apis/item/addNewItemIntoStorage?userAccount='+ _this.username + '&number='+ 0 ,
							method: "POST",		
							data: {	
								itemName:_this.model.name,
								sellerID:_this.model.sellerID,
								amount:_this.model.amount,
								unit:_this.model.unit,
								price:_this.model.price
							},
							success: (res) => {	
								if (res.data = 'Update item and storage successfully.') {
									_this.$refs.uToast.show({
										title: '添加成功',
										type: 'success',
										url: '/pages/index/index'
									});
									uni.switchTab({
										url: '/pages/index/index',
										
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
									title: '输入数据类型错误',
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
