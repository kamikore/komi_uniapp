<template>
	<view class="contact-list">
		<view class="contact-item">
			<view class="initials">A</view>
			<view  v-for="(val, key) in contacts" :key="key" @click="clickHandler(val)">
				{{val}}
				<contact :contact="val"></contact>
			</view>
		</view>
	</view>
</template>

<script>
import contact from "@/components/contact"
	
export default {
	name: "contactList",
	components:{
		contact
	},
	props: ["contacts"],
	data() {
		return {
			
		};
	},
	methods: {
		clickHandler(val) {
			if(val.group_id) {
				uni.navigateTo({
					url: `../chatroom/index?gid=${val.group_id}`
				})
			} else {
				uni.navigateTo({
					url: `../userDetails/index?fid=${val.fid.user_id}`
				})
			}
			
		},
	},
};
</script>

<style lang="scss" scoped>
.contact-list {
	.contact-item {
		.initials{
			height: 50rpx;
			width: 100vw;
			background: #ededed;
		}
		
	}
}
</style>
