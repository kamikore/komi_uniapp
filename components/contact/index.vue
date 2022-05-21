<template>
		<view class="contact">
			<view class="avatar"><image :src="contact.fid.avatar || '../../static/images/future.png'" mode="aspectFill"></image></view>
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
	border-bottom: 1px solid #EDEDED;
	margin: 32rpx 48rpx;
	padding-bottom: 24rpx;

	
	.avatar {
		width: 80rpx;
		height: 80rpx;
		margin-right: 24rpx;
		
		image {
			height: 80rpx;
			width: 80rpx;
		}
	}	
	
	.nickName {
		font-family: "Mulish";
		line-height: 80rpx ;
	}
}
		
</style>
