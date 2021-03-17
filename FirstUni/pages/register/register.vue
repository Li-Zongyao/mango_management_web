<template>	
	<view class="zai-box">
		<image src="../../static/1121.jpg" mode='aspectFit' class="zai-logo"></image>
		<view class="zai-form">
 			<input class="zai-input" placeholder-class v-model="username" placeholder="please enter user name" />
			<input class="zai-input" placeholder-class v-model="password" password placeholder="Please enter the password"/>
			<input class="zai-input" placeholder-class v-model="repassword" password placeholder="Please re-enter your password"/>	

			
			<button class="zai-btn" @tap="register">Sign up now</button>
			<navigator url="../login/login" open-type='navigateBack' hover-class="none" class="zai-label">Already have an account, click here to log in.</navigator>
		</view>
	</view>
</template>

<script>

	export default {
		onLoad() {

		},
		data() {
			return {
				loading: false,
				username: "",
				password: "",
				repassword: ""
			};
		},
		methods: {
		
			register() {
				this.loading = true;
				if (this.username == '') {						/* 输入验证 */
					uni.showToast({
						icon: 'none',
						title: 'please input username'
					});
					this.loading = false;
					return;
				}
				if (this.password == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					this.loading = false;
					return;
				}
				if (this.repassword == '') {
					uni.showToast({
						icon: 'none',
						title: '请再输入一次密码'
					});
					this.loading = false;
					return;
				}
				if (this.password !== this.repassword) {
					uni.showToast({
						icon: 'none',
						title: '两次密码输入不一致'
					});
					this.loading = false;
					return;
				}
				uni.request({
					url: "http://47.92.50.43:8888/user/login",		/* 注册并传参 */
					method: "POST",
					data: {
						username: this.username,
						password: this.password,
						repassword: this.repassword,
					},
					success: (res) => {
						 if (res.data.success) {
							uni.showToast({
								title: '注册成功',
								duration: 2000,
								title: data.msg
							});
							
							uni.reLaunch({
								url: '../login/login'
							});

						} else {
							uni.showToast({					
								title: 'error',
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

<style>
	.zai-box{
		padding: 0 100upx;
		position: relative;
	}
	.zai-logo{
		width: 100%;
		width: 100%;
		height: 310upx;
		padding: 100upx 0;
	}
	.zai-title{
		position: absolute;
		top: 0;
		line-height: 360upx;
		font-size: 68upx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100upx;
	}
	.zai-form{
		margin-top: 50upx;
	}
	.zai-input{
		background: #9ee0ee;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 36upx;
		height: 36px;
	}
	.input-placeholder, .zai-input{
	
	}
	.zai-label{
		padding: 60upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}
	.zai-btn{
		margin-top: 30upx;
		background: #0267ff;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
	}
	.zai-btn:after{
		border: 0;
	}
	/*按钮点击效果*/
	.zai-btn.button-hover{
		transform: translate(1upx, 1upx);
	}

</style>
