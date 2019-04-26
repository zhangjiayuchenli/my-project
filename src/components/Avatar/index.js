import React, { Component, Fragment } from 'react';
import {  Upload, message, Button,Avatar  } from 'antd';
import {  FormattedMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import styles from '../../page/Account/Setting/StuSetting/BaseView.less';

@connect(({ global }) => ({
  currentUser: global.currentUser,
}))
class AvatarView extends Component {
  // 头像组件 方便以后独立，增加裁剪之类的功能
  render() {
    const {avatar}=this.props;
    return (
      <Fragment>
        <div className={styles.avatar_title}>
          <FormattedMessage id="app.settings.basic.avatar" defaultMessage="Avatar" />
        </div>
        <div className={styles.avatar}>
          <Avatar src={avatar} size={128} />
        </div>
        <Upload
          name="file"
          action={localStorage.getItem("types")==='teacher'?"/api/teacher/uploadAvatar":"/api/student/uploadAvatar"}
          onChange={info => {
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
              const {dispatch}=this.props;
              dispatch({
                type:'global/fetchCurrent'
              })
            }
            else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
        >
          <div className={styles.button_view}>
            <Button icon="upload">
              <FormattedMessage id="app.settings.basic.change-avatar" defaultMessage="Change avatar" />
            </Button>
          </div>
        </Upload>
      </Fragment>
    );
  }
}
export default  AvatarView;
