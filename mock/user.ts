
import { MockMethod } from 'vite-plugin-mock';

const tokens: Record<string, { token: string }> = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users: Record<string, { roles: string[], introduction: string, avatar: string, name: string }> = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}


const mocks: MockMethod[] = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    method: 'post',
    response: ({ body }) => {
      const { username } = body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          ElMessage: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },
  // get user info
  {
    url: '/vue-admin-template/user/info',
    method: 'get',
    response: ({ query }) => {
      const { token } = query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          ElMessage: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },
  // user logout
  {
    url: '/vue-admin-template/user/logout',
    method: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
];




export default mocks
