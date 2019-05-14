import React, { Component } from 'react';
import { Table, Divider, Icon, Popconfirm, Button, Input, Select, Spin } from 'antd';
import { connect } from 'dva';

import Highlighter from 'react-highlight-words';

const { Option } = Select;


let list = [];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log('selectedRowKeys: ', selectedRowKeys, 'selectedRows: ',selectedRows);
    list = selectedRowKeys;
    console.log(list);
  },
  getCheckboxProps: record => ({
    disabled: record.studentName === '宁云', // Column configuration not to be checked
    name: record.studentName,
  }),
};

const provinceData = ['第一学期', '第二学期'];
const cityData = {
  第一学期: ['第一周', '第二周', '第三周'],
  第二学期: ['第一周', '第二周', '第三周'],
};

@connect(({check,teacher})=>({
  check,teacher,
  classroomList:check.classroomList,


}))
class ClassroomCheck extends Component {
  state = {
    searchText: '',
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
    province:provinceData[0]
  };


  handleProvinceChange = (value) => {
    console.log(value)
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
      province:value
    });
  }

  onSecondCityChange = (value) => {
    this.setState({
      secondCity: value,
    });
    const {dispatch}=this.props;
    const {province}=this.state;
    dispatch({
      type:'check/getClassroomCheck',
      payload:({year:province,week:value})
    })
  }

  componentWillMount = () => {
    const {dispatch}=this.props;
    const {secondCity}=this.state;
    dispatch({
      type:'check/getClassroomCheck',
      payload:({year:provinceData[0],week:secondCity})
    })
    dispatch({
      type: 'check/selectStuIdByTeacherId',

    })
  };

  handleStandardTableChange = (pagination) => {
    const { dispatch } = this.props;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
  };

  handleChange = value => {

  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    /*render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />

    ),*/
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  onDelete=payload=>{
    const { dispatch } = this.props;
    dispatch({
      type:'check/deleteClassroom',
      payload
    })
  }

  onDeleteCheck= payload =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'check/deleteClassroomByCheck',
      payload
    })
  }

  render() {
    const { classroomList = [] } = this.props;
    const { cities } = this.state;
    const columns = [
      {
        title: 'stuId',
        dataIndex: 'stuId',
        ...this.getColumnSearchProps('stuId'),
      },
      {
        title: 'Name',
        dataIndex: 'studentName',
        ...this.getColumnSearchProps('studentName'),
        render: text => <a href="javascript:;">{text}</a>,
        sorter: (a, b) => a.studentName.length - b.studentName.length,
        sortDirections: ['descend'],
      },
      {
        title: '日期',
        dataIndex: 'creatTime',
        ...this.getColumnSearchProps('creatTime'),
      },
      {
        title: '上课积极回答',
        dataIndex: 'positiveDegree',
      },
      {
        title: '上课迟到',
        dataIndex: 'later',

      },
      {
        title: '课堂作业评分',
        dataIndex: 'work',

      },
      {
        title: '小组讨论活跃度',
        dataIndex: 'discussionDegree',

      },
      {
        title: '帮助同学',
        dataIndex: 'helpClassmates',

      },
      {
        title: 'Action',
        key: 'action',
        width: '7%',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={this.props.show.bind(this, record)}>
              <Icon type="edit" />
            </a>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure？"
              onConfirm={e => this.onDelete(record)}
              onCancel={this.cancel}
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            >
              <a href="#">
                <Icon type="delete" />
              </a>
            </Popconfirm>
          </span>
        ),
      },
    ];
    return (
      <div>
        <Button type="primary" onClick={this.props.show}>
          <Icon type="user-add" />
          添加
        </Button>
        &nbsp;
        <Button
          type="danger"
          onClick={e =>
            this.onDeleteCheck({
              list,
              year: classroomList.length > 0 ? [classroomList[0].schoolYear] : null,
              week: classroomList.length > 0 ? [classroomList[0].week] : null,
            })
          }
        >
          <Icon type="user-delete" />
          删除
        </Button>
        &nbsp;
        <Select
          defaultValue={this.state.province}
          style={{ width: 120 }}
          onChange={this.handleProvinceChange}
        >
          {provinceData.map(province => <Option key={province}>{province}</Option>)}
        </Select>
        <Select
          style={{ width: 120 }}
          value={this.state.secondCity}
          onChange={this.onSecondCityChange}
        >
          {cities.map(city => <Option key={city}>{city}</Option>)}
        </Select>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={classroomList}
          rowKey={record => record.id}
          scroll={{ x: 1300 }}
          onChange={this.handleStandardTableChange}
          pagination={{total:classroomList.length,showQuickJumper:true, defaultCurrent:1}}
        />
      </div>
    );
  }
}
export default ClassroomCheck;
