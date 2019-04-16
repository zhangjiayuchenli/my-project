import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import { connect } from 'dva';
import { Input } from 'antd';
const Search = Input.Search;
const mapStateToProps = state => {
  return {
    scoresList: state.teacher.scoresList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearch: payload =>
      dispatch({
        type: 'teacher/getTotalScoreByYear',
        payload: payload,
      }),
  };
};
const data = [
  {
    year: '1991',
    value: 3,
  },
  {
    year: '1992',
    value: 4,
  },
  {
    year: '1993',
    value: 3.5,
  },
  {
    year: '1994',
    value: 5,
  },
  {
    year: '1995',
    value: 4.9,
  },
  {
    year: '1996',
    value: 6,
  },
  {
    year: '1997',
    value: 7,
  },
  {
    year: '1998',
    value: 9,
  },
  {
    year: '1999',
    value: 13,
  },
];

const cols = {
  totalScore: {
    min: 0,
  },
  schoolYear: {
    range: [0, 1],
  },
};
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Basic extends React.Component {
  componentWillMount() {
    //this.props.onSearch(202151336);
  }
  handleSearch = e => {
    console.log(e);
    this.props.onSearch({ teacherId: localStorage.getItem('id'), text: e });
  };
  render() {
    console.log(data);
    console.log(this.props.scoresList);
    return (
      <div>
        <div>
          <Search
            placeholder="input search text"
            onSearch={value => this.handleSearch(value)}
            enterButton
            style={{ width: 200 }}
          />
        </div>
        <div>
          <Chart height={500} data={this.props.scoresList} scale={cols} width={1100}>
            <Axis name="schoolYear" />
            <Axis name="totalScore" />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom type="line" position="schoolYear*totalScore" size={2} />
            <Geom
              type="point"
              position="schoolYear*totalScore"
              size={4}
              shape={'circle'}
              style={{
                stroke: '#fff',
                lineWidth: 1,
              }}
            />
          </Chart>
        </div>
      </div>
    );
  }
}

export default Basic;
