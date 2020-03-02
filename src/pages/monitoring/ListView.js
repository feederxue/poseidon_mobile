/* eslint no-dupe-keys: 0 */
import React from 'react'
import ReactDOM from 'react-dom';
import { ListView, PullToRefresh } from 'antd-mobile';
import './listview.css'

function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

const data = [
    {
        num: 6,
        title: '80.32.225.76',
        des: 'Windows系统内存利用率过大，值为:99%',
        starttime: '2019-02-22 04:50:02',
        enttime: '2019-02-22 05:00:01'
    },
    {
        num: 7,
        title: '10.243.1.146',
        des: 'WAS wapnode->wapserver 服务状态异常,状态为严重警告',
        starttime: '2019-02-22 03:10:02',
        enttime: '2019-02-22 03:15:01'
    },
    {
        num: 5,
        title: '10.155.81.1',
        des: 'SQL Server数据库MSSQLSERVER锁报警,当前数量为:5275',
        starttime: '2019-02-22 07:13:02',
        enttime: '2019-02-22 03:25:01'
    },
];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        sectionIDs.push(sectionName);
        dataBlobs[sectionName] = sectionName;
        rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
            const rowName = `S${ii}, R${jj}`;
            rowIDs[ii].push(rowName);
            dataBlobs[rowName] = rowName;
        }
    }
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
}

class Listview extends React.Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
            refreshing:true
        };
    }

    componentDidMount() {
        //你可以滚动到指定的位置
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        //模拟初始Ajax
        setTimeout(() => {
            genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
                height: hei,
            });
        }, 600);
    }

    //如果你使用redux，数据可能在props中，你需要使用componentWillReceiveProps
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
    //     });
    //   }
    // }

    onEndReached = (event) => {
        //加载新数据
        // hasMore:从后端数据，表明它是否是最后一页，这里是假的
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            genData(++pageIndex);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
            });
        }, 1000);
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            console.log(obj,'obj')
            return (
                <div key={rowID} style={{ padding: '0 15px',borderBottom:'8px solid #ECECED' }}>
                    <div
                        style={{
                            height: '50px',
                            fontWeight: 'bold',
                            fontSize: 18,
                            borderBottom: '1px solid #F6F6F6',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <span style={{ backgroundColor: 'red' }} className='circle'>{obj.num}</span>
                        <span>{obj.title}</span>
                    </div>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
                        <div style={{ lineHeight: 1 }}>
                            <div style={{ marginBottom: '8px', color: '#888', }}>{obj.des}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#888888' }}>
                                <span>{obj.starttime}</span>
                                <span>{obj.enttime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderHeader={() => <span>header</span>}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                // renderSectionHeader={sectionData => (
                //     <div>{`Task ${sectionData.split(' ')[1]}`}</div>
                // )}
                renderBodyComponent={() => <MyBody />}
                renderRow={row}
                // renderSeparator={separator}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                pageSize={4}
                onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
                // pullToRefresh={<PullToRefresh
                //     refreshing={this.state.refreshing}
                //     onRefresh={this.onRefresh}
                // />}
            />
        );
    }
    onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
        // simulate initial Ajax
        setTimeout(() => {
          this.rData = genData();
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            refreshing: false,
            isLoading: false,
          });
        }, 600);
      };
}
export default Listview;