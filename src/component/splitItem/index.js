import React, { Component } from 'react';
import styles from './styles.css';
import { post, URL } from '../../tools/networker';
export default class SplitItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemArray: []
        }
    }
    componentDidMount() {
        post(URL + '/getSplitItem', JSON.stringify({
            audio_id: 15
        })).then(data => {
            // console.log(data)
            this.setState({
                itemArray: data.result
            })
        })
    }
    renderItem = () => {
        let arr = this.state.itemArray.concat();
        return arr.map((item, index) => (this.listItem(item, index)));
    }
    listItem = (item, index) => {
        return (
            <div className={styles.tableRow} key={index}>
                <div className={styles.tableLable}>{index}</div>
                <div className={styles.tableLable}>{item.path.substring(item.path.lastIndexOf('/')+1,item.path.length)}</div>
                <div className={styles.tableLable}><a download="test" href={URL + item.path}>下载文件</a></div>
            </div>
        )
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.search}></div>
                <div className={styles.tableArea}>
                    <div className={styles.tableRow}>
                        <div className={styles.tableLable}>序号</div>
                        <div className={styles.tableLable}>名称</div>
                        <div className={styles.tableLable}>下载地址</div>
                    </div>
                    {this.state.itemArray.length ?
                        this.renderItem() : <div style={{
                            color: '#222',
                            fontSize: '12px'
                        }}>当前无数据</div>
                    }
                </div>

                <div></div>
            </div>
        )
    }
}