import React, { Component } from 'react';
import { init } from 'waveform-playlist';
import SplitParams from '../splitParam'
import { getSource, URL } from '../../tools/networker';
import styles from './style.css';
let originPosition = 0, currentPosition = 0;
export default class AudioSplit extends Component {
    constructor(props) {
        super(props);
        const audioCtx = new AudioContext();
        this.container = React.createRef();
        this.audio = React.createRef();
        this.ruler = React.createRef();
        this.state = {
            audioCtx: audioCtx,
            waveform: undefined,
            splitArray: [],
            draged: false,
            audioSrc: ''
        }

    }
    componentDidMount() {
        const audioCtx = this.state.audioCtx;
        const stream = audioCtx.createMediaElementSource(this.audio.current);
        let routeState = this.props.location.state;
        this.addNewSplitParam();
        console.log(routeState);
        if(routeState){
            this.setState({
                audioSrc: URL + '/static/default' + routeState.audio_name+'.wav'
            });
        }
        
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.audioSrc !== this.props.audioSrc) {
            this.container.current.innerHTML = '';

            console.log(this.container.current.innerHTML);
            return true
        }
        return true
    }
    renderFream = () => {

        const waveform = init({
            ac: this.state.audioCtx,
            container: this.container.current,
            sampleRate: this.state.audioCtx.sampleRate,
            samplesPerPixel: 4096,
            zoomLevels: [512, 1024, 2048, 4096],
            mono: true,
            waveHeight: 180,
            state: 'cursor',
            timescale: true,
            colors: {
                waveOutlineColor: 'grey',
                timeColor: 'black',
                fadeColor: 'black'
            },
            controls: {
                show: false
            },
        });
        waveform.load([
            {
                src: this.props.audioSrc,
                name: 'Vocals',
                gain: 0.5,
                waveOutlineColor: '#83d0f2',
                states: {
                    cursor: true,
                    fadein: true,
                    fadeout: true,
                    select: true,
                    shift: true,
                },
            }
        ]);
        document.querySelector('.playlist-time-scale').style.height = '29px';
    }
    initDrag = e => {
        originPosition = e.clientX - currentPosition;
        e.dataTransfer.effectAllowed = "move";
    }
    getPosition = (e) => {
        let target = e.target;
        let temp = e.pageX;
        console.log(temp)
        if (target.offsetLeft >= this.container.current.clientWidth) {
            return;
        }
        if (e.pageX === 0) {
            return;
        }
        if (!this.state.draged) {
            target.style.left = temp - originPosition + 'px';
            currentPosition = temp - originPosition;
        } else {
            target.style.left = currentPosition + 'px';
            this.setState({
                draged: false
            })
        }
    }
    setEndPosition = e => {
        console.log('end' + currentPosition)
        e.target.style.left = currentPosition + 'px';
        this.setState({
            draged: true
        })
    }
    addNewSplitParam = () => {
        let split = this.state.splitArray.concat(), index = Date.now();
        split.push({
            element: <SplitParams index={index} key={index} add={this.addNewSplitParam} remove={this.removeParams} />,
            index: index
        })
        this.setState({
            splitArray: split
        })
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.audioViewer}>
                    <div style={{ position: 'relative', width: '100%', height: '35%' }} >
                        <div style={{ minWidth: '100%', height: '100%', maxWidth: 'auto' }} ref={this.container} ></div>
                        <div onDragStart={this.initDrag} onDragEnd={this.setEndPosition} draggable="true" onDrag={this.getPosition} style={{
                            position: 'absolute',
                            width: '1px',
                            height: '100%',
                            top: '0px',
                            left: '0px',
                            backgroundColor: 'red',
                            zIndex: 100
                        }} ref={this.ruler}></div>
                    </div>
                    <div>
                        <audio controls src='http://112.74.165.209:5000/static/default/Rabpit.mp3' ref={this.audio} onLoadedMetadata={this.renderFream} crossOrigin="anonymous"></audio>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}