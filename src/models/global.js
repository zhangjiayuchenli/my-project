import globalService from '../service/globalService'

export default {
  namespace: 'global',
  state: {
    currentUser: {},
  },
  reducers: {
    getMessage(state, { payload }) {
      localStorage.setItem('message', JSON.stringify(payload));

      return { ...state, noticesList: payload.notices ,messageList:payload.message };
    },
    getCount(state, { payload }) {
      localStorage.setItem('count', payload.count);
      return { ...state, count: payload.count };
    },
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: payload.res
      };
    },
  },
  effects: {
    *clearNotices({payload}, { call }) {
      const url = '/socket/clearNotices';
      console.log(payload)
      yield call(globalService.delete,url,payload);
    },
    // 得到消息
    *getMessages(action, { call, put }) {
      const url = '/socket/notices';
      const { res } = yield call(globalService.get, url);
      yield put({ type: 'getMessage', payload: res });
    },
    // 得到未读消息数量
    *getUnReadCount(action, { call, put }) {
      const url = '/socket/getUnReadCount';
      const { res } = yield call(globalService.get, url);
      yield put({ type: 'getCount', payload: res });
    },
    *fetchCurrent(_,{call,put}){
      const url='/fetchCurrentUser'
      const response=yield call(globalService.get,url)
      console.log(response)
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    }

  },
};
