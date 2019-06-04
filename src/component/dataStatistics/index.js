import React, { Component } from 'react';
import { post, URL } from '../../tools/networker';
import styles from './styles.css';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import ReactEcharts from 'echarts-for-react';
import { config } from './config';
import { option } from './conver.config.js';
export default class DataStatistics extends Component {
    constructor(props) {
        super(props);
        this.data = React.createRef();
        this.split = React.createRef();
        this.state = {
            split: option,
            audio: config
        }
    }
    componentDidMount() {
        post(URL + '/getAllData', '').then(data => {
            let split = data.split,
                audio = data.audio,
                ADate = this.state.audio,
                SDate = this.state.split
                ;
            audio.map((item, index) => {
                let time = new Date(parseInt(item.upload_time)).toDateString()
                if (!ADate.xAxis.data.includes(time)) {
                    ADate.xAxis.data.push(time);
                    ADate.series.data.push(1);
                } else {
                    ADate.series.data[ADate.xAxis.data.indexOf(time)]++;
                }
                console.log(time);
                if (index === audio.length - 1) {
                    console.log(ADate)
                    this.setState({
                        audio: ADate
                    });
                }
            });
            split.map((item, index) => {
                let time = new Date(parseInt(item.upload_time)).toDateString()
                if (!SDate.xAxis.data.includes(time)) {
                    SDate.xAxis.data.push(time);
                    SDate.series.data.push(1);
                } else {
                    SDate.series.data[SDate.xAxis.data.indexOf(time)]++;
                }
                if (index === audio.length - 1) {
                    this.setState({
                        split: SDate
                    })
                }
            })
        })
    }
    render() {
        return (
            <div className={styles.container}>
                <ReactEcharts
                    option={this.state.split}
                    notMerge={false}
                    lazyUpdate={true}
                    style={{
                        height: '50%',
                        widht: '80%'
                    }}
                    ref={this.split}
                />
                <ReactEcharts
                    option={this.state.audio}
                    notMerge={false}
                    lazyUpdate={true}
                    style={{
                        height: '50%',
                        widht: '80%'
                    }}
                    ref={this.data}
                />
            </div>
        )
    }
}