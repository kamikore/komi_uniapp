<template>
	<view class="momentList">
		<scroll-view id="momentScrollBox" scroll-y="true" >
			<moment-item v-for="(item,index) in moments" :key="index" :item="item"></moment-item>
		</scroll-view>
	</view>
</template>

<script>
import momentItem from "@/components/momentItem"	

export default {
	name: "momentList",
	components: {
		momentItem
	},
	props:['uid'],
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
					imgs:['../../static/images/test/1.jpg','../../static/images/test/2.jpg'],
					dateTime: new Date,
				},
				{
					userInfo: {
						user_id: 0,
						avatar: "../../static/images/chatroom/emoji.png",
						remarkName: "nickName",
					},
					text: "text:sfs11111fsdgdfhfgjfg",
					imgs:[
							'../../static/images/test/1.jpg',
							'../../static/images/test/2.jpg',
							'../../static/images/test/3.jpeg',
							'../../static/images/test/4.jpeg'
					],
					dateTime: new Date,
				},
				{
					userInfo: {
						user_id: 0,
						avatar: "../../static/images/chatroom/emoji.png",
						remarkName: "nickName",
					},
					text: "text:sfsfsdgdfhfgjfg",
					imgs:['../../static/images/test/1.jpg','../../static/images/test/2.jpg'],
					dateTime: new Date,
				},
			],
		};
	},
	methods: {
	},
	created() {
		
	}
};
</script>

<style lang="scss" scoped>
	
.momentList {
	height: 570rpx;
	
	#momentScrollBox {
		height: 100%;
		width: calc(100% - 96rpx);
		padding: 24rpx 48rpx;
	}
} 
	
	
</style>
