import React, { Component } from 'react';
import { Menu, Dropdown, Icon, message, Layout, Avatar } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './index.less';
import HeaderDropdown from '../HeaderDropdown';
import NoticeIcon from '../NoticeIcon';
import SelectLang from '../SelectLang';

const { Header } = Layout;

@connect(({global,loading})=>({
  global,
  getMessages:loading.effects['global/getMessages'],
  currentUser:global.currentUser
  })
)
class GlobalHeader extends Component {

  componentDidMount() {
    const {dispatch}=this.props;
    if(localStorage.getItem("types")!=='admin')
    {
      dispatch({
        type: 'global/getUnReadCount',
      })
    }

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
    const  types = localStorage.getItem('types')
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

  render() {
    const { global:{noticesList,messageList,count}, onNoticeClear,getMessages,currentUser}  = this.props;
    const menu= (
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
    const teaNotice = (
      <NoticeIcon
        className={styles.action}
        count={count}
        onClear={onNoticeClear}
        loading={getMessages}
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
      </NoticeIcon>
    );
    const stuNotice = (
      <NoticeIcon
        className={styles.action}
        count={count}
        loading={getMessages}
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
    const adminava = (
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
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              {localStorage.getItem('types') === 'teacher'&&currentUser!==null ? (
                <Avatar
                  src={currentUser.teacherAvatar}
                  size="small"
                  icon="user"
                />
              ) : null}
              {localStorage.getItem('types') === 'admin' ? (
                adminava
              ) : null}
              {localStorage.getItem('types') === 'stu' ? (
                <Avatar
                  src={currentUser.studentAvatar}
                  size="small"
                  icon="user"
                />
              ) : null}
              {localStorage.getItem('types') === 'teacher' &&currentUser!==null? (
                <span>{currentUser.teacherName}</span>
              ) : null}
              {localStorage.getItem('types') === 'admin' ? (
                <span>{currentUser.username}</span>
              ) : null}
              {localStorage.getItem('types') === 'stu' ? (
                <span>{currentUser.studentName}</span>
              ) : null}

            </span>
          </HeaderDropdown>
          <SelectLang className={styles.action} />
        </div>
      </Header>
    );
  }
}
export default GlobalHeader;
