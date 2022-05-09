import vue from "vue"
import store from "@/store"


export function fetchContacts() {
	const userInfo =  uni.getStorageSync("userInfo");
	// 加载联系人，还待优化！！！
	let contacts = new Object();
	uni.request({
		url: "http://120.79.218.59:8080/komi/users/contacts",
		method:"GET",
		data: {uid: userInfo.uid},
		success: (res) => {
			// 重构数组，以fid为key作对象, res.fid 是关联表的整个对象,但也需要把remarkName取出
			res.data.forEach(item => {
				// this.contacts[item.fid.id] = item; 无法触发响应
				vue.set(contacts,item.fid.user_id,item)
			})
			// 缓存contacts 
			uni.setStorageSync('contacts',contacts)
		}
	})
}

export function fetchGroupChats() {
	const userInfo =  uni.getStorageSync("userInfo");
	let groupChats = new Object();
	uni.request({
		url: "http://120.79.218.59:8080/komi/group/groupChats",
		method:"GET",
		data: {uid: userInfo.uid},
		success: (res) => {
			res.data.forEach(item => {
				vue.set(groupChats,item.group_id.group_id,item.group_id)
			})
			uni.setStorageSync('groupChats',groupChats)
		},	
	})
}


/**
 * @param {Object} fid  
 * @param {String} nickName
 */
export function addContact(fid,nickName) {
	const userInfo = uni.getStorageSync("userInfo");
	uni.request({
		url: "http://120.79.218.59:8080/komi/users/addContact",
		method:"POST",
		// 提供添加人的ID, 以及自己的ID
		data: {
			fid,
			uid: userInfo.uid,
			// 接受好友，默认以nickName 为备注
			remarkName: nickName,
			username: userInfo.nickName,
		},
		success: res =>  {
			if(res.statusCode != 200) {
				console.log(res.data.errMsg)
			} else {
				console.log("添加成功")
			}
		}
	})
}


/**
 * @param {String} file - 文件base64编码
 * @param {String} type - 文件类型 
 * @param {String} action - 上传头像还是上传封面 
 */
export function uploadAvatarOrCover( file ,type, action) {
	uni.request({
		url: `http://120.79.218.59:8080/komi/uploads/${action}`,
		method:"POST",
		data: {
			file,
			user_id: store.state.userInfo.uid,
			account: store.state.userInfo.account,
			type
		},
		success: res =>  {
			if(res.statusCode != 200) {
				console.log(res.data.errMsg)
			} else {
				if(action === 'avatar') {
					store.dispatch("updateAvatar",res.data)
				} else {
					store.dispatch("updateCover",res.data)
				}
			}
		},
		fail: (err) => {
			console.log(err.errMsg)
		}
	})
}


/**
 * @param {String} field - 字段名
 * @param {String} value - 字段值
 */
export function uploadUserInfo(field,value) {
	uni.request({
		url: `http://120.79.218.59:8080/komi/userInfo/${field}`,
		method:"POST",
		// 提供添加人的ID, 以及自己的ID
		data: {
			uid: store.state.userInfo.uid,
			value
		},
		success: res =>  {
			if(res.statusCode != 200) {
				console.log(res.data.errMsg)
			} else {
				uni.navigateBack()
			}
		},
		fail: (err) => {
			console.log(err.errMsg)
		}
	})
}



/**
 * @param {String} files - 图片base64编码
 * @param {String} content - 文本描述
 * @param {String} fileTypes- 文件类型 
 */
export function uploadMoment( files ,content) {
	uni.request({
		url: 'http://120.79.218.59:8080/komi/moments/upload',
		method:"POST",
		data: {
			files,
			content,
			user_id: store.state.userInfo.uid,
			account: store.state.userInfo.account,
			dateTime: new Date(),
		},
		success: res =>  {
			if(res.statusCode != 200) {
				console.log(res.data.errMsg)
			} else {
				console.log("success")
			}
		},
		fail: (err) => {
			console.log(err.errMsg)
		}
	})
}

/**
 * @param {String} uid - 用户id，如果没有返回所有
 */
export function fetchMoments(uid=null) {
	uni.request({
		url: 'http://120.79.218.59:8080/komi/moments/fetch',
		method:"GET",
		data: {
			uid
		},
		success: res =>  {
			if(res.statusCode != 200) {
				console.log(res.data.errMsg)
			} else {
				console.log("success",res)
			}
		},
		fail: (err) => {
			console.log(err.errMsg)
		}
	})
}