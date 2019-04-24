import React from 'react';
import Link from 'umi/link';

import Exception from '@/components/Exception';

class Exception404 extends React.Component {
  state = {
    redirect: '/'
  }

  componentWillMount() {
    this.handleRedirect();
  }

  /** 根据不同用户类型404返回的首页界面也不同 */
  handleRedirect = () =>
  {
      const types=localStorage.getItem('types')
      if( types=== 'teacher')
      {
        this.setState({ redirect: '/dashboard/teacher/student' })
      }
      else if(types=== 'stu')
      {
        this.setState({ redirect: '/dashboard/student/studentInfo' })
      }
      else {
        this.setState({ redirect: '/dashboard/admin/student' })
      }
  }

  render()
    {

      const { redirect } = this.state;
      return (
        <Exception type="404" linkElement={Link} redirect={redirect} />
      )
    }

}
export default Exception404;
