import request from "@/utils/request"
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })
}
export const addUserChannels = channel => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
}
//删除用户指定频道
export const deleteUserChannels = channelID => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/channels/${channelID}`, //路径参数

    })
}