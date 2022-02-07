<template>
	<view class="toolsBox">
		<view class="tool" v-for="(item, index) in tools" :key="index">
			<button @tap="selectTool(index)"><image :src="item.src" mode=""></image></button>
			<text>{{ item.title }}</text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'toolsBox',
	computed: {
		// 使用路径别名是不行的，路径别名需要在打包时被编译
		tools() {
			return [
				{
					src: '../../static/images/chatroom/image.png',
					title: '相册'
				},
				{
					src: '../../static/images/chatroom/camera.png',
					title: '拍摄'
				},
				{
					src: '../../static/images/chatroom/video.png',
					title: '视频'
				},
				{
					src: '../../static/images/chatroom/location.png',
					title: '位置'
				},
				{
					src: '../../static/images/chatroom/file.png',
					title: '文件'
				}
			];
		}
	},
	data() {
		return {};
	},
	methods: {
		selectTool(index) {
			switch (index) {
				case 0:
					console.log("0")
					break;
				case 1:
					console.log("1")
					break;
				case 2:
					console.log('2');
					uni.navigateTo({
						url: '/pages/livePush/index'
					});
					break;
				case 3:
					console.log("3")
					break;
				case 4:
					console.log("4")
					uni.chooseFile({
						success: (res) => {
							console.log(res.tempFilePaths,res.tempFiles);
						},
						fail: (err) => {
							console.log(err.errMsg)
						}
					})
					break;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.toolsBox {
	display: grid;
	grid-template-columns: repeat(4, 25%);
	align-items: center;
	justify-content: center;
	row-gap: 40rpx;
	padding: 0 20rpx;
	padding-top: 60rpx;

	.tool {
		text-align: center;
		button {
			height: 110rpx;
			width: 110rpx;
			padding: 20rpx 20rpx;
			border-radius: 40rpx;

			image {
				height: 72rpx;
				width: 72rpx;
				background-size: cover;
			}
		}

		text {
			color: #708090;
		}
	}
}
</style>
