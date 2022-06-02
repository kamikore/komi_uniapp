<template>
	<view class="videoPlayer-container">
		<video :src="videoUrl" controls autoplay="true"></video>
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
		height: 100vh;
		// #endif
		
		// #ifdef APP
		height: 100vh;
		// #endif
	}
</style>
