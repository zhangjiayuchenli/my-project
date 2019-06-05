import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { connect } from 'dva';
import Logo from '../components/Logo';
import Header from './Header';
import styles from './index.less';
import Footer from './Footer';

const { Sider, Content } = Layout;
// 引入子菜单组件
const {SubMenu} = Menu;

@connect(({global})=>({
  global,
  currentUser:global.currentUser
}))
class BasicLayout extends Component {
  componentDidMount() {
    const {dispatch}=this.props;
    console.log('1111')
    dispatch({
          type:'global/fetchCurrent'
    })
  }

  render() {
    const { children } = this.props;
    /** 管理员模块 */
    const adminSub = (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          <span><FormattedMessage id="app.settings.menuMap.adminSystem" /></span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="table" />
              <span><FormattedMessage id="app.settings.menuMap.userList" /></span>
            </span>
          }
        >
          <Menu.Item key="2">
            <Link to="/dashboard/admin/teacher"><FormattedMessage id="app.settings.menuMap.teacherList" /></Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/dashboard/admin/student"><FormattedMessage id="app.settings.menuMap.stuList" /></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="message" />
              <span><FormattedMessage id="app.settings.menuMap.sendMessage" /></span>
            </span>
          }
        >
          <Menu.Item key="2">
            <Link to="/comment/admin/all"><FormattedMessage id="app.settings.menuMap.toAll" /></Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/comment/admin/toStu"><FormattedMessage id="app.settings.menuMap.toStu" /></Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/comment/admin/toTea"><FormattedMessage id="app.settings.menuMap.toTeacher" /></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="user" />
              <span><FormattedMessage id="menu.account" /></span>
            </span>
          }
        >
          <Menu.Item key="2">
            <Link to="/account/center/admin"><FormattedMessage id="menu.account.center" /></Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/account/adminSettings"><FormattedMessage id="menu.account.settings" /></Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
    const teacherSub = (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          <span><FormattedMessage id="app.settings.menuMap.teacherSystem" /></span>
        </Menu.Item>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="dashboard" />
              <span><FormattedMessage id="app.settings.menuMap.classCheck" /></span>
            </span>
          }
        >
          <Menu.Item key="2">
            <Link to="/check/teacher/classroomCheck"><FormattedMessage id="app.settings.menuMap.classCheck" /></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="dashboard" />
              <span><FormattedMessage id="app.settings.menuMap.breakExerciseCheck" /></span>
            </span>
          }
        >
          <Menu.Item key="3">
            <Link to="/check/teacher/breakExerciseCheck"><FormattedMessage id="app.settings.menuMap.breakExerciseCheck" /></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="dashboard" />
              <span><FormattedMessage id="app.settings.menuMap.etiquetteCheck" /></span>
            </span>
          }
        >
          <Menu.Item key="4">
            <Link to="/check/teacher/etiquetteCheck"><FormattedMessage id="app.settings.menuMap.etiquetteCheck" /></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="dashboard" />
              <span><FormattedMessage id="app.settings.menuMap.gradeList" /></span>
            </span>
          }
        >
          <Menu.Item key="2">
            <Link to="/dashboard/teacher/student"><FormattedMessage id="app.settings.menuMap.stuGradeList" /></Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/dashboard/teacher/classEcharts"><FormattedMessage id="app.settings.menuMap.classEcharts" /></Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/dashboard/teacher/studentEcharts"><FormattedMessage id="app.settings.menuMap.studentEcharts" /></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="message" />
              <span><FormattedMessage id="app.settings.menuMap.sendMessage" /></span>
            </span>
          }
        >
          <Menu.Item key="3">
            <Link to="/comment/admin/toStu"><FormattedMessage id="app.settings.menuMap.teaToStu" /></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="user" />
              <span><FormattedMessage id="menu.account" /></span>
            </span>
          }
        >
          <Menu.Item key="2">
            <Link to="/account/center/teacher"><FormattedMessage id="menu.account.center" /></Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/account/setting"><FormattedMessage id="menu.account.settings" /></Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
    const stuSub = (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          <span>学生系统</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="dashboard" />
              <span>考试规则查询</span>
            </span>
          }
        >
          <Menu.Item key="3">
            <Link to="/dashboard/student/query">考试规则查询</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="dashboard" />
              <span>日常评分查询</span>
            </span>
          }
        >
          <Menu.Item key="1">
            <Link to="/check/stu/classroomCheck">个人课堂表现</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/check/stu/breakExerciseCheck">个人课间操表现</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/check/stu/etiquetteCheck">个人礼仪规范</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="dashboard" />
              <span>个人成绩查询</span>
            </span>
          }
        >
          <Menu.Item key="4">
            <Link to="/dashboard/student/studentInfo">个人成绩详情分析</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="user" />
              <span>个人中心</span>
            </span>
          }
        >
          <Menu.Item key="2">
            <Link to="/account/center/student">个人信息</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/account/settings">修改信息</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
    const types=localStorage.getItem('types');
    return (
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh' }}>
          <div style={{ height: '40px', background: 'rgba(255,255,255,.2)', margin: '16px' }}>
            <Logo />
          </div>

          {types === 'admin' ? adminSub : null}
          {types === 'teacher' ? teacherSub : null}
          {types === 'stu' ? stuSub : null}
        </Sider>
        <Layout>
          <Header style={{ padding: 0, width: '90%' }} />
          <Content style={{ margin: '24px 16px 0' }} className={styles.content}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}
export default BasicLayout;
