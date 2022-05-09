<template>
	<view class="moments">
		<momentsBanner></momentsBanner>
		<moment-list style="height:100%" ></moment-list>
	</view>
</template>

<script>
import momentsBanner from "@/components/momentsBanner"
import momentList from "@/components/momentList"

export default {
	name: "moments",
	components:{
		momentsBanner,
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