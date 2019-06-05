import React, { Component } from 'react';
import { Modal, Form, Row, Col, Input, DatePicker, InputNumber, Select } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import ClassroomCheck from '../Check/ClassroomCheck';

const { Option } = Select;

@connect(({check})=>({
  check,
  StuIdList:check.StuIdList,
  ClassroomCreatetimeList:check.ClassroomCreatetimeList
}))
@Form.create()
class ClassroomCheckModal extends Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
    record: '',

  };

  handleChange = e => {
    const { getFieldValue } = this.props.form;
    const {dispatch}=this.props;
    console.log(e);
    dispatch({
      type: 'check/getClassroomStuOfCreatetime',
      payload:{studentId:e}
    })

  };

  showModal = record => {
    this.setState({
      visible: true,
      record,
    });
    console.log(record)
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {dispatch,StuIdList,ClassroomCreatetimeList}=this.props;
        const { id } = this.state.record;
        const { stuId, creatTime } = values;
        console.log(creatTime.format("YYYY-MM-DD"))
        if (!id) {
          // 判断学号是否为本班学生学号
          // 判断学号是否为本班学生学号
          const isStuId =
            StuIdList != null
              ? StuIdList.map(l => l.id).some(s => s === stuId)
              : null;
          const isYear =
            ClassroomCreatetimeList != null
              ? ClassroomCreatetimeList.map(l => l.time).some(s => s === creatTime)
              : null;
          if (isStuId) {
            if (isYear) {
              alert('该学年学生成绩已经存在，请重新输入');
              console.log('该学年学生成绩已经存在，请重新输入');
            } else if (!isYear) {
              dispatch({
                type:'check/insertClassroom',
                payload:({...values})
              })
            }
          }
          else{
            alert("该学号学生不是本班学生")
          }
        } else {
          dispatch({
            type:'check/updateClassroom',
            payload:({id, ...values})
          })
        }
        this.handleCancel();
      }
    });
    this.props.form.resetFields();
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    const { getFieldDecorator } = this.props.form;
    const {
      creatTime,
      schoolYear,
      week,
      positiveDegree,
      later,
      work,
      discussionDegree,
      helpClassmates,
      studentName,
      stuId,
    } = this.state.record;
    return (
      <div>
        <ClassroomCheck show={this.showModal} />
        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          confirmLoading={confirmLoading}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col span={7}>
                <Form.Item label="Name">
                  {getFieldDecorator('studentName', {
                    initialValue: studentName,
                    rules: [
                      { required: true, message: 'Please enter user name' },
                      { validator: this.validateName },
                    ],
                  })(<Input placeholder="Please enter user name" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="StuId">
                  {getFieldDecorator('stuId', {
                    initialValue: stuId,
                    rules: [{ required: true, message: 'Please enter studentId' }],
                  })(
                    <InputNumber
                      style={{ width: '80%' }}
                      placeholder="Please enter studentId"
                      onChange={value => this.handleChange(value)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="学年">
                  {getFieldDecorator('schoolYear', {
                    initialValue: schoolYear,
                    rules: [{ required: true, message: 'Please enter user sex' }],
                  })(
                    <Select style={{ width: '100%' }} allowClear showSearch>
                      <Option key="第一学期">第一学期</Option>
                      <Option key="第二学期">第二学期</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="当前周">
                  {getFieldDecorator('week', {
                    initialValue: week,
                    rules: [{ required: true, message: 'Please enter user sex' }],
                  })(
                    <Select style={{ width: '100%' }} allowClear showSearch>
                      <Option key="第一周">第一周</Option>
                      <Option key="第二周">第二周</Option>
                      <Option key="第三周">第三周</Option>
                      <Option key="第四周">第四周</Option>
                      <Option key="第五周">第五周</Option>

                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={8}>
                <Form.Item label="上课积极回答">
                  {getFieldDecorator('positiveDegree', {
                    initialValue: positiveDegree,
                  })(<InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    max={10}
                    placeholder="Please enter physics"
                  />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="上课迟到">
                  {getFieldDecorator('later', {
                    initialValue: later,
                  })(<InputNumber style={{ width: '100%' }}
                                  min={1}
                                  max={150}
                                  placeholder="Please enter address" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="课堂作业评分">
                  {getFieldDecorator('work', {
                    initialValue: work,
                  })(<InputNumber style={{ width: '100%' }}
                                  min={1}
                                  max={150}
                                  placeholder="Please enter phone" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="小组讨论活跃度">
                  {getFieldDecorator('discussionDegree', {
                    initialValue: discussionDegree,
                  })(<InputNumber style={{ width: '100%' }}
                                  min={1}
                                  max={100}
                                  placeholder="Please enter email" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="帮助同学">
                  {getFieldDecorator('helpClassmates', {
                    initialValue: helpClassmates,
                  })(<InputNumber style={{ width: '100%' }} placeholder="Please enter phone" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Birthday">
                  {getFieldDecorator('creatTime', {
                    initialValue: creatTime?moment(new Date(creatTime)):null,
                    rules: [{ required: true, message: 'Please choose the dateTime' }],
                  })(<DatePicker onChange={this.onChange} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <p>{ModalText}</p>
        </Modal>
      </div>
    );
  }
}
export default ClassroomCheckModal;
