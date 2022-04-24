const actions = {
	login({commit},playload) {
		commit("LOGIN",playload)
	},
	logout({commit},playload) {
		commit("LOGOUT",playload)
	},
	updateContacts({commit},playload) {
		commit("UPDATECONTACTS",playload)
	},
	updateGroupChats({commit},playload) {
		commit("UPDATEGROUPCHATS",playload)
	},
}

export default actions