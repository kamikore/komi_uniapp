// 相当于store 内的计算属性, 接受 state 作为其第一个参数,state.todos
const getters = {
	// mapState 就好
  userInfo: state => state.userInfo,
  islogin: state => state.islogin,  
  contacts: state => state.contacts,
  unRead: state => state.unRead,
}
export default getters
