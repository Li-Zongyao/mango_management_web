<template>
    <view>
		<view>
         <button type="primary" @click="scanCode()">button</button>
		</view>
		
		<view>
		 <text class="uer-name">Hi，{{this.data2}}</text>
		</view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
			data1:'',	
			data2:'',
            };
        },
        methods: {
            scanCode() {
                 // 允许从相机和相册扫码
                 uni.scanCode({
                     success: function (res) {
						 this.data1 = res.scanType;
						 this.data2 = res.result;
                         console.log('条码类型：' + res.scanType);
                         console.log('条码内容：' + res.result);
                     }
                 });
            }
        }
    }
</script>