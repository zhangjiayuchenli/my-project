import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form,Input,Button,Alert} from 'antd';
import { connect } from 'dva';
import styles from './SecurityView.less';

@connect(({teacher,loading})=>({
  teacher,
  submitting: loading.effects["teacher/updateTeacherPassword"]
}))
@Form.create()
class SecurityView extends Component {
  state = {
    confirmDirty: false,
  };

  onClose = (e) => {
    console.log(e, 'I was closed.');
  };

  renderMessage = () => (
    <Alert
      style={{ marginBottom: 24 }}
      message="旧密码错误，请重新输入"
      type="error"
      showIcon
      closable
      onClose={this.onClose}
    />
  );

  handleSubmit = e => {
    e.preventDefault();
    const {form,dispatch}=this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { confirm, ...value } = values;
        dispatch({
          type:'teacher/updateTeacherPassword',
          payload: value,
        })
      }
    });
  };

  handleConfirmBlur = e => {
    const {value} = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && value !== form.getFieldValue('teacherPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const {teacher,submitting}=this.props
    console.log(submitting)
    return (
      <div className={styles.SecurityView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            {teacher.passwordCode===-1&&!submitting && this.renderMessage()}
            <Form.Item label="旧密码">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入初始密码!',
                  },

                ],
              })(<Input.Password type="password" />)}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator('teacherPassword', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password type="password" />)}
            </Form.Item>
            <Form.Item label="确认密码">
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password type="password" onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

    );
  }
}

export default SecurityView;
