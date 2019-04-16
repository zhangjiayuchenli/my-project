import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import TeacherTable from '../Dashboard/AdminDashboard/Teacher';
const { Option } = Select;
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    onUpdate: payload =>
      dispatch({
        type: 'teacher/adminUpdateTeacher',
        payload: payload,
      }),
    onInsert: payload =>
      dispatch({
        type: 'teacher/insertTeacher',
        payload: payload,
      }),
  };
};
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class DrawerForm extends Component {
  state = {
    visible: false,
    record: '',
  };
  showDrawer = record => {
    this.setState({
      visible: true,
      record: record,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { id } = this.state.record;
        const { sex, name, password, address, birthday, email, phone } = values;
        const { confirm, ...value } = values;
        if (!id) {
          this.props.onInsert(value);
        } else {
          this.props.onUpdate({ id, ...value });
        }

        this.onClose();
      }

      //this.props.submitForm({username:values.userName,password:values.password});
    });
    this.props.form.resetFields();
  };
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;

    if (value && value !== form.getFieldValue('teacherPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  validatePasswordFormat = (rule, value, callback) => {
    const form = this.props.form;
    let reg = /^.*(?=.{8,15})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[!@#$%^&*?\(\)]).*$/;

    if (value && reg.test(value)) {
      callback();
    } else {
      callback('长度为8-15位，密码必须包含大小写字母,数字以及特殊字符');
    }
  };
  validateName = (rule, value, callback) => {
    let reg = /^(?=.{1,8})$/;
    if (value && value.length < 9) {
      callback();
    } else {
      callback('长度不能长于8');
    }
  };
  validatePhone = (rule, value, callback) => {
    const regxMobilePhone = /^1(3|4|5|7|8)\d{9}$/;
    const regxPhone = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;

    if (value && regxMobilePhone.test(value) && regxPhone.test(value)) {
      callback();
    } else {
      callback('手机号码、或者固定电话');
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  handleCurrencyChange = currency => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  };
  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { size } = this.props;
    const {
      teacherName,
      teacherPassword,
      teacherSex,
      teacherAddress,
      teacherEmail,
      teacherPhone,
    } = this.state.record;
    return (
      <div>
        <TeacherTable show={this.showDrawer} />
        <Drawer
          title="Create a new account"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          style={{
            overflow: 'auto',
            height: 'calc(100% - 108px)',
            paddingBottom: '108px',
          }}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Name">
                  {getFieldDecorator('teacherName', {
                    initialValue: teacherName,
                    rules: [
                      { required: true, message: 'Please enter user name' },
                      { validator: this.validateName },
                    ],
                  })(<Input placeholder="Please enter user name" />)}
                </Form.Item>
                <Form.Item label="Sex">
                  {getFieldDecorator('teacherSex', {
                    initialValue: teacherSex,
                    rules: [{ required: true, message: 'Please enter user sex' }],
                  })(
                    <Select
                      size={size}
                      style={{ width: '32%' }}
                      allowClear={true}
                      showSearch={true}
                    >
                      <Option value="男">男</Option>
                      <Option value="女">女</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Password">
                  {getFieldDecorator('teacherPassword', {
                    initialValue: teacherPassword,
                    rules: [
                      { required: true, message: 'Please enter password' },
                      {
                        validator: this.validateToNextPassword,
                      },
                      //{    validator:this.validatePasswordFormat}
                    ],
                  })(<Input.Password style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="Confirm Password">
                  {getFieldDecorator('confirm', {
                    initialValue: teacherPassword,
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
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Address">
                  {getFieldDecorator('teacherAddress', {
                    initialValue: teacherAddress,
                    rules: [{ required: true, message: 'Please select an owner' }],
                  })(<Input placeholder="Please enter address" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone">
                  {getFieldDecorator('teacherPhone', {
                    initialValue: teacherPhone,
                    rules: [
                      { required: true, message: 'Please choose the type' },
                      {
                        validator: this.validatePhone,
                      },
                    ],
                  })(<Input placeholder="Please enter phone" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Email">
                  {getFieldDecorator(
                    'teacherEmail',
                    {
                      initialValue: teacherEmail,
                      rules: [{ required: true, message: 'Please choose the approver' }],
                    },
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    }
                  )(<Input placeholder="Please enter email" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Birthday">
                  {getFieldDecorator('teacherBrithday', {
                    initialValue: moment(new Date()),
                    rules: [{ required: true, message: 'Please choose the dateTime' }],
                  })(<DatePicker onChange={this.onChange} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const TeacherDrawer = Form.create()(DrawerForm);
export default TeacherDrawer;
