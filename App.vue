<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
button {
	padding: 0;
}

// 占住位置高度
.header-wrap {
	width: 100%;
	height: 88rpx;
	position: relative;

	.header {
		position: fixed;
		top: 0;
		text-align: center;
		display: flex;
		height: 88rpx;
		width: 100%;
		padding-top: var(--status-bar-height);
		background: #ededed;
		z-index: 10;

		.header-left,
		.header-right {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-basis: 80rpx;
		}

		.header-center {
			flex-grow: 1;
			image {
				width: 48rpx;
				height: 48rpx;
			}
		}
	}
}

/* 隐藏滚动可视区滚动条 */
// html,body{
// 	width: 100%;
// 	height: 100%;
// 	overflow: scroll;
// }
// html::-webkit-scrollbar,
// body::-webkit-scrollbar {
// 	width:0px;
// 	height:0px;
// }
// body{
// 	margin:0;
// }
// 官方提供的隐藏方法，但对移动端无效
::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
}
</style>
