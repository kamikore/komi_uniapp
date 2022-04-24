<template>
	<view>
		<contact-list :contacts="groupChats"></contact-list>
	</view>
</template>

<script>
import {mapState} from "vuex"
import  contactList from "@/components/contactList"	

export default {
	name:"groupChats",
	computed: mapState(['groupChats']),
	components:{
		contactList
	},
	data() {
		return {
		
		};
	},
}
</script>

<style lang="scss">

</style>
