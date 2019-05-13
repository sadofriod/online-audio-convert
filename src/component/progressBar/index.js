import React, { Component } from 'react';
import Audio from '../audio/index';
import store from '../../store/index';
import SignIn from '../signIn/index';
import AudioList from '../audioList/index';
import styles from './styles.css';
import { Link, Switch, Route } from 'react-router-dom'
import AudioSplit from '../audioSplit';
import DataStatistics from '../dataStatistics';
import SplitTable from '../splitItem';
const linkStyle = {
    textDecoration: 'none', 
    color:'#222'
}
export default class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }
    componentDidMount() {
        store.subscribe(() => {
            const data = store.getState().isLogin;
            this.setState({
                isLogin: data.status
            })
        })
    }
    render() {
        return (
            <div className={styles.container}>
                <AudioList></AudioList>
                <div className={styles.main}>
                    <div className={styles.menuList}>
                        <div>
                            <Link style={linkStyle} to="/main/autoSplit">音频自动切割</Link>
                        </div>
                        <div>
                            <Link style={linkStyle}  to="/main/manualSplit">音频手动切割</Link>
                        </div>
                        <div>
                            <Link style={linkStyle}  to="/main/dataStatistics">数据统计</Link>
                        </div>
                    </div>
                    <div className={styles.controller}>
                        <Switch>
                            <Route component={DataStatistics} path="/main/dataStatistics"></Route>
                            <Route component={SplitTable} path="/main/autoSplit"></Route>
                            <Route component={AudioSplit} path="/main/manualSplit"></Route>
                            {/* <Route component={Audio} path="/main/convert"></Route> */}
                        </Switch>
                    </div>
                </div>
                <Audio></Audio>
            </div>

        )
    }
}