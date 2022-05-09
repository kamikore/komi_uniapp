<template>
	<view class="userDetail-container">
		<profile :contactInfo="contactInfo"></profile>
		<view id="switch">
			<view id="slider" :style="{left: isSwitch?'calc(50% - 4rpx)':'4rpx'}"></view>
			<button :class="isSwitch?'':'active'" type="default" @click="isSwitch = 0">Chat</button>
			<button :class="isSwitch?'active':''" type="default" @click="isSwitch = 1">intro</button>
		</view>
		<view id="contentBox">
			<component v-if="!isSwitch" is="momentList"></component>
			<view class="" v-else>
				<button type="default" @click="goChat">发送消息</button>
				<button type="default" v-if="!isContact" @click="addToContacts">添加到通讯录</button>
			</view>
		</view>	
	</view>
</template>



<script>
import {mapState} from "vuex"
import profile from "@/components/profile"
import momentList from "@/components/momentList"

export default {
	name: "userDetails",
	components:{
		profile,
		momentList 
	},
	computed:mapState(['contacts','userInfo']),
	data() {
		return {
			contactInfo:"",
			isContact: false,
			isSwitch: 0
		};
	},
	methods: {
		goChat() {
			uni.navigateTo({
				url:`../chatroom/index?fid=${this.contactInfo.user_id}`
			})
		},
		addToContacts() {
			uni.navigateTo({
				url: `../addContacts/index?fid=${this.contactInfo.user_id}`
			})
		}
	},
	onLoad(option) {
		console.log("userDetail",option)
		if(this.contacts.hasOwnProperty(option.fid) || this.userInfo.user_id == option.fid)  {
			this.isContact = true;
		}
		// 判断对象为空
		if(Object.keys(option).length == 0) {
			console.log("没有提供ID")
			return;
		}		
		uni.request({
			url: "http://120.79.218.59:8080/komi/users/detail",
			method:"GET",
			data: option,
			success: res =>  {
				// 当前详情页用户信息
				this.contactInfo= res.data
				console.log("查询detail",this.contactInfo)
			}
			
		})
	},
};
</script>

<style lang="scss" scoped>
	
	#switch {
		position: relative;
		height: 100rpx;
		width: calc(100% - 48rpx*2);
		margin: 48rpx;
		display: flex;
		align-items: center;
		background-color: #ededed;
		border-radius:24rpx;
		
		#slider {
			position: absolute;
			top: 4rpx;
			left: 4rpx;
			width: 50%;
			height: 92rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			transition: all 0.5s ease-in-out;
		}
		
		.active {
			color: #2C37E1;
		}
		
		button {
			width: 100%;
			line-height: 90rpx;
			font-family: 'Mulish';
			font-style: normal;
			font-weight: 600;
			font-size: 32rpx;
			background-color: transparent;
			color: #A4A4A4;
			transition: all 0.5s ease-in-out;
			
		}
	}
	
	#contentBox {
		button {
			width: 50%;
			line-height: 90rpx;
			font-family: 'Mulish';
			font-style: normal;
			font-weight: 600;
			font-size: 32rpx;
			background-color:#2C37E1;
			border-radius: 20rpx;
			color: #FFFFFF;
		}
	}
</style>
