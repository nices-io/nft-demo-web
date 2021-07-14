import {axiosGet,axiosPost} from '@/assets/lib/ajax'

//登录
export const login = (params = {}) => {
    return axiosPost(`/user/login`, params)
}
//注册
export const register = (params = {}) => {
    return axiosPost(`/user/register`, params)
}

//获取图片
export const getImage = (params = {}) => {
    return axiosGet(`/img/createImg`, params)
}

//获取账户信息
export const findAccount = (params = {}) => {
    return axiosPost(`/acc/findAccount`, params)
}
//图片购买
export const imgConfirm = (params = {}) => {
    return axiosGet(`/img/imgConfirm`, params)
}
//退出登录
export const loginOut = (params = {}) => {
    return axiosGet(`/user/loginOut`, params)
}
// 我的NFT
export const findNFT = (params = {}) => {
    return axiosGet(`/acc/findNFT`, params)
}
// wnd余额
export const balanceWND = (params = {}) => {
    return axiosGet(`/wnd/balanceWND`, params)
}
// 充提币查询
export const selectCoinsLogList = (params = {}) => {
    return axiosPost(`/coins/selectCoinsLogList`, params)
}
// 转账WND
export const transferWND = (params = {}) => {
    return axiosPost(`/coins/transferWND`, params)
}
// 转账NFT
export const transferNFT = (params = {}) => {
    return axiosPost(`/acc/transferNFT`, params)
}

// 生成地址
export const accountGenerate = (params = {}) => {
    return axiosPost(`/substrate/account/generate`, params,"blockapi")
}
// 查询区块事务信息
export const transactions = (params = {}) => {
    return axiosPost(`/substrate/transactions`, params,"blockapi")
}
// 查询区块事务信息
export const rmrkNftSend = (params = {}) => {
    console.log(params)
    return axiosPost(`/rmrk/nft/send`, params,"blockapi")
}
// 查询地址余额
export const externalBalance = (params = {}) => {
    return axiosGet(`/substrate/account/${params.address}/balances`, params,"blockapi")
}

