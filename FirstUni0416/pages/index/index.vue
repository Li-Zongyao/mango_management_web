<template>
	<view class="main">
		<!--<cover-image src = "../../static/bg.png"></cover-image>-->
 		<view class="bghead"></view> <!-- 显示背景蓝色 -->
		<view class="main">
			<!--左侧 右侧 保留功能-->
			<view id="head1" class="flex justify-around margin-top-sm ">
				<navigator url="additem" class="flex align-center">					
					<view class="cuIcon-add text-white" style="font-size: 50upx"></view>
				</navigator>
				<view></view><view></view><view></view><view></view>
				<navigator url="scaninfo" class="flex align-center">
					<view>
						<view class="cuIcon-scan text-white text-bold" style="font-size: 50upx"></view>
					</view>
				</navigator>
			</view>
			<!--社区出行概况-->

			<!--两个功能按钮-->
			<view id="btn" class="flex justify-around margin-top-sm">
				<navigator class="btn-box bg-gradual-blue flex align-center justify-center"  url="addStorage">
					<text class="text-xxl text-shadow Text-AddStorage"> Update Storage</text>
					<text class="cuIcon-cart " style="padding-left: 0upx;font-size: 90upx;opacity: 0.2"></text>
				</navigator>
				<navigator class="btn-box bg-gradual-green flex align-center justify-center" url="buyItem">
					<text class="text-xxl text-shadow Text-AddStorage"> Buy Item</text>
					<text class="cuIcon-deliver padding-left-xs" style="font-size: 90upx;opacity: 0.2"></text>
				</navigator>
			</view>
			<!--选项卡 https://ext.dcloud.net.cn/plugin?id=54-->

			<!-- class="scroll" -->
			<scroll-view id="scroll" scroll-y = "true" >
				<view class="cu-list menu card-menu margin-top-sm" >
					<navigator :url="'../detail/detail?id=' + item.id" class="cu-item" v-for="(item,key) in logList" :key = "key">
						<view class="content padding-tb-sm">							
							<view>Name：{{item.itemName}}</view>
							<template v-if="item.state==1">
							<view class="text-gray ">
								ItemIF： {{item.itemId}}
							</view>
							</template>
							<template v-else>
								<view class="text-gray ">
									number： {{item.remaining}}
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
					// #ifdef APP-PLUS
					url: this.appurl+"/item/userStorage",
					// #endif	
					// #ifndef APP-PLUS
					url: '/apis/item/userStorage',
					// #endif
					method: "GET",
					
					data: {						
						state:type,
						userAccount:this.name
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
