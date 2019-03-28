import React, { Component } from 'react';
import Audio from '../audio/index';
import store from '../../store/index';
import SignIn from '../signIn/index';
import AudioList from '../audioList/index';
export default class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }
    componentDidMount() {
        store.subscribe(() => {
            const data =store.getState().isLogin;
            this.setState({
                isLogin: data.status
            })
        })
    }
    render() {
        return (
            <div style={{ display: 'flex' }}>
                <AudioList />
                {
                    this.state.isLogin ? <SignIn /> : null
                }
                <Audio />
            </div>
        )
    }
}