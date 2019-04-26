import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form,Input,Button} from 'antd';
import { connect } from 'dva';
import styles from './SecurityView.less';

@connect(({teacher})=>({
  teacher
}))
@Form.create()
class SecurityView extends Component {
  state = {
    confirmDirty: false,
  };
  
  componentDidUpdate = () => {
    if (this.props.code == '0') {
      //此处code是更新验证的code
      alert('成功修改，请重新登录');
      this.props.changeCodes({ code: 1 });
      // 修改code值，此处code是登陆验证的code
      router.replace('/login');
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const {form,dispatch}=this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { confirm, ...value } = values;
        dispatch({
          type:'teacher/updateTeacher',
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
    const form = this.props.form;
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
    return (
      <div className={styles.SecurityView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
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
