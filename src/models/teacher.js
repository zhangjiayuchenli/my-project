import teacherService from '../service/teacherService';

export default {
  namespace: 'teacher',
  state: {},
  reducers: {
    getTeachers(state, { payload }) {
      return { ...state, ...{ userList: payload } };
    },
    getStuAndCourses(state, { payload }) {
      return { ...state, ...{ stuList: payload } };
    },
    getStatistics(state, { payload }) {
      return { ...state, ...{ statisticsList: payload } };
    },
    getTotalScores(state, { payload }) {
      return { ...state, ...{ scoresList: payload } };
    },
    getStuIdAndYear(state, { payload }) {
      return { ...state, ...{ StuIdAndYearList: payload } };
    },
    //明天改
    getStuIdAndYearss(state, { payload }) {
      return { ...state, ...{ StuIdAndYearList2: payload } };
    },

  },
  effects: {
    *getTeacher(action, { call, put }) {
      const url = '/teacher/selectAll';
      const { res } = yield call(teacherService.get, url);

      yield put({ type: 'getTeachers', payload: res });
    },
    *sendMessage({ payload }, { call }) {
      console.log(payload)
      const url = '/teacher/sendMessage';
      yield call(teacherService.insert, url, payload);
    },
    *deleteTeacher({ payload }, { call, put }) {
      const url = '/teacher/deleteByPrimaryKey';
      const { res } = yield call(teacherService.delete, url, payload);
      yield put({ type: 'getTeachers', payload: res });
    },
    *deleteTeacherByCheck(action, { call, put }) {
      const { payload } = action;

      const url = '/teacher/deleteByPrimaryKeyAndCheck';
      const { res } = yield call(teacherService.deleteByCheck, url, payload);

      yield put({ type: 'getTeachers', payload: res });
    },
    //删除学生成绩ByCheck
    *deleteStuAndCourseByCheck({ payload }, { call, put }) {
      const url = '/teacher/deleteStuAndCourseByCheck';
      const { res } = yield call(teacherService.deleteStuAndCourseByCheckByCheck, url, payload);
      yield put({ type: 'getStuAndCourses', payload: res });
    },
    //删除学生成绩
    *deleteStuAndCourses(action, { call, put }) {
      const { payload } = action;
      const url = '/teacher/deleteStuAndCourse';
      const { res } = yield call(teacherService.deleteStuAndCourse, url, payload);
      yield put({ type: 'getStuAndCourses', payload: res });
    },
    //获取本班学生ID及各科成绩对应学年
    *selectStuIdAndYearByTeacherId(action, { call, put }) {
      const { payload } = action;
      const url = '/teacher/selectStuIdAndYearByTeacherId';
      const { res } = yield call(teacherService.get, url);
      console.log(res);
      yield put({ type: 'getStuIdAndYear', payload: res });
    },
    //获取本班学生及各科成绩
    *getStuAndCourse(action, { call, put }) {
      const { payload } = action;
      const url = `/teacher/selectCourseByYears?year=${  payload.year  }`;
      const { res } = yield call(teacherService.get, url);
      yield put({ type: 'getStuAndCourses', payload: res });
    },
    //得到统计及格人数数据
    *getStatistic(action, { call, put }) {
      const { payload } = action;
      const url = `/teacher/Statistics?year=${  payload.year  }&id=${  payload.id}`;
      const { res } = yield call(teacherService.get, url);
      console.log(res);
      yield put({ type: 'getStatistics', payload: res });
    },
    //统计得到每个学生每年总分
    /*根据学生id或姓名，和教师id，查询该学生每学年度的总分 text为学号或者学生姓名*/
    *getTotalScoreByYear(action, { call, put }) {
      const { payload } = action;
      const url = `/teacher/selectSumCourseByYear?text=${payload.text}`;
      const { res } = yield call(teacherService.get, url);
      console.log(res);
      yield put({ type: 'getTotalScores', payload: res });
    },
    *adminUpdateTeacher({ payload }, { call, put }) {
      const url = '/teacher/adminUpdateTeacher';
      const { res } = yield call(teacherService.update, url, payload);
      yield put({ type: 'teacher/getTeachers', payload: res });
    },
    *updateTeacher({ payload }, { call, put }) {
      const url = '/teacher/updateTeacher';
      const { res } = yield call(teacherService.update, url, payload);
      yield put({ type: 'teacher/getTeachers', payload: res });
    },
    *insertTeacher({ payload }, { call, put }) {
      const url = '/teacher/insertTeacher';
      const { res } = yield call(teacherService.insert, url, payload);
      yield put({ type: 'teacher/getTeachers', payload: res });
    },
    //修改学生成绩
    *updateStuCourse(action, { call, put }) {
      const { payload } = action;
      const url = '/teacher/updateStuCourse';
      const { res } = yield call(teacherService.updateStuCourse, url, payload);
      yield put({ type: 'getStuAndCourses', payload: res });
    },
    //新增学生成绩
    *insertStuCourse({ payload }, { call, put }) {
      const url = '/teacher/insertCourse';
      const { res } = yield call(teacherService.insertStuCourses, url, payload);
      yield put({ type: 'getStuAndCourses', payload: res });
    },
    *getStuOfYear(action, { call, put }) {
      const { payload } = action;
      console.log('qqqqqqaq');
      console.log(payload.studentId);
      console.log('qqqqqqaq');
      const url = `/teacher/getStuOfYear?studentId=${  payload.studentId}`;
      const { res } = yield call(teacherService.get, url);
      console.log(res);
      yield put({ type: 'getStuIdAndYearss', payload: res });
    },
  },
};
