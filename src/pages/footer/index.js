import React from 'react';
import './index.css';
import { Tabs, } from 'antd-mobile';
import Search from '../components/searchBar'
import Tabs5 from '../monitoring/tabs5'
// import Carousel from '../home/carousel'
import {HomeOutlined,InfoCircleOutlined,UserOutlined} from '@ant-design/icons';


const tabs2 = [
    { title:<HomeOutlined/>, tit:'首页',sub: '1' },
    { title: <InfoCircleOutlined />,  tit:'监控',sub: '2' },
    { title: <UserOutlined />, tit:'我的', sub: '3' },
];

class Footer extends React.Component {
    render() {
        return (
            <div style={{height:'100%'}}>
                <Tabs tabs={tabs2}
                    initialPage={1}
                    tabBarPosition="bottom"
                    renderTab={tab =><p>{tab.title}</p>}>
                    <div>
                        <Search />
                        {/* <Carousel /> */}
                    </div>
                    <div style={{backgroundColor: '#fff' }}>
                        <Search />
                        <Tabs5/>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of third tab2
                    </div>
                </Tabs>
            </div>
        )
    }
}

export default Footer;
