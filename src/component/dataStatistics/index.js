import React, { Component } from 'react';
import { post, URL } from '../../tools/networker';
import styles from './styles.css';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import ReactEcharts from 'echarts-for-react';
import { config } from './config';
export default class DataStatistics extends Component {
    constructor(props) {
        super(props);
        this.data = React.createRef();
        this.state = {

        }
    }
    componentDidMount() {

        // post(URL+'/getDataStatistics',{});
    }
    render() {
        return (
            <div className={styles.container}>
                <ReactEcharts
                    option={config}
                    notMerge={true}
                    lazyUpdate={true}
                    style={
                        { height: '80%' }
                    }
                />
            </div>
        )
    }
}