<template>
	<view class="addContacts">
		<uni-forms :modelValue="formData" ref="form">
			<uni-forms-item label="发送添加申请" name="content" labelPosition="top">
				<uni-easyinput 
					type="textarea" 
					v-model="formData.content" 
					:styles="styles" 
					:placeholderStyle="placeholderStyle" 
					placeholder="申请信息"
				/>
			</uni-forms-item>
			<uni-forms-item label="设置备注" name="remarkName" labelPosition="top">
				<uni-easyinput 
					type="textarea" 
					v-model="formData.remarkName" 
					:styles="styles" 
					:placeholderStyle="placeholderStyle" 
					placeholder="nickName"
				/>
			</uni-forms-item>
		</uni-forms>
		<button type="primary" @click="submitForm">Submit</button>
	</view>
</template>

<script>
export default {
	name: 'addContacts',
	data() {
		return {
			formData: {
				content: '',
				remarkName: '',
			},
			styles: {
				
			},
			fid:null,
			placeholderStyle: 'font-size: 30rpx; color: #a1a1a1;',
		};
	},
	methods: {
		submitForm(){
			this.$refs.form.validate().then(res=>{
					console.log('表单数据信息：', res);
					const userInfo =  uni.getStorageSync("userInfo");
					console.log(userInfo)
					this.$socket.emit("addContact",{
						// 需要满足一个消息的所有字段
						msg_to: this.fid,
						msg_from: userInfo.uid,
						// 发起好友请求的用户信息
						msg_content: userInfo.nickName,
						msg_type: 5,
						dateTime: new Date(),
					})
					
					uni.showToast({
						title:"发送成功",
						icon:"success"
					})
				}).catch(err =>{
					console.log('表单错误信息：', err);
				});
		}
	},
	onLoad(option) {
		console.log(option)
		this.fid = option.fid;
	}
};
</script>

<style lang="scss" scoped>
	
</style>
