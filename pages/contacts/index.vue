<template>
	<view class="contacts-container">
		<!-- 预留插槽作为自定制内容 ？？？ 但这里时页面 -->
		<!-- <slot></slot> -->
		
		<contact-extension></contact-extension>
		<contact-list :contacts="contacts"></contact-list>
		<view class="tabbarShadow"></view>
	</view>
</template>

<script>
import {mapState} from "vuex"
import  contactList from "@/components/contactList"
import contactExtension from "@/components/contactExension"

export default {
	name: "contacts",
	components:{
		contactList,
		contactExtension
	},
	computed: mapState(['contacts']),
	data() {
		return {
		};
	},

	methods: {

	},
	onLoad() {
	},
	onShow() {
		// 初步通过判断 isUpdateContacts 是否发生了更新联系人的操作、
		// if (this.$store.state.isUpdateContacts) {
			console.log('更新联系人')
			this.$store.dispatch("updateContacts")
		// }
	},
	onNavigationBarButtonTap(e) {
		console.log(e)
		if (e.index == 0) {
			this.showMenu = !this.showMenu;
			uni.navigateTo({
				url: '/pages/dropdownMenu/index'
			});
		}
	},
};
</script>

<style lang="scss" scoped>
</style>
