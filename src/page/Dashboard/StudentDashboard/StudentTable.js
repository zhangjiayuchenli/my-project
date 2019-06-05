import React, { Component } from 'react';
import { Table, Select } from 'antd';
import styles from './StudentTable.less';
import { connect } from 'dva';

const { Column, ColumnGroup, Colums } = Table;
const { Option } = Select;
const mapStateToProps = state => {
  return {
    stuCourses: state.student.stuCourses,
    id: state.login.id,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: payload =>
      dispatch({
        type: 'student/getStuAndCourse',
        payload,
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
    const { stuCourses=[]}  = this.props;


    const columns = [
      { title: 'stuId', dataIndex: 'id' },
      { title: 'name', dataIndex: 'studentName' },
      {title: 'class', dataIndex:'className'},
    ];

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
          dataSource={stuCourses}
          title={() => '学生成绩'}
        />
        <Table
          columns={columns2}
          rowKey={record => record.id}
          dataSource={stuCourses}
          pagination={false}
        />
      </div>
    );
  }
}
export default  StudentTable;
