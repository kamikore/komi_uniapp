const actions = {
	login({commit},playload) {
		commit("LOGIN",playload)
	},
	logout({commit},playload) {
		commit("LOGOUT",playload)
	}
}

export default actions