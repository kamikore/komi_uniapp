<template>
	<view class="mask">
		<view class="content-box">
			<view class="audio">
				
			</view>
		</view>
		<view class="operation">
			<view class="cancel"><image src="" mode=""></image></view>
		</view>
	</view>
</template>

<script>
	
export default {
	data() {
		return {
			
		};
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
	.mask {
		// 根据窗口位置
		position: fixed;
		top: 0;
		height: 100vh;
		width: 100vw;
		// 需要-1 才行
		z-index: -1;
		background: rgba($color: #000000, $alpha: 0.6);
		
		.content-box {
			position: absolute;
			width: 400rpx;
			height: 400rpx;
			background: #fff;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
		
		.operation {
			position: absolute;
			width: 200rpx;
			height: 200rpx;
			background: #DD524D;
			
		}
	}
</style>
