import request from '@/utils/request'

export interface Item {
  author: string,
  display_time: string,
  id: string,
  pageviews: number,
  status: string,
  title: string
}
export function getList(params?: Record<any, any>) {
  return request<{ items: Item[], total: number }>({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
