import React, { Component } from 'react';
import { Table, Divider, Tag, Select } from 'antd';
import styles from './StudentTable.less';
import { connect } from 'dva';
import moment from '../../Account/Setting/StuSetting/BaseView';
const { Column, ColumnGroup, Colums } = Table;
const { Option } = Select;
const mapStateToProps = state => {
  return {
    stuList: state.student.stuList,
    id: state.login.id,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: payload =>
      dispatch({
        type: 'student/getStuAndCourse',
        payload: payload,
      }),
  };
};
@connect(
  mapStateToProps,
  mapDispatchToProps
)
 class StudentTable extends Component {
  componentDidMount = () => {
    this.props.onSubmit({ year: '1' });
  };
  handleChange = value => {
    this.props.onSubmit({ year: value });
  };
  render() {
    const { stuList={}}  = this.props;
    console.log(stuList)
    let data = []
    data.push(stuList)
    console.log(data)
    /*let data = [];
    for (let i in stuList) {
      let o = {};
      o[i] = stuList[i];
      data.push(o)
    }*/

    const columns = [
      { title: 'stuId', dataIndex: 'id' },
      { title: 'name', dataIndex: 'studentName' },
      //{title: 'class', dataIndex:'className'},
    ];
    /*let data = [];
    Object.keys(columns.dataIndex).forEach(dataIndex => {
      const obj = {};
      obj[dataIndex] = stuList[dataIndex] || null;
      console.log(obj)
    });*/
    //data.push(stuList);
    console.log(data);
    const columns2 = [
      {
        title: 'physics',
        dataIndex: 'physics',
      },
      {
        title: 'math',
        dataIndex: 'math',
      },
      {
        title: 'english',
        dataIndex: 'english',
      },
      {
        title: 'chemistry',
        dataIndex: 'chemistry',
      },
      {
        title: 'chinese',
        dataIndex: 'chinese',
      },
      {
        title: 'biology',
        dataIndex: 'biology',
      },
    ];
    return (
      <div className={styles.main}>
        <Select
          onChange={this.handleChange}
          defaultValue="1"
          style={{ width: '20%' }}
          allowClear={true}
          showSearch={true}
        >
          <Option key="1">第一学期</Option>
          <Option key="2">第二学期</Option>
        </Select>
        <Table
          pagination={false}
          columns={columns}
          rowKey={record => record.id}
          dataSource={data}
          title={() => '学生成绩'}
        />
        {/*<Table
          columns={columns2}
          rowKey={"1"}
          dataSource={[stuList]}
          pagination={false}
        />*/}
      </div>
    );
  }
}
export default  StudentTable;
