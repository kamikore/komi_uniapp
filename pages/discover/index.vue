<template>
	<view class="discover">
		<moment-list 
			style="height: 100vh" 
			:moments="moments" 
			:showBanner="true"
			:enablePullDownRefresh="true"
		></moment-list>
		<view class="tabbarShadow"></view>
	</view>
</template>

<script>
import {fetchMoments} from "@/api"
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
			moments:[]
		};
	},
	methods: {
		
	},
	onLoad() {
		fetchMoments().then((res) => {
			this.moments = res.data
		}, (err) =>{
			console.log(err)
		})
	},
};
</script>

<style lang="scss" scoped>

.discover {
	
	
}
	
</style>
