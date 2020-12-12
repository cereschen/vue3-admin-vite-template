import request from '@/utils/request'

export function login(data: { username: string, password: string }) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export interface UserInfo {
  avatar: string,
  introduction: string,
  name: string,
  roles: string[]
}

export function getInfo(token: string) {
  return request<UserInfo>({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
