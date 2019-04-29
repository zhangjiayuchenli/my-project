import React, { Component } from 'react';
import { Card, Divider, Tag, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './TeacherCenter.less';

const style = {
  width: '400px',
  margin: '40px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  border: '1px solid #e8e8e8',
};

@connect(({global})=>({
    global,
    currentUser:global.currentUser
  })
)
class TeacherCenter extends Component {

  render() {
    const {currentUser}=this.props
    console.log(currentUser)
    return (
      <Row gutter={24}>
        <Col span={24}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <div className={styles.main}>
              <div className={styles.avatarHolder}>
                <img
                  alt=""
                  src={currentUser.teacherAvatar}
                  style={{ width: '100px', height: '100px', borderRadius: '32px' }}
                />
                <div className={styles.name}>{currentUser.teacherName}</div>
                <div>春蚕到死丝方尽，蜡炬成灰泪始干</div>
              </div>
              <div className={styles.detail}>
                <p>
                  <i className={styles.title} />
                  人民教师
                </p>
                <p>
                  <i className={styles.group} />
                  蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED
                </p>
                <p>
                  <i className={styles.address} />
                  {currentUser.teacherAddress}
                </p>
              </div>
              <Divider dashed />
              <div className={styles.tags}>
                <div className={styles.tagsTitle}>标签</div>
                <Tag color="magenta">班主任</Tag>
                <Tag color="magenta">班主任</Tag>
                <Tag color="magenta">班主任</Tag>
              </div>
              <Divider style={{ marginTop: 16 }} dashed />
              <div className={styles.team}>
                <div className={styles.teamTitle}>团队</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default TeacherCenter
