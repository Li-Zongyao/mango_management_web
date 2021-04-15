<template>
	<view class="main">		
		
		<!--<view class="bghead"></view>--> <!-- 显示背景蓝色 -->
		<view class="main bg-orange" >
			
			<view id= "head3" class="flex justify-around margin-top-sm ">
				<text>Item need to buy</text>
			</view>
			
			<!-- class="scroll" -->
			<scroll-view id="scroll" scroll-y = "true" >
				<view class="cu-list menu card-menu margin-top-sm" >
					<navigator :url="'../detail/detail?id=' + item.id" class="cu-item" v-for="(item,key) in logList" :key = "key">
						<view class="content padding-tb-sm">							
							<view class="coloritemName">Name：{{item.itemName}}</view>
							<template v-if="item.state==1">

							</template>
							<template v-else>
								<view class="text-gray">
									purchaseFrequency： {{item.purchaseFrequency}}
								</view>
								<view class="text-gray ">
									remaining： {{item.remaining}}
								</view>
							</template>

						</view>
					</navigator>
				</view>
			</scroll-view>			
		</view>		
	</view>
</template>
<script>

	export default {
		data() {
			return {	
				scrollHeight:'',
				logList:[],
			}
		},
		// components: {uniSegmentedControl},
		onReady() {
		let _this = this;
		let segmented = uni.createSelectorQuery().select("#segmented");
		let sysinfo = uni.getSystemInfoSync();

		this.loadToday();	
		},
		onLoad() {			
				this.name = uni.getStorageSync('nickname')					
		},	
		
		onReady() {
		this.getList();
		},
		//下拉刷新
		onPullDownRefresh() {			

		},		
		methods: {
			/**
			 * 加载今日数据
			 */
			loadToday: function() {
				this.getList(1)
			},
			
			instorage(){
				
				this.getList(1)
				// uni.navigateTo({
				// 	url:'../instorage/instorage'
				// })
			},
			
			// 加载货物列表
			getList(type){
				console.log(type)
				uni.request({
					url: '/apisorder/purchaseReminding?userAccount='+ this.name,
					method: "GET",
					
					data: {						

					},
					
					success: data => {
						console.log(data);
						this.logList = data.data;						
					}
				});
			}
		}
	}

</script>

<style>
	cover-image {
		position: absolute;
		left: 0;
		top: 0;
		height: 300rpx;
		width: 100%;
	}
	
	.coloritemName{
		color: #DD514C;
	}
	
	#head3{
		margin-left: 15px;
		margin-right: 15px;
		padding: 15rpx;
		height: 100rpx;
		line-height:30px;
		display: flex;
		background-color: #ff8e0c;
		border-radius: 10rpx;
		border: #e7d90f;
		border-width: 1px;
		border-style:solid;
		font-size: 20px;
	}
	
	.Text-AddStorage{
		
		padding-left:20px
	}
	
	.bghead{
		position: absolute;
		left: 0;
		top: 0;
		height: 300rpx;
		width: 100%;
		background-color: #35a1ff;
	}	
	.main{
		position: absolute;
		top: 0;width: 100%;
	}
	.head_box{
		width: 700upx;
		height: 220upx;
		background-color: #ffffff;
		border-radius: 15upx;
	}
	.btn-box{
		width: 310upx;
		height: 150upx;
		border-radius: 20upx;
	}
	.scroll{
		height: 700rpx;
	}
	
	.swiper {
		height: 350upx;
	}

	.swiper-item {
		display: block;
		height: 350upx;
		width: 100%;
	}

	.uni-media-list-logo {
		width: 100upx;
		height: 100upx;
	}
	.scan-result {
		min-height: 50upx;
		line-height: 50upx;
	}
	.logbt {
		background: none;
		border: none !important;
		position: fixed;
		display: inline;
		margin-left: -76upx
	}

	.logbt:after {
		border: none !important;
	}

	image {
		width: 100upx;
		height: 100upx;
	}

	.landing {
		height: 84upx;
		line-height: 84upx;
		border-radius: 44upx;
		font-size: 32upx;
		background: linear-gradient(to left, #86B5F4, #4790EF);
	}

	.login-btn {
		padding: 10upx 20upx;
		margin-top: 350upx;
	}

	.login-function {
		overflow: auto;
		padding: 20upx 20upx 30upx 20upx;
	}

	.login-forget {
		float: left;
		font-size: 26upx;
		color: #999;
	}

	.login-register {
		color: #666;
		float: right;
		font-size: 26upx;

	}

	.login-input input {
		background: #F2F5F6;
		font-size: 28upx;
		padding: 10upx 25upx;
		height: 62upx;
		line-height: 62upx;
		border-radius: 8upx;
	}

	.login-margin-b {
		margin-bottom: 25upx;
	}

	.login-input {
		padding: 10upx 20upx;
	}

	.login-head {
		font-size: 34upx;
		text-align: center;
		padding: 25upx 10upx 55upx 10upx;
	}

	.login-card {
		background: #fff;
		border-radius: 12upx;
		padding: 10upx 25upx;
		box-shadow: 0 6upx 18upx rgba(0, 0, 0, 0.12);
		position: relative;
		margin-top: 120upx;
	}

	.login-bg {
		height: 260upx;
		padding: 25upx;
		background: linear-gradient(#86B5F4, #4790EF);
	}
</style>
