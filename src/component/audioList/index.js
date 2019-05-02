import React, { Component } from 'react';
import store from '../../store/index';
import * as action from '../signIn/action';
import styles from './styles.css';
export default class AudioList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPageStatus: false,
            listData: [{
                name:'test',
            }]
        }
    }
    showLoginPage = () => {
        store.dispatch({
            type: action.IS_LOGIN
        });
    }
    listItem = (item, index) => (
        <div key={index} className={styles.listItem}>
            <div className={styles.audioName}>audio name: {item.name}</div>
            <div className={styles.controller}>
                <div>
                    <div className={styles.playButton}>
                        <img src={require('../../assets/play.png')}/>
                        {/* <span>|&nbsp;|</span> */}
                    </div>
                </div>
                <div>split item</div>
            </div>
            <div className={styles.audioPath}>
                <a href={'./static/default/' + item.name} download='Get convert result'>
                    {window.location.origin+'/static/default/'+item.name}
                </a>
            </div>
        </div>
    )
    renderListItem = (data) =>{
        return data.map((item,index)=>this.listItem(item,index))
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.userInfo}>
                    <div className={styles.header}>
                        <div className={styles.username}>
                            username
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