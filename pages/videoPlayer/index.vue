<template>
	<view class="videoPlayer-container">
		<video :src="videoUrl" controls></video>
	</view>
</template>

<script>
	
export default {
	name: "videoPlayer",
	data() {
		return {
			videoUrl: "",
		};
	},
	methods: {
	},
	onLoad(option) {
		this.videoUrl = option.url
	}
};
</script>

<style lang="scss" scoped>
	page {
		
	}
	
	video {
		width: 100vw;
		// #ifdef H5
		height: calc(100vh - var(--window-top) - var(--window-bottom));
		// #endif
		
		// #ifdef APP
		height: calc(100vh - 50px -  var(--status-bar-height));
		// #endif
	}
</style>
