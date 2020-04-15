import registerServer from '@/utils/registerServer'
import api from '@/utils/api';
import request from '@/utils/request';
import {message} from 'antd'
import {setToken} from '@/utils/auth'

const {
  login
} = api

const _service = registerServer({
  login: {
    url: login,
    method: 'post'
  },
}, request)

const Model = {
  namespace: 'loginModel',
  state: {
    list: [],
    info: {},
    visible: false,
    pagination: {},
    campaignInfo: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {

      })
    }
  },
  effects: {
    *login({ payload = {} }, { call, put }) {
      const {code, data, errorMessage} = yield call(_service.login, payload);
      if (code === 0) {
        message.success('登录成功！')
        const token = data.token
        setToken(token)
        setTimeout(() => {
          window.location.href = '/goods'
        }, 300)
      } else {
        message.error(errorMessage)
      }
    },
  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
};
export default Model;
