import React, { Component } from 'react';
import store from '../../store/index';
import { changeUrl } from './action';
import { post, URL } from '../../tools/networker';
import styles from './styles.css';
import * as cookie from 'react-cookie';
import { instanceOf } from 'prop-types';
import { isLogin } from '../../tools/tools';
import { withRouter } from 'react-router-dom';
class AudioList extends Component {
    static propTypes = {
        cookies: instanceOf(cookie.Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            loginPageStatus: false,
            listData: [],
            isLogin: false
        }
    }
    componentDidMount() {
        post(URL + '/getAudioList', JSON.stringify({ user_id: 1 })).then(data => {
            this.setState({
                listData: data.result
            })
        });
        this.setState({
            isLogin: isLogin()
        });
    }
    listItem = (item, index) => (
        <div key={index} className={styles.listItem}>
            <div className={styles.audioName}>名称: {item.audio_name}</div>
            <div className={styles.controller}>
                <div>
                    <div className={styles.playButton}>
                        <img src={require('../../assets/play.png')} />
                    </div>
                </div>
                <div onClick={() => {
                    this.props.history.push({
                        pathname: '/main/autoSplit',
                        state: item
                    })
                }} style={{ cursor: 'pointer' }}>自动切割</div>
                <div onClick={() => {
                    this.props.history.push({
                        pathname: '/main/manualSplit',
                        state: item
                    });
                    console.log(store)
                    store.dispatch(changeUrl({
                        url:URL + '/static/default' + item.audio_name + '.wav'
                    }))
                }} style={{ cursor: 'pointer' }}>手动切割</div>
            </div>
            <div className={styles.audioPath}>
                <a href={URL + '/static/default' + item.audio_name + '.wav'} download='Get convert result'>
                    Download
                </a>
            </div>
        </div>
    )
    renderListItem = (data) => {
        return data.map((item, index) => this.listItem(item, index))
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.listContainer}>
                    {this.renderListItem(this.state.listData)}
                </div>
                <audio crossOrigin="true"></audio>
            </div>
        )
    }
}
export default cookie.withCookies(withRouter(AudioList));
