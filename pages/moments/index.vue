<template>
	<view class="moments">
		<moment-list style="height:100vh" :showBanner="true" :enablePullDownRefresh="true" ></moment-list>
	</view>
</template>

<script>
import momentList from "@/components/momentList"

export default {
	name: "moments",
	components:{
		momentList
	},
	data() {
		return {
			
		};
	},
	methods: {
		
	},
	onNavigationBarButtonTap(e) {
		if(e.index === 0) {
			uni.navigateTo({
				url: "/pages/editMoment/index"
			})
		}
	}
};
</script>

<style lang="scss" scoped>
</style>