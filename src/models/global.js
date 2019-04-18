import teacherService from '../service/teacherService';

export default {
  namespace: 'global',
  state: {},
  reducers: {
    getMessage(state, { payload }) {
      localStorage.setItem('message', JSON.stringify(payload));

      return { ...state, noticesList: payload.notices ,messageList:payload.message };
    },
    getCount(state, { payload }) {
      localStorage.setItem('count', payload.count);
      return { ...state, count: payload.count };
    },
  },
  effects: {
    *clearNotices(action, { call }) {
      const url = 'dev/socket/clearNotices';
      yield call();
    },
    // 得到消息
    *getMessages(action, { call, put }) {
      const url = '/dev/socket/notices';
      const { res } = yield call(teacherService.get, url);
      yield put({ type: 'getMessage', payload: res });
    },
    // 得到未读消息数量
    *getUnReadCount(action, { call, put }) {
      const url = '/dev/socket/getUnReadCount';
      const { res } = yield call(teacherService.get, url);
      yield put({ type: 'getCount', payload: res });
    },
  },
};
