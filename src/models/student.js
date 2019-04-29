import studentService from '../service/studentService';

export default {
  namespace: 'student',
  state: {},

  reducers: {
    getStus(state, { payload }) {
      // sessionStorage.setItem()
      return { ...state, ...{ userList: payload } };
    },
    getTotalScores(state, { payload }) {
      return { ...state, ...{ scoresList: payload } };
    },
    getStuAndCourses(state, { payload }) {
      return { ...state, ...{ stuList: payload } };
    },
    getPasswordCaptcha(state, { payload }) {
      return {
        ...state,
        ...{ passwordCode: payload },
      };
    },
  },
  effects: {
    *getStu(action, { call, put }) {
      const { res } = yield call(studentService.get, '/student/selectAll');
      yield put({ type: 'getStus', payload: res });
    },
    *updateStu({ payload }, { call, put }) {
      const { res } = yield call(studentService.update, '/student/updateStu', payload);
      yield put({ type: 'getStus', payload: res });
    },
    *updateStuPassword({ payload }, { call,put }) {
      const  {code}  =  yield call(studentService.update, '/student/updateStuPassword', payload);
      yield put({
        type:'getPasswordCaptcha',
        payload:code
      })
    },
    *adminUpdateStu({ payload }, { call, put }) {
      const url = '/student/adminUpdateStu';
      const { res } = yield call(studentService.update, url, payload);
      yield put({ type: 'getStus', payload: res });
    },
    *deleteStu({ payload } , { call, put }) {
      const url = '/student/deleteStu';
      const { res } = yield call(studentService.delete, url, payload);
      yield put({ type: 'getStus', payload: res });
    },
    *insertStu({ payload }, { call, put }) {
      const url = '/student/insertStu';
      const { res } = yield call(studentService.insert, url, payload);
      yield put({ type: 'getStus', payload: res });
    },
    *deleteStuByCheck(action, { call, put }) {
      const { payload } = action;
      const url = '/student/deleteStuByCheck';
      const { res } = yield call(studentService.deleteByCheck, url, payload);
      yield put({ type: 'getStus', payload: res });
    },
    /** 根据学生学号获得学生每学期的成绩总分(用来可视化分析-折线图) */
    *getTotalScoreByYear(action, { call, put }) {
      const url = '/student/selectCourseByStuId';
      const { res } = yield call(studentService.get, url);
      yield put({ type: 'getTotalScores', payload: res });
    },
    // 根据学生id得到学生成绩学生信息
    *getStuAndCourse({ payload }, { call, put }) {
      const url = `/student/selectCourseByYears?year=${  payload.year}`;
      const { res } = yield call(studentService.get, url);
      yield put({ type: 'getStuAndCourses', payload: res });
    },
  },
};
