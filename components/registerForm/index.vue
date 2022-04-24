<template>
	<view class="registerForm">
		<uni-forms :modelValue="formData" :rules="rules" ref="form">
			<uni-forms-item name="account">
				<uni-easyinput type="text" v-model="formData.account" :styles="inputStyles" :placeholderStyle="placeholderStyle" placeholder="请输入账号" />
			</uni-forms-item>
			<uni-forms-item name="email">
				<uni-easyinput type="text" v-model="formData.email" :styles="inputStyles" :placeholderStyle="placeholderStyle" placeholder="请输入邮箱" />
			</uni-forms-item>
			<uni-forms-item name="password">
				<uni-easyinput type="password" v-model="formData.password" :styles="inputStyles" :placeholderStyle="placeholderStyle" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-forms-item name="checkpass">
				<uni-easyinput type="password" v-model="formData.checkpass" :styles="inputStyles" :placeholderStyle="placeholderStyle" placeholder="请确认输入密码" />
			</uni-forms-item>
		</uni-forms>
		<button @click="submitForm">Register</button>
	</view>
</template>

<script>
const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") 
export default {
	name: "",
	data() {
		return {
			formData: {
				account:"",
				email:"",
				password: "",
				checkpass: "",
			},
			rules: {
				// 为了保证account email 都能登录，account 不能输入特殊字符
				account: {
					rules: [
						{
							required: true,
							errorMessage: '输入内容不可为空'
						},
						{
							validateFunction:function(rule,value,data,callback){
								if (pattern.test(value)) {
									callback('不能包含@*""/等特殊字符')
								}
								return true
							}
						}
					]
				},
				email: {
					rules: [
						{
							required: true,
							errorMessage: '输入内容不可为空'
						},
						{
							format: 'email',
							errorMessage: '请输入正确的邮箱地址'
						}
					]
				},
				password: {
					rules: [
						{
							required: true,
							errorMessage: '输入内容不可为空'
						},
					]
				},
				checkpass: {
					rules: [
						{
							required: true,
							errorMessage: '输入内容不可为空'
						},
						{
							// 为空时无法触发自定义规则
							validateFunction:function(rule,value,data,callback){
								if (value != data.password) {
									callback('两次输入的密码不一致')
								}
								return true
							}
						}
					]
				},
				
			},
			inputStyles: {
				color: "blue",
			},
			placeholderStyle: "font-size: 30rpx",
		};
	},
	methods: {
		submitForm() {
			this.$refs.form.validate().then(data=>{
				uni.request({
				    url: "http://120.79.218.59:8080/komi/users/register",
					method: "POST",
				    data,
				    // header: {
				    //     'custom-header': 'hello' //自定义请求头信息
				    // },
				    success: (res) => {
						if(res.statusCode !=200) {
							console.log(res.errMsg)
						} else {
							// 表单置空
							Object.keys(this.formData).forEach(key=>{this.formData[key]=''})
							uni.showToast({
								title:'注册成功',
								icon:"success"
							})
							console.log('注册成功！！');
						}

				    }
				});
			}).catch(err =>{
				uni.showToast({
					title:err.msg[0],
					icon:"error"
				})
				console.log('表单错误信息：', err);
			})
		}
	}
};
</script>

<style lang="scss" scoped>
	.uni-easyinput {
		::v-deep .uni-easyinput__content-input {
			height: 100rpx;
		}
	}
	
</style>
