import 'axios'
declare module 'axios' {
  export interface AxiosInstance {
    <T>(config: AxiosRequestConfig): Promise<{ code: number, data: T }>;
  }
}