import React, { Component } from 'react';
import {connect} from 'dva'
import GlobalHeader from '../components/GlobalHeader/index';

@connect(({global})=>({
  global
}))
class Header extends Component {
  handleNoticeClear = (type) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/clearNotices',
      payload:({type})
    });
  };

  render() {
    return <GlobalHeader onNoticeClear={this.handleNoticeClear} />;
  }
}
export default Header;
