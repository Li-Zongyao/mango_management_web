// pages/login/login.vue
<template>
	
	<view class="bg">		
		<view class="login">
			<image src="../../static/1121.jpg" mode='aspectFit' class="zai-logo"></image>
			<view><input type="text" placeholder="username" v-model="nickname" /></view>
			<view><input type="password" placeholder="password" v-model="password" /></view>
			<view><button type="primary" @tap="login">login</button></view>
			<view><button type="primary" @tap="test">only for test</button></view>    <!-- 测试用按钮，只能将用户名赋值给nickname并且跳转到index.vue -->
			<navigator url="../register/register" hover-class="none" class="zai-label">Don’t have an account yet? Click here to register.</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: "please input nickname",
				password: "please input password"
			};
		},
		methods: {
			test() {
				uni.switchTab({
					url: '/pages/index/index'
				});
				uni.setStorageSync("nickname", this.nickname);
			},
			login() {
				uni.request({
					url: "http://47.92.50.43:8888/user/login",					/* Post传参地址及date */
					method: "POST",
					data: {
						username: this.nickname,
						pwd: this.password
					},
					success: (res) => {
						 if (res.data.success) {
							uni.showToast({
								title: '登录成功',
								duration: 2000
							});
							uni.setStorageSync("nickname", this.nickname)		/* 保存名字并跳转 */
							uni.redirectTo({
								url: "../index/index"
							});
						} else {
							uni.showToast({
								title: '用户名或密码错误',
								icon: "loading",
								duration: 2000
							});
						}
					},

				})
			},		
		}
	}
</script>

<style lang="scss">
	.bg {
		padding: 200upx 100upx;
		position: relative;

		

		.login {
			width: 75vw;
			transform: translateY(-120rpx);
			padding: 20rpx;

			input {
				padding: 16rpx;
				margin-bottom: 50upx;
				background: #9ee0ee;
				border-radius: 100upx;
				height: 36px;
			}

			view {
				margin: 20rpx 0;
			}

			view:last-of-type {
				margin-top: 40rpx;
			}

			image {
				width: 100%;
				width: 100%;
				height: 310upx;
				margin-bottom: 100upx;
			}
			.zai-label{
				padding: 60upx 0;
				text-align: center;
				font-size: 30upx;
				color: #a7b6d0;
			}
		}
	}
</style>