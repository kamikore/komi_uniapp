<template>
	<view class="editor-container">
		<view class="components">
			<view v-if="field==='nickName'" class="nickName">
				<input type="text" v-model="value" auto-focus/>
			</view>
			<view v-else-if="field==='account'" class="account">
				<input type="text" v-model="value" auto-focus/>
			</view>
			<view v-else-if="field==='gender'" class="gender">
				<radio-group name="" @change="handleChecked">
					<label>
						<radio value="0" :checked="value?false:true"/><text>男</text>
					</label>
					<label>
						<radio value="1" :checked="value?true:false" /><text>女</text>
					</label>
				</radio-group>
			</view>
			<view v-else-if="field==='region'" class="region">
				 <uni-data-picker 
					:placeholder="value || '请选择地区'" 
					popup-title="请选择地区" 
					collection="opendb-city-china"
					field="code as value, name as text"
					self-field="code" 
					parent-field="parent_code"
					:clearIcon="true"
					:step-searh="true"
					@change="onChange"
				 >
				 </uni-data-picker>
			</view>
			<view v-else class="signature">
				<textarea v-model="value" maxlength="25"  placeholder="" auto-focus/>
			</view>
		</view>
		<button type="default" @click="save">保存</button>
	</view>
</template>

<script>
import {uploadUserInfo} from "@/api"
import {mapState} from "vuex"	

	
export default {
	name: "infoEditor",
	props:['field'],
	computed:mapState(['userInfo']),
	data() {
		return {
			value: ''
		};
	},
	methods: {
		save() {
			this.userInfo[this.field] = this.value
			uploadUserInfo(this.field,this.value)
			uni.setStorageSync('userInfo',this.userInfo)
		},
		handleChecked(event) {
			this.value = Number(event.detail.value)
		},
		onChange({detail}) {
			const {value} = detail
			let region = ''
			value.forEach((item) =>{
				region += ' '+item.text
			})
			this.value = region
		},
	},
	created() {
		this.value = this.userInfo[this.field]
	}
};
</script>

<style lang="scss" scoped>
.components {
	
	input {
		height: 100rpx;
		width: calc(100% - 40rpx - 40rpx);
		margin: 20rpx 20rpx;
		padding: 0 20rpx;
		background-color: #F7F7FC;
		
	}
	
	textarea {
		height: 200rpx;
		width: 80%;
		padding: 20rpx 20rpx;
		margin: 40rpx auto;
		background-color: #F7F7FC;
		margin-bottom: 60rpx;
	}
	
	radio-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 40rpx;
		
		radio {
			line-height: 100rpx;
			height: 100rpx;
			padding: 0 20rpx;
		}
	}
	
	.uni-data-tree {
		height: 100rpx;
		width: 80%;
		padding: 20rpx 20rpx;
		margin: 40rpx auto;
		margin-bottom: 60rpx;
	}
}

button {
	height: 100rpx;
	width: 50%;
	background: #002DE3;
	border-radius: 20rpx;
	color: #FFFFFF;
}
</style>
