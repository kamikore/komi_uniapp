<template>
	<!-- 复用contacts 内的组件 -->
	<view class="groupChat">
		<contact-exension></contact-exension>
		<contactGroup></contactGroup>
		
		<button type="default" @click="back">back</button>
		
		<!-- 自定义tabbar -->
		<cover-view class="tabbar">
			<text class="tip" v-show="showTip">至少选择两个联系人！！</text>
			<button 
				type="default" 
				:disabled="!isChosen" 
				:class="{active: isChosen}"
				@click="newChat"
			>
				Done <text v-show="values.length">({{values.length-1}})</text>
			</button>
		</cover-view>
	</view>
</template>

<script>
import contactExension from "@/components/contactExension"
import contactGroup from "@/components/contactGroup"
import {mapState} from "vuex"

export default {
	name: "groupChat",
	components: {
		contactExension,
		contactGroup,
	},
	computed: mapState(['userInfo','contacts','groupChats']),
	data() {
		return {
			isChosen: false,
			showMask: false,
			values: [],
			showTip:false,
		}
	},
	beforeRouteLeave(to, from, next) {
		// 导航离开该组件的对应路由时调用
		// 可以访问组件实例 `this`

		next();
	},
	methods: {
		newChat() {
			if(this.values.length === 1) {
				// 提示信息
				this.showTip = true;
				return 
			}
			this.showTip = false;
			
			// 默认群组名为，contact 内的微信原昵称	
			let groupName = "";
			this.values.forEach(item => {
				if(index === this.values.length-1) return;
				groupName += index === 0?`${this.contacts[item].fid.nickName}`:`, ${this.contacts[item].fid.nickName}`;
			})
			// 加上创建者的昵称 
			groupName += `, ${this.userInfo.nickName}`
			
			
			uni.request({
				url:"http://120.79.218.59:8080/komi/group/newChat",
				method: "POST",
				data:{
					group: this.values,
					groupName,
					uid: this.userInfo.uid,
				},
				success: (res) => {
					this.values = [];
					let group = res.data;
					// 创建后会更新一个自定义的消息，触发更新homeMsg, 并不会更新具体chatroomMsg
					uni.$emit('homeMsg', {
						msg_content: `${group.group_name}加入了群聊`,
						dateTime: group.create_dateTime,
						msg_from: group.group_id,
						isGroup: true,
					})
					
					uni.navigateTo({
						url: `pages/chatroom/index?gid=${group.group_id}`
					})
					this.$set(this.groupChats,group.group_id,group);
					uni.setStorageSync(`uid${this.userInfo.uid}groupChats`,this.groupChats)
				}
			})
			
		},
		back() {
			uni.navigateBack({
				delta:1
			})
		}
	},
	onLoad() {
		// 避免重复注册
		uni.$off('updateChosen');
		
		uni.$on("updateChosen",(data) =>{
			this.isChosen = data.state;
			this.values = data.value;
		}) 
	}


}
</script>

<style lang="scss">
		
.groupChat {
	
	.tabbar {
		width: 100%;
		height: 50px;
		position: fixed;
		bottom: 0;
		// #ifdef H5
			padding-bottom: var(--window-bottom);
		// #endif
		// #ifdef APP
			padding-bottom: 50rpx;
		//#endif
		background-color: #f8f8f8;
		
		.tip {
			position: absolute;
			left: 60rpx;
			top: 20rpx;
			line-height: 60rpx;
			color: #cdcfd3;
		}
		
		button {
			position: absolute;
			right: 20rpx;
			top: 20rpx;
			height: 60rpx;
			padding: 0 10rpx;
			line-height: 60rpx;
			background-color: #f7f7f7;
		}
		
		.active {
			background-color: #F0AD4E;
			color: #FFF3E0;
		}
	}
}
</style>
