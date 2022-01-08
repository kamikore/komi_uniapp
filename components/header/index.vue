<template>
	<view class="header-wrap">
		<!-- 头部 -->
		<view class="header">
			<view class="header-left"><image src="" mode=""></image></view>
			<view class="header-center">
				<image src="" mode="">{{ title }}</image>
			</view>
			<view class="header-right">
				<image src="@/static/images/search.png"></image>
				<image src="@/static/images/common/add.png" @tap="showMenu"></image>
			</view>
			<!-- 头部菜单 -->
			<view :class="{show:show}" class="menu-wrap">
				<view class="menu">
					<ul>
						<li>发起群聊</li>
						<li @tap="addFriend">添加好友</li>
						<li>帮助</li>
						<li>...</li>
					</ul>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'Header',
	props: ['title'],
	data() {
		return {
			show: false,
			animationData: {},
		};
	},	
	methods: {
		showMenu() {
			this.show = !this.show;
		},
		addFriend() {
			uni.navigateTo({
				url: "/subpages/search/index"
			})
		}
	},


};
</script>

<style lang="scss" scoped>
.header {

	.header-left {
		image {
			width: 88rpx;
			height: 88rpx;
		}
	}

	.header-right {
		flex-basis: 150rpx;
		gap: 20rpx;

		image {
			width: 48rpx;
			height: 48rpx;
		}
	}
	

	.menu-wrap {
		position: absolute;
		top: 88rpx;
		padding:  0 10rpx;
		right: 0;
		opacity: 0;
		visibility: hidden;
		// transform: scale(0.5);
		transition: all 0.2s;
		
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
				color:#ebebeb;
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
