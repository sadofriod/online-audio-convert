import React, { Component } from 'react';
import store from '../../store/index';
import { post } from '../../tools/networker';
import * as action from '../signIn/action';
import styles from './styles.css';
import * as cookie from 'react-cookie';
import { instanceOf } from 'prop-types';
import { isLogin } from '../../tools/tools';
class AudioList extends Component {
    static propTypes = {
        cookies: instanceOf(cookie.Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            loginPageStatus: false,
            listData: [{
                name: 'test',
            }],
            isLogin: false
        }
    }
    showLoginPage = () => {
        store.dispatch({
            type: action.IS_LOGIN
        });
    }
    componentDidMount() {
        post('http://112.74.165.209:5000/getAudioList', {}).then(data => {
            alert(data);
            console.log(data);
        });
        this.setState({
            isLogin: isLogin()
        });
        store.subscribe(() => {
            this.setState({
                isLogin: isLogin()
            });
        })
    }
    listItem = (item, index) => (
        <div key={index} className={styles.listItem}>
            <div className={styles.audioName}>audio name: {item.name}</div>
            <div className={styles.controller}>
                <div>
                    <div className={styles.playButton}>
                        <img src={require('../../assets/play.png')} />
                        {/* <span>|&nbsp;|</span> */}
                    </div>
                </div>
                <div>split item</div>
            </div>
            <div className={styles.audioPath}>
                <a href={'./static/default/' + item.name} download='Get convert result'>
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
                <div className={styles.userInfo}>
                    <div className={styles.header}>
                        <div className={styles.username}>
                            {!this.state.isLogin ? this.props.cookies.get('username') : '游客' + Date.now()}
                        </div>
                        <div className={styles.loginController}>
                            <button onClick={this.showLoginPage}>登录</button>
                        </div>
                    </div>
                </div>
                <div className={styles.listContainer}>
                    {this.renderListItem(this.state.listData)}
                </div>
                <audio></audio>
            </div>
        )
    }
}
export default cookie.withCookies(AudioList);
