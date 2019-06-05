import teacherService from '../service/teacherService';

export default {
  namespace:'check',
  state:{},
  reducers:{
    getClassroomList(state,{payload})
    {
      console.log(payload)
      return{
        ...state, ...{ classroomList: payload }
      }
    },
    getBreakExerciseList(state,{payload})
    {
      console.log(payload)
      return{
        ...state, ...{ BreakExerciseList: payload }
      }
    },
    getEtiquetteList(state,{payload})
    {
      console.log(payload)
      return{
        ...state, ...{ EtiquetteList: payload }
      }
    },
    getStuId(state, { payload }) {
      return { ...state, ...{ StuIdList: payload } };
    },
    getClassroomCreatetime(state, { payload }) {
      return { ...state, ...{ ClassroomCreatetimeList: payload } };
    },
  },
  effects:{
    // 教师得到本班课堂考核情况
    *getClassroomCheck({payload},{call,put})
    {
      console.log(payload)
      console.log(payload.week)
      const url=`/check/getClassroomCheck?year=${  payload.year  }&week=${  payload.week}`;
      const {res}=yield call(teacherService.get,url);
      console.log(res)
      yield put({type:'getClassroomList',payload:res})
    },
    // 教师通过多选删除本班学生课堂表现成绩
    *deleteClassroomByCheck({ payload }, { call, put }) {
      const url = '/check/deleteClassroomByCheck';
      const { res } = yield call(teacherService.delete, url, payload);
      yield put({ type: 'getClassroomList', payload: res });
    },
    *deleteClassroom({ payload }, { call, put }) {
      const url = '/check/deleteClassroom';
      const { res } = yield call(teacherService.delete, url, payload);
      yield put({ type: 'getClassroomList', payload: res });
    },
    *updateClassroom({ payload }, { call, put }) {
      const url = '/check/updateClassroom';
      console.log(payload)
      const { res } = yield call(teacherService.update, url, payload);
      yield put({ type: 'getClassroomList', payload: res });
    },
    // 教师得到本班课间操考核情况
    *getBreakExerciseCheck({payload},{call,put})
    {
      console.log(payload)
      console.log(payload.week)
      console.log(payload.year)
      const url=`/check/getBreakExerciseCheck?year=${  payload.year  }&week=${  payload.week}`;
      const {res}=yield call(teacherService.get,url);
      console.log(res)
      yield put({type:'getBreakExerciseList',payload:res})
    },
    // 学生得到课间操考核情况
    *getStuBreak({payload},{call,put})
    {
      const url=`/check/getStuBreak?year=${  payload.year  }&week=${  payload.week}`;
      const {res}=yield call(teacherService.get,url);
      console.log(res)
      yield put({type:'getBreakExerciseList',payload:res})
    },
    *getStuEtiquette({payload},{call,put})
    {
      const url=`/check/getStuEtiquette?year=${  payload.year  }&week=${  payload.week}`;
      const {res}=yield call(teacherService.get,url);
      console.log(res)
      yield put({type:'getEtiquetteList',payload:res})
    },
    *getStuClass({payload},{call,put})
    {
      const url=`/check/getStuClass?year=${  payload.year  }&week=${  payload.week}`;
      const {res}=yield call(teacherService.get,url);
      console.log(res)
      yield put({type:'getClassroomList',payload:res})
    },
    // 教师得到本班礼仪行为规范考核情况
    *getEtiquetteCheck({payload},{call,put})
    {
      console.log(payload)
      console.log(payload.week)
      console.log(payload.year)
      const url=`/check/getEtiquetteCheck?year=${  payload.year  }&week=${  payload.week}`;
      const {res}=yield call(teacherService.get,url);
      console.log(res)
      yield put({type:'getEtiquetteList',payload:res})
    },
    *deleteEtiquetteByCheck({ payload }, { call, put }) {
      const url = '/check/deleteEtiquetteByCheck';
      const { res } = yield call(teacherService.delete, url, payload);
      yield put({ type: 'getEtiquetteList', payload: res });
    },

    *deleteBreakExerciseByCheck({ payload }, { call, put }) {
      const url = '/check/deleteBreakExerciseByCheck';
      const { res } = yield call(teacherService.delete, url, payload);
      yield put({ type: 'getBreakExerciseList', payload: res });
    },
    // 教师删除礼仪评分
    *deleteEtiquette({ payload }, { call, put }) {
      const url = '/check/deleteEtiquette';
      const { res } = yield call(teacherService.delete, url, payload);
      yield put({ type: 'getEtiquetteList', payload: res });
    },
    // 教师删除课间操评分
    *deleteBreakExercise({ payload }, { call, put }) {
      const url = '/check/deleteBreakExercise';
      console.log("删除执行")
      const { res } = yield call(teacherService.delete, url, payload);
      yield put({ type: 'getBreakExerciseList', payload: res });
    },
    // 教师通过学生id获得学年(添加时根据学号判断该条记录是否存在，createtime作为判断依据)
    *getClassroomStuOfCreatetime({ payload }, { call, put }) {
      console.log(payload)
      const url = `/check/getClassroomStuOfCreatetime?studentId=${  payload.studentId}`;
      const { res } = yield call(teacherService.get, url);
      console.log(res)
      yield put({ type: 'getClassroomCreatetime', payload: res });
    },
    // 获取本班学生ID
    *selectStuIdByTeacherId(_, { call, put }) {
      const url = '/check/selectStuIdByTeacherId';
      const { res } = yield call(teacherService.get, url);
      yield put({ type: 'getStuId', payload: res });
    },
    *insertClassroom({ payload }, { call }) {
      const url = '/check/insertClassroom';
      yield call(teacherService.insert, url,payload);

    },
    *insertBreakExercise({ payload }, { call }) {
      const url = '/check/insertBreakExercise';
      const { res } = yield call(teacherService.insert, url,payload);

    },
    *updateBreakExercise({ payload }, { call,put }) {
      const url = '/check/updateBreakExercise';
      console.log(payload)
      const { res } = yield call(teacherService.update, url, payload);
      yield put({ type: 'getBreakExerciseList', payload: res });

    },
    *insertEtiquette({ payload }, { call }) {
      const url = '/check/insertEtiquette';
      const { res } = yield call(teacherService.insert, url,payload);

    },
    *updateEtiquette({ payload }, { call,put }) {
      const url = '/check/updateEtiquette';
      console.log(payload)
      const { res } = yield call(teacherService.update, url, payload);
      yield put({ type: 'getBreakExerciseList', payload: res });

    },
  }
}
