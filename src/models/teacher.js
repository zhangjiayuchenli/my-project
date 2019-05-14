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
    // 明天改
    getStuIdAndYearss(state, { payload }) {
      return { ...state, ...{ StuIdAndYearList2: payload } };
    },
    getPasswordCaptcha(state, { payload }) {
      return {
        ...state,
        ...{ passwordCode: payload },
      };
    },



  },
  effects: {
    // 管理员获取到所有教师的信息
    *getTeacher(_, { call, put }) {
      const url = '/teacher/selectAll';
      const { res } = yield call(teacherService.get, url);
      yield put({ type: 'getTeachers', payload: res });
    },



    // 教师发布消息到本班班级
    *sendMessage({ payload }, { call }) {
      const url = '/teacher/sendMessage';
      yield call(teacherService.insert, url, payload);
    },
    // 管理员删除教师
    *deleteTeacher({ payload }, { call, put }) {
      const url = '/teacher/deleteByPrimaryKey';
      const { res } = yield call(teacherService.delete, url, payload);
      yield put({ type: 'getTeachers', payload: res });
    },
    // 管理员通过多选删除教师
    *deleteTeacherByCheck({ payload }, { call, put }) {
      const url = '/teacher/deleteByPrimaryKeyAndCheck';
      const { res } = yield call(teacherService.deleteByCheck, url, payload);
      yield put({ type: 'getTeachers', payload: res });
    },
    // 教师通过多选删除本班学生的成绩
    *deleteStuAndCourseByCheck({ payload }, { call, put }) {
      console.log("执行多选删除")
      console.log(payload)
      const url = '/teacher/deleteStuAndCourseByCheck';
      const { res } = yield call(teacherService.deleteStuAndCourseByCheckByCheck, url, payload);
      yield put({ type: 'getStuAndCourses', payload: res });
    },



    // 教师删除学生成绩
    *deleteStuAndCourses({ payload }, { call, put }) {
      const url = '/teacher/deleteStuAndCourse';
      const { res } = yield call(teacherService.deleteStuAndCourse, url, payload);
      yield put({ type: 'getStuAndCourses', payload: res });
    },


    // 获取本班学生ID及各科成绩对应学年
    *selectStuIdAndYearByTeacherId(_, { call, put }) {
      const url = '/teacher/selectStuIdAndYearByTeacherId';
      const { res } = yield call(teacherService.get, url);
      yield put({ type: 'getStuIdAndYear', payload: res });
    },
    // 获取本班学生及各科成绩
    *getStuAndCourse({ payload }, { call, put }) {
      console.log("*************")
      const url = `/teacher/selectCourseByYears?year=${  payload.year  }`;
      const { res } = yield call(teacherService.get, url);
      yield put({ type: 'getStuAndCourses', payload: res });
    },
    // 得到统计及格人数数据
    *getStatistic({ payload }, { call, put }) {
      const url = `/teacher/Statistics?year=${  payload.year  }&id=${  payload.id}`;
      const { res } = yield call(teacherService.get, url);
      yield put({ type: 'getStatistics', payload: res });
    },
    // 统计得到每个学生每年总分
    /** 根据学生id或姓名，和教师id，查询该学生每学年度的总分 text为学号或者学生姓名 */
    *getTotalScoreByYear({ payload }, { call, put }) {
      const url = `/teacher/selectSumCourseByYear?text=${payload.text}`;
      const { res } = yield call(teacherService.get, url);
      yield put({ type: 'getTotalScores', payload: res });
    },
    // 管理员修改教师基本信息
    *adminUpdateTeacher({ payload }, { call, put }) {
      const url = '/teacher/adminUpdateTeacher';
      const { res } = yield call(teacherService.update, url, payload);
      yield put({ type: 'teacher/getTeachers', payload: res });
    },
    // 教师修改本人的密码(传入旧密码和新密码，先在后台对旧密码进行验证)
    *updateTeacherPassword({ payload }, { call,put }) {
      const url = '/teacher/updateTeacherPassword';
      const  {code}  = yield call(teacherService.update, url, payload);
      yield put({
        type:'getPasswordCaptcha',
        payload:code
      })
    },
    // 教师修改本人的基本个人信息
    *updateTeacher({ payload }, { call }) {
      const url = '/teacher/updateTeacher';
      yield call(teacherService.update, url, payload);
    },
    // 管理员新增教师
    *insertTeacher({ payload }, { call, put }) {
      const url = '/teacher/insertTeacher';
      const { res } = yield call(teacherService.insert, url, payload);
      yield put({ type: 'teacher/getTeachers', payload: res });
    },
    // 教师修改学生成绩
    *updateStuCourse({ payload }, { call, put }) {
      const url = '/teacher/updateStuCourse';
      const { res } = yield call(teacherService.updateStuCourse, url, payload);
      yield put({ type: 'getStuAndCourses', payload: res });
    },
    // 教师新增学生成绩
    *insertStuCourse({ payload }, { call, put }) {
      const url = '/teacher/insertCourse';
      const { res } = yield call(teacherService.insertStuCourses, url, payload);
      yield put({ type: 'getStuAndCourses', payload: res });
    },
    // 教师通过学生id获得学年
    *getStuOfYear({ payload }, { call, put }) {
      const url = `/teacher/getStuOfYear?studentId=${  payload.studentId}`;
      const { res } = yield call(teacherService.get, url);
      yield put({ type: 'getStuIdAndYearss', payload: res });
    },
  },
};
