<template>
	<view class="contacts-container">
		<Header title="contacts"></Header>
		<view class="fun-area">扩展区域
			<view class="newFriends" @click="goNewFriends">新的朋友</view>
		</view>
		<view class="contact-list">
			<view class="contact-item">
				<view class="initials">A</view>
				<view class="user" v-for="(item,index) in contacts" :key="index" @click="goDetail(item.fid.id)">
					<view class="avatar"><image src="../../static/images/chatroom/emoji.png" mode=""></image></view>
					<view class="username">{{item.remarkName}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Header from "@/components/header/index"
export default {
	name: "contacts",
	components:{
		Header,
	},
	data() {
		return {
			contacts: [],
		};
	},
	methods: {
		goDetail(fid) {
			uni.navigateTo({
				url: `/subpages/userDetails/index?uid=${fid}`
			})
		},
		goNewFriends() {
			
		},
	},
	onLoad() {
		uni.request({
			url: "http://localhost:3000/komi/users/contacts",
			method:"GET",
			data: {uid: uni.getStorageSync("userInfo")},
			success: (res) => {
				this.contacts = res.data;
			}
		})
	}
};
</script>

<style lang="scss" scoped>

.fun-area {
	width: 100%;
	height: 300rpx;
}
	
.contact-list {
	.contact-item {
		.initials{
			height: 50rpx;
			background: #C0C0C0;
		}
		
		.user {
			display: flex;
			column-gap: 20rpx;
			
			.avatar {
				image {
					height: 40rpx;
					width: 40rpx;
				}
			}	
		}
	}
}
</style>
