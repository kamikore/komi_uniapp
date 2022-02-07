<template>
	<view class="search">
		<input type="text" v-model:value="inputValue" />
		<button type="default" @click="submit">查找</button>
		<view class="result-list">
			<view v-show="result.account" @click="clickHandler" class="">
				{{result.account}}
			</view>
		</view>
	</view>

</template>

<script>
	
export default {
	name: "",
	data() {
		return {
			inputValue: "1234@qq.com",
			result: {},
		};
	},
	methods: {
		submit() {
			uni.request({
				url: "http://localhost:3000/komi/search/contacts",
				method:"GET",
				data: {
					submit: this.inputValue
				},
				success: (res) => {
					console.log(res)
					if(res.statusCode != 200) {
						console.log(res.data.errMsg)
					} else {
						this.result = res.data;
					}
				},
				fail: (res) => {
					console.log("调用失败")
				}
			})
		},
		clickHandler() {
			uni.navigateTo({
				url: `../userDetails/index?uid=${this.result.user_id}`,
			})
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
