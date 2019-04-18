import React, { Component } from 'react';
import { Menu, Dropdown, Icon, message, Layout, Avatar } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './index.less';
import NoticeIcon from '../NoticeIcon';

const { Header } = Layout;

@connect(({global,login})=>({
  global,login
  })
)
class GlobalHeader extends Component {



  componentDidMount() {
    const {dispatch}=this.props;
    dispatch({
      type: 'global/getUnReadCount',
    })
  }

  handleChange = e => {
    if (e === true) {
      const {dispatch}=this.props;
      dispatch({
        type: 'global/getMessages',
      })
      dispatch({
        type: 'global/getUnReadCount',
      })
    }
  };

  handleClear=()=>{
    const {dispatch}=this.props;
    // 清理后台session
    dispatch({
      type: 'login/logout',
    })
    sessionStorage.clear();
    localStorage.clear();
  }

  onClick = ({ key }) => {
    /**
     *
     */

    console.log(localStorage.getItem('types'))
    const  types = localStorage.getItem('types')
    console.log(types)
    if (types === 'admin') {
      if (key === 'logout') {
        this.handleClear();
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
        this.handleClear();
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
        this.handleClear();
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

  menu= (
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
    </Menu>)
  ;

  render() {
    console.log(localStorage.getItem('types'))
    const { global:{noticesList,messageList,count}, onNoticeClear,}  = this.props;
    const teaNotice = (
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
          list={noticesList}
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
          list={noticesList}
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
          showViewMore
        />
        <NoticeIcon.Tab
          title="班级通知"
          list={messageList}
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
          {localStorage.getItem('types') === 'teacher' ? teaNotice : null}
          {localStorage.getItem('types') === 'stu' ? stuNotice : null}
          <Dropdown overlay={this.menu}>
            <a className="ant-dropdown-link" href="#">
              {localStorage.getItem('types') === 'teacher' ? (
                <Avatar
                  src={JSON.parse(sessionStorage.getItem('user')).teacherAvatar}
                  size="small"
                  icon="user"
                />
              ) : null}
              {localStorage.getItem('types') === 'admin' ? (
                ava
              ) : null}
              {localStorage.getItem('types') === 'stu' ? (
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
