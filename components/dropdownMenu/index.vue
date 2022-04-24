<template>
	<view class="menu-container"  @click="closeMenu">
		<view :class="{ show: show }" class="menu-wrap">
			<view class="menu">
				<ul>
					<li @tap="newChat">发起群聊</li>
					<li @tap="addFriend">添加好友</li>
					<li>帮助</li>
					<li>...</li>
				</ul>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'test',
	data() {
		return {
			show: true
		};
	},
	methods: {
		closeMenu() {
			if(this.showMenu) {
				console.log("dropdown close")
				this.showMenu = false;
			}
		},
	}
};
</script>

<style lang="scss" scoped>
	
.menu-container {
	position: absolute;
	height: 100vh;
	width: 100vw;
	
	
	.menu-wrap {
		position: fixed;
		top: 100rpx;
		padding: 0 10rpx;
		right: 0;
		opacity: 0;
		visibility: hidden;
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
			}
		}
	}
	
	.show {
		opacity: 1;
		visibility: visible;
	}
}
	
	

</style>
