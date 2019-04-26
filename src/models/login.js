import { routerRedux } from 'dva/router';
import loginService from '../service/loginService';

export default {
  namespace: 'login',
  state: {
  },
  reducers: {
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
      return { ...state, ...{currentUser: payload.res} };
    },
    changeCode(state, { payload }) {
      console.log(payload);
      return { ...state, user: payload };
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const url = '/login';
      const response = yield call(loginService.post, url, payload);
      yield put({ type: 'getCode', payload: response });
      if(response.code===0)
      {
          localStorage.setItem('token',response.token);
          const types=localStorage.getItem('types');
          sessionStorage.setItem('currentUser','true')
          if(types==='admin')
          {
            yield put(routerRedux.replace('/dashboard/admin/student'))
          }
        else if(types==='teacher')
        {
          yield put(routerRedux.replace('/dashboard/teacher/student'))
        }
        else if(types==='stu')
        {
          yield put(routerRedux.replace('/dashboard/student/studentInfo'))
        }

      }
    },
    *logout(action, { call }) {
      const url = '/logout';
      yield call(loginService.get, url);
    },
    *sendCaptcha({ payload }, { call, put }) {
      const url = `/sendCaptcha?email=${  payload.email}`;
      const { code } = yield call(loginService.get, url);
      yield put({ type: 'getEmailCaptcha', payload: code });
    },

    *updatePassword({ payload }, { call, put }) {
      const url = '/updatePassword';
      const { code } = yield call(loginService.update, url, payload);
      yield put({ type: 'getCaptchaCode', payload: code });
    },
  },
};
