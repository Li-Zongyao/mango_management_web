<template>
	<view class="center">
		<view class="logo" >
			<view class="logo-title">
				<text class="uer-name">Hi，{{name}}</text>
				<text class="go-login navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		
		<view class="center-list">			
			<view class="center-list-item border-bottom" @tap="relogin">
				<text class="list-icon">&#xe60f;</text>
				<text class="list-text">Switch account</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			
			<view class="center-list-item">
				<text class="list-icon">&#xe639;</text>
				<text class="list-text">New message</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>			
		</view>
		
		
		<view class="center-list">
			
			<navigator url="userhabit" class="center-list-item border-bottom">  	
				<text class="list-icon">&#xe60b;</text>
				<text class="list-text">Shop habit</text>
				<text class="habit">  Buy on {{WeekDay}}</text>				
				<text class="navigat-arrow">&#xe65e;</text>
			</navigator>
			
		</view>
		
		<view class="center-list">
			
			<navigator url="uinfo" class="center-list-item border-bottom">  	<!-- app信息 -->
				<text class="list-icon">&#xe60b;</text>
				<text class="list-text">Help and message</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</navigator>
			
		</view>
		

		<!-- <view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe60b;</text>
				<text class="list-text">帮助与反馈</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon">&#xe65f;</text>
				<text class="list-text">服务条款及隐私</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item">
				<text class="list-icon">&#xe614;</text>
				<text class="list-text">关于应用</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl: "../../static/uni-center/logo.png",
				uerInfo: {},
				shopdate:"",
				userinfolist: [],
				WeekDay: 'error',
			}
		},
		methods: {
			onLoad() {
				this.name = uni.getStorageSync('nickname');
				this.getShopDate();
				this.shopDateSubstitute();
				
			},	
			onShow(){
	
			},
			onReady(){	
				this.getShopDate();
				
			},
			relogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				});	
			},
			

			
			getShopDate(){
				console.log('getshopdate')
				uni.request({
					// #ifdef APP-PLUS
					url: this.appurl+"/user/getInfo",
					// #endif	
					// #ifndef APP-PLUS
					url: '/apis/user/getInfo',
					// #endif
					method: "GET",
					
					data: {						
						userAccount:this.name
					},
					
					success: data => {
						console.log('233 ' + data);
						this.userinfolist = data.data;	
		
						if(this.userinfolist.purchaseWeekDay === 0){this.WeekDay = 'Sunday'}
						if(this.userinfolist.purchaseWeekDay === 1){this.WeekDay = 'Monday'}									
						if(this.userinfolist.purchaseWeekDay === 2){this.WeekDay = 'Tuesday'}
						if(this.userinfolist.purchaseWeekDay === 3){this.WeekDay = 'Wednesday'}									
						if(this.userinfolist.purchaseWeekDay === 4){this.WeekDay = 'Thursday'}
						if(this.userinfolist.purchaseWeekDay === 5){this.WeekDay = 'Friday'}									
						if(this.userinfolist.purchaseWeekDay === 6){this.WeekDay = 'Saturday'}
						
						console.log('userinfolist == ' + this.userinfolist),
						console.log('purchaseWeekDay == ' + this.userinfolist.purchaseWeekDay),
						console.log('WeekDay == '+ this.WeekDay)
												
												
					}
				});
				

			},
			
			shopDateSubstitute(){			
				if(this.userinfolist.purchaseWeekDay === 0){this.WeekDay === 'Sunday'}
				if(this.userinfolist.purchaseWeekDay === 1){this.WeekDay === 'Monday'}									
				if(this.userinfolist.purchaseWeekDay === 2){this.WeekDay === 'Tuesday'}
				if(this.userinfolist.purchaseWeekDay === 3){this.WeekDay === 'Wednesday'}									
				if(this.userinfolist.purchaseWeekDay === 4){this.WeekDay === 'Thursday'}
				if(this.userinfolist.purchaseWeekDay === 5){this.WeekDay === 'Friday'}									
				if(this.userinfolist.purchaseWeekDay === 6){this.WeekDay === 'Saturday'}														
			},

		}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}

	page,
	view {
		display: flex;
	}

	page {
		background-color: #f8f8f8;
	}

	.habit{
		padding: 10upx;
		
	}

	.center {
		flex-direction: column;
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #4cd964;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
	}

	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
	}

	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
	}

	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #4cd964;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
</style>