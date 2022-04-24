<template>
	<view class="momentList">
		<moment-item v-for="(item,index) in moments" :key="index" :item="item"></moment-item>
	</view>
</template>

<script>
import momentItem from "@/components/momentItem"	

export default {
	name: "momentList",
	components: {
		momentItem
	},
	data() {
		return {
			moments: [ 
				{
					userInfo: {
						user_id: 0,
						avatar: "../../static/images/chatroom/emoji.png",
						remarkName: "nickName",
					},
					text: "text:sfsfsdgdfhfgjfg",
					content:"content	",
					dateTime: new Date,
				},
			],
		};
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
</style>
