<template>
	<view class="toolsBox">
		
		<view class="tool" v-for="(item, index) in tools" :key="index">
			<button @tap="selectTool(index)"><image :src="item.src" mode=""></image></button>
			<text>{{ item.title }}</text>
		</view>
	</view>
</template>

<script>
import {mapState} from 'vuex';
import {getVideoPoster, filePath2base64 , sendMsg} from '@/utils/index.js'

// 访问原生插件
const AfDocument = uni.requireNativePlugin("Aq-ChooseFile");

export default {
	name: 'toolsBox',
	props:['id','isGroup'],
	computed: {
		...mapState(['userInfo']),
		// 使用路径别名是不行的，路径别名需要在打包时被编译
		tools() {
			return [
				{
					src: '../../static/images/chatroom/image.png',
					title: '相册'
				},
				{
					src: '../../static/images/chatroom/camera.png',
					title: '拍摄'
				},
				{
					src: '../../static/images/chatroom/video.png',
					title: '视频通话'
				},
				{
					src: '../../static/images/chatroom/location.png',
					title: '位置'
				},
				{
					src: '../../static/images/chatroom/file.png',
					title: '文件'
				},
				{
					src: '../../static/images/chatroom/file.png',
					title: '测试'
				}
			];
		}
	},
	props:['id'],
	data() {
		return {
			
		};
	},
	methods: {
		selectTool(index) {
			switch (index) {
				case 0:
					uni.chooseImage({
						count:5,
						sourceType:['album'],
						success: (res) => {
							const {tempFilePaths} = res;
							tempFilePaths.forEach((file) => {
								
								sendMsg({
									msg_content : file,
									msg_to : this.id,
									msg_type : 2,
									isGroup:this.isGroup,
								})
								// uni.$emit('chatroomMsg', {
								// 	msg_content: file,
								// 	dateTime: Date.now(),
								// 	msg_type: 2,
								// 	msg_from: this.userInfo.uid, 
								// 	self: 1
								// });
								
								// this.$socket.emit('chatMsg', {
								// 	msg_content: file,
								// 	msg_to: this.id, // 发出去，发别人的id
								// 	msg_from: this.userInfo.uid, // 还需要附上自己的id
								// 	msg_type: 2,
								// 	dateTime: Date.now()
								// });
							})
							
						},
						fail: (err) => {
							console.log("选取图片发生错误",err)
						}
					})
					break;
				
				case 1:
					uni.showActionSheet({
						title:'选择拍摄类型',
						itemList: ['拍照', '录像'],
						success: res => {
							getVideoPoster(res.tempFilePath)
							if(res.tapIndex) {
								uni.chooseVideo({
									sourceType:['camera'],
									success: res => {
										uni.$emit('chatroomMsg', {
											msg_content: res.tempFilePath,
											dateTime: Date.now(),
											msg_type: 3,
											msg_from: this.userInfo.uid, 			
											self: 1
										});
										
										this.$socket.emit('chatMsg', {
											msg_content: res.tempFilePath,
											msg_to: this.id, // 发出去，发别人的id
											msg_from: this.userInfo.uid, // 还需要附上自己的id
											msg_type: 3,
											dateTime: Date.now()
										});
										
									},
									fail: (err) => {
										console.log('发生错误',errMsg)
									}
								})
							} else {
								uni.chooseImage({
									sourceType:['camera'],
									success: res => {
										uni.$emit('chatroomMsg', {
											msg_content: res.tempFilePaths[0],
											dateTime: Date.now(),
											msg_type: 2,
											msg_from: this.userInfo.uid, 
											self: 1
										});
										this.$socket.emit('chatMsg', {
											msg_content: res.tempFilePaths[0],
											msg_to: this.id, // 发出去，发别人的id
											msg_from: this.userInfo.uid, // 还需要附上自己的id
											msg_type: 2,
											dateTime: Date.now()
										});
									},
									fail: (err) => {
										console.log("发生错误",errMsg)
									}
								})
							}
						},
						fail:  res=> {
							console.log(res.errMsg);
						}
					})
					break;
				case 2:
					console.log('2');
					uni.navigateTo({
						url: '/pages/livePush/index'
					});
					break;
				case 3:
					console.log("3")
					break;
				case 4:
					uni.showActionSheet({
						title:'文件选择',
						itemList:['手机存储','手机相册'],
						success: tapIndex => {
							if(tapIndex) {
								AfDocument.openMode({
									size: '10', //选择总数量
									paths:['/storage/emulated/0/Pictures'],
									isDown:true,//是否下钻（true 筛选当前目录以下的所有文件，fales 只筛选当前目录文件） 
									types:[
									{
										name:'图片',
										value:['jpg','png'] 
									},
									{
										name:'视频',
										value:["mp4"] 
									}]
								},(res)=>{
									console.log("文件路径",JSON.stringify(res))
									res.res.forEach( file => {
										filePath2base64(file).then(res => {
											sendMsg({
												msg_content : res,
												msg_to : this.id,
												msg_type : 4,
												isGroup:this.isGroup,
											})
										})
										
									})
								})
							} else {
								AfDocument.openMode({
									size: '10', //选择总数量
									isDown:false,//是否下钻（true 筛选当前目录以下的所有文件，fales 只筛选当前目录文件） 
									types:[{
										name:'文档',
										value:["doc","wps","docx","xls","xlsx","pdf","pptx"]
									},{
										name:'视频',
										value:["mp4"] 
									},{
										name:'音乐',
										value:['mp3','flac'] 
									},{
										name:'图片',
										value:['jpg','png'] 
									}, {
										name: '压缩包',
										value:['zip','rar','7z']
									}]
								},(res)=>{
									this.data = JSON.stringify(res);
								})
							}
						}
					})
					break;
			}
		},
		
	}
};
</script>

<style lang="scss" scoped>
.toolsBox {
	display: grid;
	grid-template-columns: repeat(4, 25%);
	align-items: center;
	justify-content: center;
	row-gap: 40rpx;
	padding: 0 20rpx;
	padding-top: 60rpx;

	.tool {
		text-align: center;
		button {
			height: 110rpx;
			width: 110rpx;
			padding: 20rpx 20rpx;
			border-radius: 40rpx;

			image {
				height: 72rpx;
				width: 72rpx;
				background-size: cover;
			}
		}

		text {
			color: #708090;
		}
	}
}
</style>
