<template>
	<view class="loginForm">
		<uni-forms :modelValue="formData" :rules="rules" ref="form">
			<uni-forms-item name="account">
				<uni-easyinput type="text" v-model="formData.account" :styles="styles" :placeholderStyle="placeholderStyle" placeholder="请输入账号/邮箱" />
			</uni-forms-item>
			<uni-forms-item name="password">
				<uni-easyinput type="password" v-model="formData.password" :styles="styles" :placeholderStyle="placeholderStyle" placeholder="请输入密码" />
			</uni-forms-item>
		</uni-forms>
		<button @click="submitForm">Login</button>
	</view>
</template>

<script>
import {fetchContact} from "../../api"
export default {
	name: 'loginForm',
	data() {
		return {
			formData: {
				account: '',
				password: ''
			},
			rules: {
				account: {
					rules: [
						{
							required: true,
							errorMessage: '输入内容不可为空'
						},
					]
				},
				password: {
					rules: [
						{
							required: true,
							errorMessage: '输入内容不可为空'
						},
					]
				}
			},
			styles: {
				color: 'blue'
			},
			placeholderStyle: 'font-size: 30rpx'
		};
	},
	methods: {
		submitForm() {
			this.$refs.form.validate().then(data=>{
				uni.request({
				    url: "http://localhost:3000/komi/users/login",
					method: "POST",
				    data,
				    // header: {
				    //     'custom-header': 'hello' //自定义请求头信息
				    // },
				    success: (res) => {
						const data = res.data;
						if(res.statusCode != 200) {
							console.log(data.errMsg)
						} else {
							console.log(res)
							uni.$emit("fetchContentList",{uid:data.uid});
							this.$store.dispatch("login",data)
							fetchContact();
							this.$socket.emit("login",{
								uid: data.uid
							});	
							uni.redirectTo({
								url:"pages/index/index"
							})
							// try {
							//     uni.setStorageSync('token', res.data.token);
							// } catch (err) {
							//     console.log(err)
							// }
						}
				    },
					fail: res => {
						console.log("res error:", res)
					}
				});
			}).catch(err =>{
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
