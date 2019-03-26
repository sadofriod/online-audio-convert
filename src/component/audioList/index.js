import React, { Component } from 'react';
import store from '../../store/index';
import * as action from '../signIn/action';
import styles from './styles';
export default class AudioList extends Component {
    constructor(props) {
        super(props);
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
                            <button></button>
                        </div>
                    </div>
                    <div className={styles.userDesc}></div>
                </div>
                <div className={styles.listContainer}></div>
            </div>
        )
    }
}