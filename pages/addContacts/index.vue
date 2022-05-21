<template>
	<view class="addContacts">
		<uni-forms id="form" :modelValue="formData" ref="form">
			<uni-forms-item label="发送添加申请" label-width="100" name="content" labelPosition="top">
				<uni-easyinput 
					type="textarea" 
					v-model="formData.content" 
					:styles="styles" 
					:placeholderStyle="placeholderStyle" 
					placeholder="申请信息"
				/>
			</uni-forms-item>
			<uni-forms-item label="设置备注" name="remarkName" label-width="100" labelPosition="top">
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
					this.$socket.emit("addContact",{
						// 需要满足一个消息的所有字段
						msg_to: this.fid,
						msg_from: userInfo.uid,
						// 发起好友请求的用户信息
						msg_content: this.formData.content || '我是'+userInfo.nickName,
						msg_type: 5,
						remarkName: this.formData.remarkName,
						nickName: userInfo.nickName,
						dateTime: new Date(),
					})
					
					uni.showToast({
						title:"发送成功",
						icon:"success",
						success() {
							uni.navigateBack();
						}
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
	#form {
		margin: 20rpx 40rpx;
	}
	
	button {
		width: 50%;
		line-height: 120rpx;
		font-family: 'Mulish';
		font-style: normal;
		font-weight: 600;
		font-size: 32rpx;
		background-color:#2C37E1;
		border-radius: 20rpx;
		color: #FFFFFF;
		margin-bottom: 48rpx;
	}
	
</style>
