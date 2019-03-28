import React, { Component } from 'react';
import store from '../../store/index';
import * as action from '../signIn/action';
import styles from './styles.css';
export default class AudioList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPageStatus:false
        }
    }
    showLoginPage =()=>{
        store.dispatch({
            type:action.IS_LOGIN
        })
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.userInfo}>
                    <div className={styles.header}>
                        <div>
                            <img/>
                        </div>
                        <div className={styles.loginController}>
                            <button onClick={this.showLoginPage}>登录</button>
                        </div>
                    </div>
                    <div className={styles.userDesc}>test</div>
                </div>
                <div className={styles.listContainer}></div>
            </div>
        )
    }
}