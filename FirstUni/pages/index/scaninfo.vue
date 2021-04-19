<template>
	<view>
		<view class="codeData">{{$t('scan.text')}}{{codeData}}</view>
		<button class="codeBtn" type="primary" @tap="open">{{$t('scan.title')}}</button>
		<button class="codeBtn" type="primary" @tap="submit()">submit</button>
		<u-form-item  label-width="150" :label-position="labelPosition" label="amount" prop="amount">
			<u-input :border="border" placeholder="Please input amount(default:1)" v-model="model.amount" type="text"></u-input>
		</u-form-item>
		<u-form-item :label-position="labelPosition" label="price" prop="price" label-width="150">
			<u-input :border="border" placeholder="Please input price" v-model="model.price" type="text"></u-input>
		</u-form-item>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				codeData: '', //goodsname
				status:'',//scan status
				model: {
					name: '',
					amount:'1',
					unit:'',
					sellerID:'',
					price:'',
				},
				username:'',
				border: false,
				errorType: ['message'],
				labelPosition: 'left',
			}
		},
		methods: {
			// 扫码
			open() {
				uni.navigateTo({
					url: './scan'
				});
			},
			submit() {
						let _this=this;
						console.log(_this.username);
						console.log(_this.model.amount);
						console.log(_this.codeData);
						if(_this.status!='1'){ 
							uni.showToast({
							title: '添加商品失败',
							icon: "loading",	
							});
							return;
							}
						uni.request({
							// #ifdef APP-PLUS
							url: this.appurl+'/item/addNewItemIntoStorage?userAccount='+ _this.username + '&number='+ 1 ,
							// #endif	
							// #ifndef APP-PLUS
							url:'/apis/item/addNewItemIntoStorage?userAccount='+ _this.username + '&number='+ 1 ,
							// #endif
							method: "POST",		
							data: {	
								itemName:_this.codeData,
								sellerID:'',
								amount:_this.model.amount,
								unit:'',
								price:_this.model.price,
							},
							success: (res) => {	
								if (res.data = 'Update item and storage successfully.') {
									// _this.$refs.uToast.show({
									uni.showToast({
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
												// #ifdef APP-PLUS
												window.location.reload();
												// #endif	
												// #ifndef APP-PLUS
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
		},
		onReady() {

		},
		onLoad(data) {
		let _this=this;
		_this.username = uni.getStorageSync('nickname');
		_this.$eventHub .$on("scanResult", function(data) {
			console.log(data);
			_this.codeData = data.result;
			_this.status=data.status;
			_this.model.price=data.price;
		});
		},
	}
</script>

<style>
	.codeData{
		height: 300rpx;
		width: 690rpx;
		margin: 30rpx;
		border: 1px solid #efefef;
		text-align: justify;
		text-justify: newspaper;
		word-break: break-all;
	}
	.codeBtn{
		width: 50%;
		margin: 10rpx auto;
	}
</style>
