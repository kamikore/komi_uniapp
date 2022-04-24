<template>
	<view class="menu-container" @click="closeMenu">
		<!-- 过渡由app-plus 动画属性实现即可 -->
		<view class="menu-wrap">
			<view class="menu">
				<ul>
					<li class="iconfont icon-group" @tap.stop="newChat">发起群聊</li>
					<!-- 防止冒泡 -->
					<li class="iconfont icon-ic_addfriend" @tap.stop="addFriend">添加好友</li>
					<li>帮助</li>
					<li>...</li>
				</ul>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'dropdownMenu',
	data() {
		return {
		};
	},
	methods: {
		newChat() {
			uni.redirectTo({
				url: "/pages/groupChat/index"
			})
		},
		addFriend() {
			// 需要点击菜单项同时关闭页面
			uni.redirectTo({
				url: "/pages/search/index"
			})
		},
		closeMenu() {
			console.log("close")
			uni.navigateBack()
		},
	},
};
</script>

<!-- 需要去掉scoped 才能够app端生效 -->
<style lang="scss">

page {
	height: 100%;
	width: 100%;
	background-color: transparent;
}
	
.menu-container {
	position: absolute;
	height: 100vh;
	width: 100vw;
	
	.menu-wrap {
		position: fixed;
		top: calc(var(--status-bar-height) + 50px);
		padding: 0 10rpx;
		right: 0;
		opacity: 1;
		visibility: visible;
		// transform: scale(0.5);
		transition: all 0.2s;
		z-index: 1;
	
		.menu {
			position: relative;
			background: #4c4c4c;
			border-radius: 10rpx;
			border: 1rpx solid transparent;
	
			&:after {
				content: '';
				position: absolute;
				right: 24rpx;
				top: -24rpx;
				width: 0;
				height: 0;
				border: 12rpx solid transparent;
				border-bottom-color: #4c4c4c;
			}
		}
	
		ul {
			display: block;
			list-style: none;
			padding: 20rpx 40rpx;
	
			li {
				height: 80rpx;
				font-size: 30rpx;
				letter-spacing: 2rpx;
				color: #ebebeb;
				border-bottom: 2rpx solid #525252;
				
				&::before {
					font-size: 44rpx;
					padding-right: 20rpx;
				}
			}
		}
	}
	
	// .show {
	// 	opacity: 1;
	// 	visibility: visible;
	// }
}
	
	

</style>
