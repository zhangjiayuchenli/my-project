import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Select, Button , DatePicker,message} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './BaseView.less';
import AvatarView from '@/components/Avatar/index'
// import { getTimeDistance } from '@/utils/utils';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ global }) => ({
  currentUser: global.currentUser,
}))
@Form.create()
class BaseView extends Component {
  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = currentUser[key] || null;
      obj.teacherBrithday = moment(obj.teacherBrithday);
      form.setFieldsValue(obj);
    });
  };

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser.teacherAvatar) {
      return currentUser.teacherAvatar;
    }
    const url = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
    return url;
  }

  handleSubmit = e => {
    e.preventDefault();
    const {form,dispatch}=this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({
          type:'teacher/updateStu',
          payload: values,
        })

      }
    });
  };

  getViewDom = ref => {
    this.view = ref;
  };

  success = () => {
    message.success('发布成功');
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            <FormItem label={formatMessage({ id: 'app.settings.basic.email' })}>
              {getFieldDecorator('teacherEmail', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.nickname' })}>
              {getFieldDecorator('teacherName', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.nickname-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.sex' })}>
              {getFieldDecorator('teacherSex', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.sex-message' }, {}),
                  },
                ],
              })(
                <Select style={{ maxWidth: 220 }}>
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.phone' })}>
              {getFieldDecorator('teacherPhone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.phone-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.address' })}>
              {getFieldDecorator('teacherAddress', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.address-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.birthday' })}>
              {getFieldDecorator('teacherBrithday', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.birthday-message' }, {}),
                  },
                ],
              })(
                <DatePicker onChange={this.onChange} />
              )}
            </FormItem>
            <Button type="primary" htmlType="submit" onClick={this.success}>
              <FormattedMessage
                id="app.settings.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default BaseView;
