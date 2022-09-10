/**
 * 用户相关请求模块
 */
// import store from '@/store'
import request from '@/utils/request'

export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}

export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`
    })

}
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user',
        // headers: {
        //     // 注意：该接口需要授权才能访问
        //     //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })

}
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}
//关注用户
export const addFollow = (target) => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}
//取消关注用户
export const deleteFollow = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`,

    })
}//获取用户个人信息
export const getUerPerInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile',

    })
}
//编辑用户个人信息
export const updateInfo = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/profile',
        data

    })
}
//编辑用户头像的
export const updatePhoto = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/photo',
        data

    })
}