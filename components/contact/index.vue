<template>
		<view class="contact">
			<view class="avatar"><image src="../../static/images/chatroom/emoji.png" mode=""></image></view>
			<view class="nickName">{{contact.remarkName || contact.group_name}}</view>
		</view>
</template>

<script>
	
export default {
	name: "contact",
	props: {
		contact: Object
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
.contact {
	display: flex;
	align-items: center;
	padding: 10rpx 20rpx;
	
	.avatar {
		height: 60rpx;
		
		image {
			height: 60rpx;
			width: 60rpx;
			padding-right: 20rpx;
		}
	}	
	
	.nickName {
		line-height:60rpx ;
	}
}
		
</style>
