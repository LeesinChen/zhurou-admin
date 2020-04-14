import registerServer from '@/utils/registerServer'
import api from '@/utils/api';
import request from '@/utils/request';
import {notification} from 'antd';
import {parseQuery} from '@/utils';
import router from 'umi/router';

const {
  goods_list,
  delete_goods
} = api

const _service = registerServer({
  getList: {
    url: goods_list,
    method: 'post'
  },
  delete: {
    url: delete_goods,
    method: 'post'
  },
}, request)

const Model = {
  namespace: 'goodsListModel',
  state: {
    list: [],
    info: {},
    visible: false,
    pagination: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/goods') {
          dispatch({
            type: 'getList',
            payload: {
              page: 1,
              pageSize: 10,
              ...location.query
            }
          })
        }
      })
    }
  },
  effects: {
    *getList({ payload = {} }, { call, put }) {
      const {code, data, errorMessage} = yield call(_service.getList, payload);
      if (code === 0) {
        yield put({
          type: 'updateState',
          payload: {
            list: data.list,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.count
            }
          }
        })
      } else {
        throw {
          errorMessage
        }
      }
    },
    *delete({ payload = {} }, { call, put }) {
      const {code, data, errorMessage} = yield call(_service.delete, payload);
      if (code === 0) {
        if (code === 0) {
          router.replace('/goods')
          notification.success({
            message: "删除成功！",
            duration: 1,
          })
        } else {
          throw {
            errorMessage
          }
        }
      } else {
        throw {
          errorMessage
        }
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
