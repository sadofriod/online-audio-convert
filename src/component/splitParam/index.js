import React, { Component } from 'react';
import styles from './styles.css';
import { post, URL } from '../../tools/networker';
export default class SplitParams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startHour: '00',
            startMin: '00',
            startSec: '00',
            endHour: '00',
            endMin: '00',
            endSec: '00',
            canSubmit: false
        }
    }
    postCutData = () => {
        let e = this.state;
        if(!this.state.canSubmit){
            alert('Plase change end time');
            return;
        }
        post(URL, JSON.stringify({
            audioId: 9,
            start: e.startHour + ':' + e.startMin + ':' + e.startSec,
            end: e.endHour + ':' + e.endMin + ':' + e.endSec
        }))
    }
    changeTime = (e, flag) => {
        let value = e.target.value;
        if (value > 59 || value < 0) {
            alert('Time format is wrong');
            value = 59;
        }
        if (value < 10) {
            value = '0' + e.target.value;
        }
        this.setState({
            canSubmit:true
        })
        switch (flag) {
            case 'startHour': this.setState({ startHour: value }); break;
            case 'startMin': this.setState({ startMin: value }); break;
            case 'startSec': this.setState({ startSec: value }); break;
            case 'endHour': this.setState({ endHour: value }); break;
            case 'endMin': this.setState({ endMin: value }); break;
            case 'endSec': this.setState({ endSec: value }); break;
            default: throw 'must have type of time'
        }
    }
    render() {
        return (
            <div className={styles.container}>
                <label>开始时间</label>
                <input type="number" value={this.state.startHour} maxLength={2} max={59} min={0} onChange={(e) => this.changeTime(e, 'startHour')} placeholder="hours"></input>
                <span>:</span>
                <input type="number" value={this.state.startMin} maxLength={2} max={59} min={0} onChange={(e) => this.changeTime(e, 'startMin')} placeholder="minutes"></input><span>:</span>
                <input type="number" value={this.state.startSec} maxLength={2} max={59} min={0} placeholder="seconds" onChange={(e) => this.changeTime(e, 'startSec')}></input>
                <span>~</span>
                <label>结束时间</label>
                <input
                    type="number"
                    value={this.state.endHour}
                    maxLength={2} max={59} min={0}
                    placeholder="hours" onChange={(e) => this.changeTime(e, 'endHour')}
                ></input><span>:</span>
                <input value={this.state.endMin} type="number" maxLength={2} max={59} min={0} placeholder="minutes" onChange={(e) => this.changeTime(e, 'endMin')}></input><span>:</span>
                <input type="number" value={this.state.endSec} maxLength={2} max={59} min={0} placeholder="seconds" onChange={(e) => this.changeTime(e, 'endSec')}></input>
                <button title="Start cut" onClick={this.postCutData} style={{ backgroundColor: 'rgb(0, 136, 255)', fontSize: '18px' }}>cut</button>
                <button title="Add a group of split paramters " onClick={this.props.add} style={{ backgroundColor: 'rgb(0, 255, 34)' }}>+</button>
                <button title="Remove a group of split paramters " onClick={()=>this.props.remove(this.props.index)} style={{ backgroundColor: 'rgb(255, 0, 0)' }}>-</button>
            </div>
        )
    }
}