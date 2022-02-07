<template>
	<view class="volume">
		<view class="volume-box">
			<view class="">content.....</view>
		</view>
	</view>
</template>

<script>
	
export default {
	name: "volume",
	data() {
		return {
			
		};
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
	
.volume{
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%,0);
	
	.volume-box {
		position: relative;
		height: 150rpx;
		width: 300rpx;
		border-radius: 20rpx;
		background-color: #F0F0F0;
		border: 1rpx solid transparent;
		
		&:after {
			content: "";
			position: absolute;
			bottom: -48rpx;
			left: 50%;
			width: 0;
			height: 0;
			transform: translate(-50%,0);
			border: 24rpx solid transparent;
			border-top-color: #F0F0F0;
		}
	}
}
</style>
