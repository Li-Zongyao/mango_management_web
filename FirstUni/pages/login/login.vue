// pages/login/login.vue
<template>
	<view class="bg">
		<view class="login">
			<image src="http://www.logofree.cn/uploads/image/20190430/14/2-86_3686.jpg"></image>
			<view><input type="text" placeholder="用户名" v-model="nickname" /></view>
			<view><input type="password" placeholder="密码" v-model="password" /></view>
			<view><button type="primary" @tap="login">登录</button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: "",
				password: ""
			};
		},
		methods: {
			login() {
				uni.request({
					url: "http://47.92.50.43:8888/user/login",
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
							uni.setStorageSync("nickname", this.nickname)
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
			}
		}
	}
</script>

<style lang="scss">
	.bg {
		background: linear-gradient(to bottom, skyblue, #fff 50%);
		height: 93vh;
		display: flex;
		align-items: center;
		justify-content: center;
		

		.login {
			width: 75vw;
			transform: translateY(-120rpx);
			padding: 20rpx;

			input {
				border: 1rpx solid #C0C0C0;
				border-radius: 10rpx;
				padding: 16rpx;
			}

			view {
				margin: 20rpx 0;
			}

			view:last-of-type {
				margin-top: 40rpx;
			}

			image {
				width: 170rpx;
				height: 170rpx;
				border-radius: 50%;
				margin-left: 35%;
			}
		}
	}
</style>