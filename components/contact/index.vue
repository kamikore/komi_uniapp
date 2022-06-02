<template>
		<view class="contact">
			<view class="avatar"><image :src="avatarSrc" mode="aspectFill"></image></view>
			<view class="nickName">{{isGroup?contact.group_name:contact.remarkName}}</view>
		</view>
</template>

<script>
	
export default {
	name: "contact",
	props: ['contact','isGroup'],
	computed: {
		avatarSrc() {
			if(this.isGroup) {
				return '../../static/images/future.png'
			} else {
				return this.contact.fid.avatar || '../../static/images/future.png'
			}
			
		}
	},
	data() {
		return {
			
		};
	},
	methods: {
	},
	
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
