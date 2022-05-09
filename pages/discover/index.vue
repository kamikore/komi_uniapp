<template>
	<view class="moments">
		<momentsBanner></momentsBanner>
		<moment-list style="height:100%" ></moment-list>
		<view class="tabbarShadow"></view>
	</view>
</template>

<script>
import momentsBanner from "@/components/momentsBanner"
import momentList from "@/components/momentList"

export default {
	name: "discover",
	components:{
		momentsBanner,
		momentList
	},
	data() {
		return {
			
		};
	},
	methods: {
		
	}
};
</script>

<style lang="scss" scoped>

.moments {
	
	
}
	
</style>
