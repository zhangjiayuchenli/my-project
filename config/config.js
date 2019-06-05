export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        // 这里暂时还没有添加配置，该插件还不会有作用，我们会在后面的课程按照需求打开相应的配置
        antd: true,
        dva: true,
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
      },

    ],
  ],
  routes: [
    /*login*/
    {
      path: '/login',
      component: './Login/Login',
    },
    //forget
    {
      path: '/forget',
      component: '../components/ForgetPassword/index',
    },
    //exception
    {
      path: '/404',
      component: '404',
    },
    {
      path: '/',
      component: '../layout/index',
      routes: [
        { path: '/', redirect: '/login' },

        {
          path: '/helloworld',
          component: 'HelloWorld',
        },
        //comment
        {
          path: '/comment',
          routes: [
            { path: '/comment/admin/all', component: 'Comment/index' },
            { path: '/comment/admin/toStu', component: 'Comment/ToStudent' },
            { path: '/comment/admin/toTea', component: 'Comment/ToTeacher' },
          ],
        },
        //dashboard
        {
          path: '/dashboard',
          routes: [
            { path: '/dashboard/admin/student', component: 'Drawer/StudentDrawer' },
            { path: '/dashboard/admin/teacher', component: 'Drawer/TeacherDrawer' },
            { path: '/dashboard/teacher/student', component: 'Modal/StuCourseModal' },
            {
              path: '/dashboard/teacher/studentEcharts',
              component: 'Dashboard/TeacherDashboard/StudentEcharts',
            },
            {
              path: '/dashboard/teacher/classEcharts',
              component: 'Dashboard/TeacherDashboard/ClassEcharts',
            },
            {
              path: '/dashboard/student/query',
              component: 'Dashboard/StudentDashboard/QueryRules',
            },
            {
              path: '/dashboard/student/studentInfo',
              component: 'Dashboard/StudentDashboard/StudentInfo',
            },
            { component: '404' },
          ],
        },
        //check
        {
          path: '/check',
          routes: [
            { path: '/check/teacher/classroomCheck', component: 'Modal/ClassroomCheckModal' },
            { path: '/check/teacher/breakExerciseCheck', component: 'Modal/BreakExerciseCheckModal' },
            { path: '/check/teacher/etiquetteCheck', component: 'Modal/EtiquetteCheckModal' },
            { path: '/check/stu/classroomCheck', component: 'Check/StuClass' },
            { path: '/check/stu/breakExerciseCheck', component: 'Check/StuBreak' },
            { path: '/check/stu/etiquetteCheck', component: 'Check/StuEtiquette' },
            { component: '404' },
          ],
        },
        //account
        {
          name: 'account',
          path: '/account',
          routes: [
            //center
            {
              name: 'account/center',
              path: '/account/center',
              //component: './Account/Center/AdminCenter',
              routes: [
                { path: '/account/center/admin', component: 'Account/Center/AdminCenter' },
                { path: '/account/center/teacher', component: 'Account/Center/TeacherCenter' },
                { path: '/account/center/student', component: 'Account/Center/StudentCenter' },
              ],
            },
            // teacher
            {

              path: '/account/setting',
              name: 'setting',
              component: './Account/Setting/TeaSetting/Info',
              routes: [
                {
                  path: '/account/setting',
                  redirect: '/account/setting/base',
                },
                {
                  path: '/account/setting/base',
                  component: './Account/Setting/TeaSetting/BaseView',
                },
                {
                  path: '/account/setting/security',
                  component: './Account/Setting/TeaSetting/SecurityView',
                },

              ],
            },
            // stu
            {
              path: '/account/settings',
              name: 'settings',
              component: './Account/Setting/StuSetting/Info',
              routes: [
                {
                  path: '/account/settings',
                  redirect: '/account/settings/base',
                },
                {
                  path: '/account/settings/base',
                  component: './Account/Setting/StuSetting/BaseView',
                },
                {
                  path: '/account/settings/security',
                  component: './Account/Setting/StuSetting/SecurityView',
                },

              ],
            },
            // admin
            {
              path: '/account/adminSettings',
              name: 'settings',
              component: './Account/Setting/AdminSetting',

            },
            { component: '404' },
          ],
        },
        {
          component: '404',
        },
      ],
    },
  ],
  proxy: {
     '/api': {
       target: 'http://localhost:8080',
       changeOrigin: true,
       pathRewrite: { '^/api': '' },
     },
   },
};
