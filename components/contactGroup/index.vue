<template>
<view class="contactGroup">
	<view class="checkgroup">
		<view class="initials">A</view>
		<checkbox-group @change="checkboxChange">
			<label class="checkbox" v-for="(val,key) in contacts" :key="key">
				<view>
					<!-- {{val}} -->
					<!-- value 类型为string -->
					<checkbox :value="`${val.fid.user_id}`" color="#F0AD4E" />
				</view>
				<contact :contact="val"></contact>
			</label>
		</checkbox-group>
	</view>
</view>
</template>

<script>
import {mapState} from "vuex"
import contact from "@/components/contact"

export default {
	name:"contactGroup",
	components:{
		contact
	},
	computed: mapState(['userInfo','contacts']),
	data() {
		return {
		
		};
	},
	methods:{
		checkboxChange({detail}) {
			let value =  detail.value ;
			// 加上创建者的id
			value.push(this.userInfo.uid);
			if( value.length === 0) {
				uni.$emit("updateChosen",{value,state:false})
			} else {
				uni.$emit("updateChosen",{value,state:true})
			}
		}
	},
}
</script>

<style lang="scss">
.contactGroup {
	.checkgroup {
		
		.initials{
			height: 50rpx;
			background: #ededed;
		}
		
		.checkbox {
			display: flex;
			align-items: center;
			padding: 10rpx 20rpx;

		}
	}
}
</style>
