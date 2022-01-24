import vue from "vue"
export function fetchContact() {
	// 加载联系人，还待优化！！！
	let contacts = new Object();
	uni.request({
		url: "http://localhost:3000/komi/users/contacts",
		method:"GET",
		data: {uid: uni.getStorageSync("userInfo").uid},
		success: (res) => {
			console.log("fetchContact res",res)
			// 重构数组，以fid为key作对象, res.fid 是关联表的整个对象,但也需要把remarkName取出
			res.data.forEach(item => {
				// this.contacts[item.fid.id] = item; 无法触发响应
				vue.set(contacts,item.fid.id,item)
			})
			// 缓存contacts 
			uni.setStorageSync("contacts",contacts)
			console.log("设置contacts",contacts)
		}
	})
}



export function addContact(fid,nickName) {
	const userInfo = uni.getStorageSync("userInfo");
	console.log(userInfo)
	uni.request({
		url: "http://localhost:3000/komi/users/addContact",
		method:"POST",
		// 提供添加人的ID, 以及自己的ID
		data: {
			fid,
			uid: userInfo.uid,
			// 接收好友，默认以nickName 为备注
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