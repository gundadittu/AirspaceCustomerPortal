import React from 'react';
import { Row, Col, Menu, Button, Collapse, Icon } from 'antd';
import supportArticlesConfig from './SupportArticlesConfig';
import GetHelpForm from './GetHelpForm';
const Panel = Collapse.Panel;
const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
};

class SupportArticles extends React.Component {

    state = {
        getHelpVisible: false,
        dataSource: "services"
    }

    showHelp() {
        this.setState({ getHelpVisible: true });
    }

    hideHelp() {
        this.setState({ getHelpVisible: false });
    }

    handleClick(e) {
        var key = e.key;
        this.setState({ dataSource: key });
    }


    body() {
        const articleList = supportArticlesConfig[this.state.dataSource] || [];
        return (
            <div style={{ paddingTop: "0%" }}>
                <Collapse
                    bordered={false}
                    defaultActiveKey={[]}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                >
                    {
                        articleList.map(articles => (
                            <Panel header={articles.header} key={articles.key} style={customPanelStyle}>
                                {articles.body}
                            </Panel>
                        ))
                    }
                </Collapse>
            </div>
        );
    }

    render() {
        return (
            <div>
                {/* <GetHelpForm visible={this.state.getHelpVisible} onCancel={this.hideHelp.bind(this)} /> */}
                <Row >
                    <Col span={12}>
                        <Row type="flex" style={{ height: 87 }} align="middle" justify="start">
                            <Menu
                                className="inlineDisplay menu-tab"
                                style={{ border: 0 }}
                                onClick={this.handleClick.bind(this)}
                                defaultSelectedKeys={[this.state.dataSource]}
                                mode="horizontal"
                            >
                                <Menu.Item key="services">
                                    Services
                    </Menu.Item>
                                <Menu.Item key="billing">
                                    Billing
                    </Menu.Item>
                                <Menu.Item key="expManager">
                                    Experience Manager
                    </Menu.Item>
                                <Menu.Item key="other">
                                    Other
                    </Menu.Item>
                            </Menu>
                        </Row>
                    </Col>
                    <Col span={12}>
                    </Col>
                </Row>
                {this.body()}
            </div>
        )
    }
}

export default SupportArticles;