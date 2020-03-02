import React from 'react';
import { Tabs, } from 'antd-mobile';
import './tabs5.css'
import Listview from './ListView'

class Tabs5 extends React.Component {
    renderContent = tab =>
        (<div>
            {tab.com}
        </div>);

    render() {
        const tabs = [
            { title: '当前报警', com: <Listview /> },
            { title: '历史报警' },
            { title: '报警收集' },
            { title: '值班交接' },
        ];

        return (
            <div>
                <Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}>
                    {this.renderContent}
                </Tabs>
            </div>
        )
    }
}

export default Tabs5;
