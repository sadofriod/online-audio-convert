import React, { Component } from 'react';
import * as cookie from 'react-cookie';
import { instanceOf } from 'prop-types';
import { post } from '../../tools/networker';
import styles from './style.css';
import store from '../../store/index';
import * as action from './action';
class SignIn extends Component {
    static propTypes = {
        cookies: instanceOf(cookie.Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            root: NaN,
            user_id: NaN,
            user_name: ''
        }
    }
    componentDidMount() {
        console.log(this.props.cookies.getAll())
    }
    isLogin = () => {

    }
    hidden = () => {
        store.dispatch({
            type: action.UNLOGIN
        })
    }
    login = () => {
        const cookieOption = {
            expires: new Date(Date.now() + 86400000)
        }
        if (this.state.account === '' || this.state.password === '') {
            alert('账号和密码不能为空');
            return;
        }
        const url = 'http://112.74.165.209:5000/signIn';
        post(url, JSON.stringify({
            password: this.state.password,
            account: this.state.account
        })).then(data => {
            this.hidden();
        })
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.formArea}>
                    <header>
                        Sign In
                    </header>
                    <div className={styles.inputArea}>
                        <input className={styles.input} onChange={e => {
                            console.log(e.target.value)
                            this.setState({
                                account: e.target.value
                            })
                        }} placeholder="account" />
                        <input className={styles.input} type="password" onChange={e => {
                            this.setState({
                                password: e.target.value
                            })
                        }} placeholder="password" />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button onClick={this.login}>Login</button>
                        <button onClick={this.hidden}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default cookie.withCookies(SignIn);