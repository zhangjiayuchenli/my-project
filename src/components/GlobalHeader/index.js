import React, { Component } from 'react';
import { Menu, Dropdown, Icon, message, Layout, Avatar } from 'antd';
import styles from './index.less';
import router from 'umi/router';
import NoticeIcon from '../NoticeIcon';
import { connect } from 'dva';
const { Header } = Layout;
const mapStateToProps = state => {
  return {
    noticesList: state.teacher.noticesList,
    messageList: state.teacher.messageList,
    count: state.teacher.count,
    types: state.login.types,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeCodes: payload =>
      dispatch({
        type: 'login/changeCode',
        payload,
      }),
    // 清理后台session
    clearSession: () =>
      dispatch({
        type: 'login/logout',
      }),
    getMessage: () =>
      dispatch({
        type: 'teacher/getMessages',
      }),
    getUnReadCount: () =>
      dispatch({
        type: 'teacher/getUnReadCount',
      }),
  };
};
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class GlobalHeader extends Component {
  onClick = ({ key }) => {
    /**
     *
     */

    const { types } = this.props;

    const { changeCodes, clearSession } = this.props;

    if (types === 'admin') {
      if (key === 'logout') {
        changeCodes({ code: 1 });
        clearSession();
        sessionStorage.clear();
        localStorage.setItem('id', '');
        localStorage.setItem('types', '');
        router.replace('/login');
      }
      if (key === 'userCenter') {
        router.push('/account/center/admin');
      }
      if (key === 'userInfo') {
        router.replace('/account/setting/admin');
      }
    }
    if (types === 'teacher') {
      if (key === 'logout') {
        console.log('退出');
        this.props.changeCodes({ code: 1 });
        clearSession();
        sessionStorage.clear();
        localStorage.removeItem('id');
        localStorage.setItem('types', '');
        router.push('/login');
      }
      if (key === 'userCenter') {
        router.push('/account/center/teacher');
      }
      if (key === 'userInfo') {
        router.replace('/account/setting/teacher');
      }
    }
    if (types === 'stu') {
      if (key === 'logout') {
        this.props.changeCodes({ code: 1 });
        clearSession();
        sessionStorage.clear();
        localStorage.setItem('id', '');
        localStorage.setItem('types', '');
        router.replace('/login');
      }
      if (key === 'userCenter') {
        router.push('/account/center/student');
      }
      if (key === 'userInfo') {
        router.replace('/account/setting/student');
      }
    }
  };

  menu = (
    <Menu onClick={this.onClick}>
      <Menu.Item key="userCenter">
        <Icon type="user" />
        个人中心
      </Menu.Item>
      <Menu.Item key="userInfo">
        <Icon type="setting" />
        修改密码
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />
        退出登陆
      </Menu.Item>
    </Menu>
  );

  componentDidMount() {
    this.props.getUnReadCount();
  }

  componentDidUpdate() {
    this.props.getUnReadCount();
  }

  handleChange = e => {
    if (e === true) {
      this.props.getMessage();
    }
  };

  render() {
    const { count, onNoticeClear,}  = this.props;
    const notice = (
      <NoticeIcon
        className={styles.action}
        count={count}
        onClear={onNoticeClear}
        onPopupVisibleChange={this.handleChange}
        onViewMore={() => message.info('Click on view more')}
        clearClose
      >
        <NoticeIcon.Tab
          title="通知"
          list={this.props.message}
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
          showViewMore
        />
      </NoticeIcon>
    );
    const stuNotice = (
      <NoticeIcon
        className={styles.action}
        count={count}
        onClear={onNoticeClear}
        onPopupVisibleChange={this.handleChange}
        onViewMore={() => message.info('Click on view more')}
        clearClose
      >
        <NoticeIcon.Tab
          title="教务通知"
          list={this.props.noticesList}
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
          showViewMore
        />
        <NoticeIcon.Tab
          title="班级通知"
          list={this.props.messageList}
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          showViewMore
        />
      </NoticeIcon>
    );
    const ava = (
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        size="small"
        icon="user"
      />
    );
    return (
      <Header className={styles.fixedHeader}>
        <div className={styles.drop}>
          {localStorage.getItem('types') === 'teacher' ? notice : null}
          {localStorage.getItem('types') === 'stu' ? stuNotice : null}
          <Dropdown overlay={this.menu}>
            <a className="ant-dropdown-link" href="#">
              {localStorage.getItem('types') === 'teacher' ? (
                <Avatar
                  src={JSON.parse(sessionStorage.getItem('user')).teacherAvatar}
                  size="small"
                  icon="user"
                />
              ) : localStorage.getItem('types') === 'admin' ? (
                ava
              ) : localStorage.getItem('types') === 'stu' ? (
                <Avatar
                  src={JSON.parse(sessionStorage.getItem('user')).studentAvatar}
                  size="small"
                  icon="user"
                />
              ) : null}
              <span>here</span>
            </a>
          </Dropdown>
        </div>
      </Header>
    );
  }
}
export default GlobalHeader;
