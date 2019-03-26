import React, { Component } from 'react';
import Audio from '../audio/index';
import store from '../../store/index';
import SignIn from '../signIn/index';
export default class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }
    componentDidMount() {
        store.subscribe(() => {
            const store = store.getState();
            this.setState({
                isLogin: store.isLogin.status
            })
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.isLogin ? <SignIn /> : null
                }
                <Audio />
            </div>
        )
    }
}