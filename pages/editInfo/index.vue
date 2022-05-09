<template>
	<view class="edit-container">
		<infoEditor :field="columnName"></infoEditor>
	</view>
</template>

<script>
import infoEditor from "@/components/infoEditor"

export default {
	name: "editInfo",
	components:{
		infoEditor
	},
	data() {
		return {
			option:"",
			columnName:""
		};
	},
	methods: {
	},
	onLoad(options) {
		const {option, columnName} = options
		this.option = option
		this.columnName = columnName
	},
	onReady() {
		uni.setNavigationBarTitle({
			title: `设置${this.option}`,
			success: ()=> {
			},
			fail: (e) => {
				console.log('设置失败',e)
			}
		});
	},
	
	
};
</script>

<style lang="scss" scoped>
</style>
