<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
    /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	/* https://www.jianshu.com/p/d2900005b32a */
    @import "uview-ui/index.scss";
	
	/* 下载源码解压，复制根目录的 /colorui 文件夹到你的根目录 */
	/*https://ext.dcloud.net.cn/plugin?id=239 */
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
