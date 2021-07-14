import axios from 'axios'
import Toast from 'vue-m-message'

const conf = process.env.conf

let baseURL;


export const axiosGet = (url, params = {},prefix="api") => {

    return axios({
        baseURL: baseURL,
        method: 'get',
        url:   `/${prefix}${url}`,
        params: params,
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function(response) {
        const res = response.data;
        if((res.code == '200')) {

        } else {
            Toast({
                type: 'error',
                message: `${ res.code}${res.msg}`
            })

            if(res.code == '307' || res.code == '306') {

                window.location.href = '/signin'
            }
        }
        return res;
    })
}
export const axiosPost = (url,  params = {},prefix="api") => {
    return axios({
        baseURL: baseURL,
        method: 'post',
        url:   `/${prefix}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function(response) {
        const res = response.data;
        if((res.code == '200')) {

        } else {
            Toast({
                type: 'error',
                message: `${ res.code}${res.msg}`
            })

            if(res.code == '307' || res.code == '306') {

                window.location.href = '/signin'
            }
        }
        return res;
    })
}
