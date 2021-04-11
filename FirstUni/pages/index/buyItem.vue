<template>
	<view class="wrap">
		<u-form :model="model" ref="uForm" :errorType="errorType">
<!-- 			<u-form-item  label-width="150"
			 :label-position="labelPosition" label="物品名称" prop="name">
				<u-input :border="border" placeholder="Please input NAME" v-model="model.name" type="text"></u-input>
			</u-form-item> -->
			
<!-- 			<u-form-item label-width="150" :label-position="labelPosition" label="List" prop="addNewItemName">
				<u-input v-model="model.addNewItemName" :type="selectType" :border="true" @click="show = true" />
				<u-action-sheet :list="readFromActionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
			</u-form-item> -->	
			
			<u-form-item label-width="150" :label-position="labelPosition" label="Item Picker" prop="addPickerNewItemName">
	
<!-- 				<u-button class="button-Item-Picker" v-model="model.addPickerNewItemName = readFromActionSheetList[index]" :type="selectType" :border="true" @click="show = true" />
					<u-action-sheet :list="readFromActionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
					 -->
					<picker @change="bindPickerChange" :value="index" :range="readFromActionSheetList" :border="border">
						<view class="uni-input">{{readFromActionSheetList[index]}}</view>
					</picker>
				
			</u-form-item>						

<!-- 			<u-form-item :label-position="labelPosition" label="sellerID" prop="sellerID" label-width="150">
				<u-input :border="border" placeholder="Please input SellerID" v-model="model.sellerID" type="text"></u-input>
			</u-form-item>
			
			<u-form-item  label-width="150" :label-position="labelPosition" label="amount" prop="amount">
				<u-input :border="border" placeholder="Please input amount" v-model="model.amount" type="text"></u-input>
			</u-form-item>
			
			<u-form-item :label-position="labelPosition" label="unit" prop="unit" label-width="150">
				<u-input :border="border" placeholder="Please input unit" v-model="model.unit" type="text"></u-input>
			</u-form-item>
			
			<u-form-item :label-position="labelPosition" label="price" prop="price" label-width="150">
				<u-input :border="border" placeholder="Please input  price" v-model="model.price" type="text"></u-input>
			</u-form-item> -->
			
			<u-form-item :label-position="labelPosition" label="number" prop="number" label-width="150">
				<u-input :border="true" placeholder="Please input  number of item" v-model="numberofitem" type="text"></u-input>
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
				
				//form的属性设置
				model: {
					name: '',
					addNewItemName: '',
					addPickerNewItemName: '',
/* 					amount:'',
					unit:'',
					sellerID:'',
					price:'', */
				},
				
				
				//picker专用
				index: 0,
				
				
				//actionList专用
				actionSheetList: [],				
				readFromActionSheetList: ['please choose a item'],
				
				show: false,
							
				actionSheetShow: false,
				pickerShow: false,
				border: false,
				errorType: ['message'],
				labelPosition: 'left',
				selectType: 'select',
				selectList: [],
				unitList: [],
				unitListShow: false,
				numberofitem:2,
				username:'',
			}

		},
		onLoad() {
			_this = this;
			_this.username = uni.getStorageSync('nickname');
			this.getList();
		},
		
		onReady() {
		this.getList();
		},
		
		methods: {
			//Picker专用函数
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value				
			},
									
			//列表读取
			actionSheetCallback(index) {				
				this.model.addNewItemName = this.actionSheetList[index].itemName;
			},
			
			// 加载货物列表
			getList(type){
				console.log(this.username)
				uni.request({
					url: '/apis/item/userStorage',
					method: "GET",
					
					data: {						
						state:type,
						userAccount:this.username
					},
					
					success: data => {
						
						this.actionSheetList = data.data;
						console.log(this.actionSheetList);		
										
						for (let i = 0; i < this.actionSheetList.length; ++i){
						this.readFromActionSheetList[i] = this.actionSheetList[i].itemName 	
						}
						console.log(this.readFromActionSheetList);							
					}
				});
			},
			
			//提交货物数量更改
			submit() {
						this.model.addPickerNewItemName = this.readFromActionSheetList[this.index],
						console.log(this.model.addPickerNewItemName),
						uni.request({
							
							url:'/apis/order/shop/?userAccount=' +  _this.username +'&itemName=' + _this.model.addPickerNewItemName + '&number=' + _this.numberofitem,
							//url:'/apis/storage/EditStorageRemaining/?userAccount=' +  _this.username + '&remaining=' + _this.numberofitem + '&itemName=' + _this.model.addPickerNewItemName,
							//url:'/apis/item/addNewItemIntoStorage?userAccount='+ _this.username +'&number='+ _this.numberofitem,
							method: "POST",		
							data: {	
/* 								itemName:_this.model.addPickerNewItemName,
								sellerID:_this.model.sellerID,
								amount:_this.model.amount,
								unit:_this.model.unit,
								price:_this.model.price */
							},
							success: (res) => {	
								if (res.data === 'shop successfully.') {
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
									title: 'input error',
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
	},
	
	.button-Item-Picker{
		margin: 5px;
		
		
	}

</style>
