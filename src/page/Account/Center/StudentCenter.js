import React, { Component } from 'react';
import { Card, Divider, Tag, Upload, message, Button, Icon, Row, Col ,Avatar} from 'antd';
import { connect } from 'dva';
import styles from './StudentCenter.less';

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
export default class studentCenter extends Component {
  state = {
    studentAvatar: JSON.parse(sessionStorage.getItem('user')).studentAvatar,
    studentName: JSON.parse(sessionStorage.getItem('user')).studentName,
    studentAddress: JSON.parse(sessionStorage.getItem('user')).studentAddress,
  };

  render() {
    const {currentUser}=this.props
    return (
      <Row gutter={24}>
        <Col span={24}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <div className={styles.main}>
              <div className={styles.avatarHolder}>
                <img
                  alt=""
                  src={currentUser.studentAvatar}
                  style={{ width: '100px', height: '100px', borderRadius: '32px' }}
                />
                <div className={styles.name}>{this.state.studentName}</div>
                <div>好好学习，天天向上</div>
              </div>
              <div className={styles.detail}>
                <p>
                  <i className={styles.title} />
                  学生
                </p>
                <p>
                  <i className={styles.group} />
                  璧山中学
                </p>
                <p>
                  <i className={styles.address} />
                  {this.state.studentAddress}
                </p>
              </div>
              <Divider dashed />
              <div className={styles.tags}>
                <div className={styles.tagsTitle}>标签</div>
                <Tag color="magenta">学生</Tag>
                <Tag color="magenta">高三狗</Tag>
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
