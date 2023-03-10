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
	updateAvatar({commit},playload) {
		commit("UPDATEAVATAR",playload)
	},
	updateCover({commit},playload) {
		commit("UPDATECOVER",playload)
	},
	updateUnRead({commit},playload) {
		commit("UPDATEUNREAD",playload)
	},
	clearUnRead({commit},playload) {
		commit("CLEARUNREAD",playload)
	},
}

export default actions