import registerServer from '@/utils/registerServer'
import api from '@/utils/api';
import request from '@/utils/request';
import { notification } from 'antd';
import router from 'umi/router';
import moment from 'moment';

const {
  create_goods,
  detail_goods
} = api

const _service = registerServer({
  save: {
    url: create_goods,
    method: 'post'
  },
  detail: {
    url: detail_goods,
    method: 'post'
  }
}, request)

const Model = {
  namespace: 'goodsEditModel',
  state: {
    item: {},
    isEdit: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/goods/add') {
          dispatch({
            type: 'updateState',
            payload: {
              isEdit: false,
              item: {}
            }
          })
        }
        if (location.pathname === '/goods/edit') {
          const {id} = location.query
          dispatch({
            type: 'updateState',
            payload: {
              isEdit: true,
            }
          })
          dispatch({
            type: 'getDetail',
            payload: {
              id
            }
          })
        }
      })
    }
  },
  effects: {
    *save({ payload = {}, callback, }, { call, put }) {
      const {code, data, errorMessage} = yield call(_service.save, payload);
      if (code === 0) {
        if (callback) {
          callback()
        } else {
          router.push({
            pathname: '/goods',
          })
        }
        notification.success({
          message: "保存成功！",
          duration: 1,
        })
      } else {
        throw {
          errorMessage
        }
      }
    },
    *update({ payload = {} }, { call, put }) {
      const {code, errorMessage} = yield call(_service.update, payload);
      if (code === 0) {
        router.push('/tool/segment')
        notification.success({
          message: "更新成功！",
          duration: 1,
        })
      } else {
        throw {
          errorMessage
        }
      }
    },
    *getDetail({ payload = {} }, { call, put }) {
      const {code, data, errorMessage} = yield call(_service.detail, payload);
      if (code === 0) {
        yield put({
          type: 'updateState',
          payload: {
            item: data || {}
          }
        })
      } else {
        throw {
          errorMessage
        }
      }
    }
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
