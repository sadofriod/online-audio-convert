import React, { Component } from 'react';
import styles from './styles.css';

export default class LoadingMask extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={styles.container}>
                {this.props.message}
            </div>
        )
    }
}