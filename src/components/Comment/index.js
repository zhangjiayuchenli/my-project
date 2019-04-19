import React, { Component } from 'react';
import { Form, Button, Input,message } from 'antd';
import { connect } from 'dva';

const {TextArea} = Input;

@connect(({ admin ,teacher}) => ({
  admin,teacher
}))
class App extends Component {
  state = {
    ws: '',
  };

  /*componentWillMount() {
    const id = localStorage.getItem('id');
    const wsUrl = `ws://localhost:8080/websocket/${id}`;
    let { ws } = this.state;
    if (!ws) {
      ws = new WebSocket(wsUrl);
      this.setState({
        ws,
      });
      ws.onopen = function(e) {
        console.log('连接上 ws 服务端了');
      };
      let result;
      ws.onmessage = msg => {
        console.log('接收服务端发过来的消息: %o', msg);
        let msgJson = JSON.parse(msg.data);
        result += msgJson.MsgBody + '\n';
        console.log(msgJson);
        this.setState({
          chatMessage: [...chatMessage, { ...msgJson, clickClose: true }],
        });
      };
      ws.onclose = function(e) {
        console.log('ws 连接关闭了');
        console.log(e);
      };
    }
  }*/
  
  handleSubmit = e => {
    e.preventDefault();
    const {form}=this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { description } = values;
        const { sendType ,dispatch} = this.props;
        const types=localStorage.getItem('types');
        if (types==='admin')
        {
          dispatch({
            type: 'admin/sendMessage',
            payload: { description, sendType },
          });
        }
        else if(types==='teacher')
        {
          dispatch({
            type: 'teacher/sendMessage',
            payload: { description },
          });
        }

      }
    });
  };

  success = () => {
    message.success('发布成功');
  };

  render() {
    const { sendType ,form} = this.props;
    console.log(sendType);
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            rules: [
              {
                message: 'please enter  description',
              },
            ],
          })(<TextArea rows={4} placeholder="please enter description" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.success}>
            发布
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(App);
export default WrappedNormalLoginForm;
