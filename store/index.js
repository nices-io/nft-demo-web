export const state = () => ({
    email: "",
    externalaccount:'',
})

export const mutations = {
    setEmail (state,email) {
        state.email = email
    },
    setAddress(state,address){
        state.externalaccount = address
    }
}
