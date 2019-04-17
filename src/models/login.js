import loginService from '../service/loginService';

export default {
  namespace: 'login',
  state: {
    id: '',
    password: '',
    types: 'a',
    error: 'a',
  },
  reducers: {
    save(state, { payload }) {
      localStorage.setItem('id', payload.id);
      localStorage.setItem('types', payload.types);
      return { ...state, ...payload };
    },
    getEmailCaptcha(state, { payload }) {
      return {
        ...state,
        ...{ emailCode: payload },
      };
    },
    getCaptchaCode(state, { payload }) {
      return {
        ...state,
        captchaCode: payload,
      };
    },
    getCode(state, { payload }) {
      if (payload.code === 0) {
        localStorage.setItem('user', JSON.stringify({ isLogin: true }));
        sessionStorage.setItem('user', JSON.stringify(payload.res));
      } else {
        localStorage.setItem('user', JSON.stringify({ isLogin: false }));
      }
      return { ...state, user: payload };
    },
    changeCode(state, { payload }) {
      console.log(payload);
      return { ...state, user: payload };
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const url = 'dev/login';
      const data = yield call(loginService.post, url, payload);
      console.log(data);
      yield put({ type: 'getCode', payload: data });
    },
    *logout(action, { call }) {
      const url = 'dev/logout';
      yield call(loginService.get, url);
    },
    *sendCaptcha({ payload }, { call, put }) {
      const url = `dev/sendCaptcha?email=${  payload.email}`;
      const { code } = yield call(loginService.get, url);
      yield put({ type: 'getEmailCaptcha', payload: code });
    },

    *updatePassword({ payload }, { call, put }) {
      const url = 'dev/updatePassword';
      const { code } = yield call(loginService.update, url, payload);
      yield put({ type: 'getCaptchaCode', payload: code });
    },
  },
};
