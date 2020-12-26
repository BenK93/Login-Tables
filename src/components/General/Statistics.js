import React, { PureComponent } from 'react';
import { Typography,Statistic, Row, Col } from 'antd';
import {CarryOutFilled, DashboardTwoTone } from '@ant-design/icons';
const {Title} = Typography;

export default class StatisticsTable extends PureComponent {
    render() {
        return (
            <div className="statistics">
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title={<Title strong 
                     level={3}><DashboardTwoTone /> Average Score</Title>}
                     value={String(this.props.projects.reduce((a,b) => a +b.score, 0)/ this.props.projects.length)} />                    
                </Col>
                <Col span={12}>
                    <Statistic title={<Title strong 
                     level={3}><CarryOutFilled /> Made Deadline </Title>} 
                     value={String(((this.props.projects.filter((p) => p.madeDadeline === true).length)/(this.props.projects.length)).toFixed(2))+"%"}  />                    
                </Col>
            </Row>
        </div>
        )
    }
}
