import React, { Component } from 'react';
import { Collapse, Icon } from 'antd';

const Panel = Collapse.Panel;

const text = (
  <div>
    <h3 align="center">考试规则</h3>
    <p>
      一、自觉服从监考员等考试工作人员管理，不得以任何理由妨碍监考员等考试工作人员履行职责，不得扰乱考场及其他考试工作地点的秩序。
    </p>
    <p>
      二、凭《准考证》等规定证件,按规定时间和地点参加考试。应主动接受监考员按规定进行的身份验证和对随身物品等进行的必要检查。
    </p>
    <p>
      三、迟到15分钟后(中考、会考外语科按考试院相关规定执行)不准进入考点参加当科目考试。交卷出场时间不得早于每科目考试结束前30分钟，
      交卷出场后不得再次进场续考，也不得在考场附近逗留或交谈。
    </p>
    <p>
      四、2B铅笔、黑色字迹的钢笔或签字笔、直尺、圆规、三角板、无封套橡皮等必需的考试用品(有特殊规定的除外)可带入考场，其他任何物品不准带入考场。
      严禁携带各种通讯工具(如手机等具有发送或者接收信息功能的设备等)、电子存储记忆录放设备以及涂改液、
      修正带等物品进入考场。不准随身夹带文字材料及其他与考试无关的物品。
    </p>
    <p>
      五、考生进入考场后按准考证号(座位号)入座，将《准考证》及证件放在桌子右上角以便核验。
      考生在领到试卷和答题卡后，应按要求在规定的时间内在试卷及答题卡上的指定位置粘贴条码或准确、清楚地填(涂)姓名、准考证号(座位号)等栏目。凡漏填、错填或书写字迹不清的答卷、答题卡影响评!卷结果的，责任由考生自负。遇试卷、答题卡分发错误及试题字迹不清、重印、漏印或缺页等问题，可举手询问，在开考前报告监考员;开考后，再行更换的，延误的考试时间不予补偿;涉及试题内容的疑问，不得向监考员询问。
    </p>
    <p>六、开考信号发出后方可答题。考生必须用现行规范的语言文字答题。</p>
    <p>
      七、在试卷或答题卡(纸)规定的地方答题。不得使用红色宇迹笔或铅笔(除画图外)答题。不得用规定以外的笔和纸答题，写在试卷、草稿纸上或答题卡(纸)规定区域以外的答案-
      ~律无效，不得在答卷、答题卡(纸)上做任何标记。
    </p>
    <p>
      八、在考场内须保持安静，不准吸烟，不准喧哗，不准交头接耳、左顾右盼、打手势、做暗号，不准夹带、旁窥、抄袭或有意让他人抄袭，不准传抄答案或交换试卷、答题卡、草稿纸，不准传递文具、物品等,不准将试卷、答卷、答题卡或草稿纸带出考场,
    </p>
    <p>
      九、试卷、答题卡分发错误及试题字迹不清等问题，考生须先举手，经监考员同意后轻声提问。涉及试题内容的疑问，不得向监考员询问。
    </p>
    <p>
      十、考试结束前要离开考场的考生须先按答题卡、试卷、草稿纸从上到下的顺序在桌面上，再举手提出离场，经监考员允许后才准离开考场，离开后不准在考场附近逗留
    </p>
    <p>
      十一、考试结束信号发出后，考生须立即停笔，将试卷和答题卡从上至下按照答题卡、试卷、草稿纸的顺序平放在桌面上，坐好静候收卷。待监考员收齐检查无误，根据监考员指令依次退出考场。
    </p>
    <p>
      十二、如不遵守考试规则，不服从考试工作人员管理，有违纪、作弊等行为，教育考试机构将按照
      《国家教育考试违规处理办法》及有关规定进行处理，并将记入国家教育考试诚信档案。
    </p>
  </div>
);

const text2=(
  <div>
    <h3 align="center">全国中小学生日常行为规范守则</h3>
    <p>
      1、尊敬国旗、国徽,会唱国歌，升降国旗、奏唱国歌时肃立、脱帽、行注目礼，少先队员行队礼。
    </p>
    <p>
      2、尊敬父母，关心父母身体健康，主动为家庭做力所能及的事。听从父母和长辈的教导，外出或回到家要主动打招呼。
    </p>
    <p>
      3、诚实守信，不说谎话，知错就改，不随意拿别人的东西，借东西及时归还，答应别人的事努力做到，做不到时表示歉意。考试不作弊。
    </p>
    <p>
      4、尊老爱幼，平等待人。同学之间友好相处，互相关心，互相帮助。不欺负弱小，不讥笑、戏弄他人。尊重残疾人。尊重他人的民族习惯。
    </p>
    <p>
      5、尊敬老师，见面行礼，主动问好，接受老师的教导，与老师交流。待人有礼貌，说话文明，讲普通话，会用礼貌用语。
    </p>
    <p>
      6、不骂人，不打架。到他人房间先敲门，经允许再进入，不随意翻动别人的物品，不打扰别人的工作、学习和休息。
    </p>
    <p>
      1、尊敬国旗、国徽,会唱国歌，升降国旗、奏唱国歌时肃立、脱帽、行注目礼，少先队员行队礼。
    </p>
    <p>
      1、尊敬国旗、国徽,会唱国歌，升降国旗、奏唱国歌时肃立、脱帽、行注目礼，少先队员行队礼。
    </p>
    <p>
      1、尊敬国旗、国徽,会唱国歌，升降国旗、奏唱国歌时肃立、脱帽、行注目礼，少先队员行队礼。
    </p>
    <p>
      1、尊敬国旗、国徽,会唱国歌，升降国旗、奏唱国歌时肃立、脱帽、行注目礼，少先队员行队礼。
    </p>
    <p>
      1、尊敬国旗、国徽,会唱国歌，升降国旗、奏唱国歌时肃立、脱帽、行注目礼，少先队员行队礼。
    </p>
  </div>
)

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};
export default class QueryRules extends Component {
  render() {
    return (
      <div>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
        >
          <Panel header="考试规则查询" key="1" style={customPanelStyle}>
            <p>{text}</p>
          </Panel>
          <Panel header="评分标准查询" key="2" style={customPanelStyle}>
            <p>{text}</p>
          </Panel>
          <Panel header="全国中小学生日常行为规范守则" key="3" style={customPanelStyle}>
            <p>{text2}</p>
          </Panel>
        </Collapse>
      </div>
    );
  }
}
