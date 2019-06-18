import React, { Component } from 'react';
import { init } from 'waveform-playlist';
import EventEmitter from 'event-emitter';
import SplitParams from '../splitParam'
import { getSource, URL } from '../../tools/networker';
import styles from './style.css';
import store from '../../store/index';
import Loading from '../loadingMask'
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
            audioSrc: URL + '/static/default/Rabpit.mp3',
            store: undefined,
            isLoading: false,
            percent: 0
        }

    }
    componentDidMount() {
        const audioCtx = this.state.audioCtx;
        let routeState = this.props.location.state;
        this.addNewSplitParam();
        if (routeState) {
            this.setState({
                audioSrc: URL + '/static/default' + routeState.audio_name + '.wav'
            });
        }
        const unsubscribe = store.subscribe(() => {
            let state = store.getState();
            if ('url' in state.changeUrl) {
                console.log(state.changeUrl);
                this.setState({
                    audioSrc: state.changeUrl.url,
                });
            }
        });
        this.setState({
            store: unsubscribe
        })
    }
    componentWillUnmount() {
        // this.state.store.unsubscribe()
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
        }, EventEmitter());
        waveform.load([
            {
                src: this.state.audioSrc,
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
        let wge = waveform.getEventEmitter();
        wge.on('loadprogress', percent => {
            this.setState({
                isLoading: true,
                percent: parseInt(percent)
            });
            if (parseInt(percent) > 99) {
                this.setState({
                    isLoading: false
                })
            }
        })
        document.querySelector('.playlist-time-scale').style.height = '29px';
    }
    initDrag = e => {
        originPosition = e.clientX - currentPosition;
        e.dataTransfer.effectAllowed = "move";
    }
    getPosition = (e) => {
        let target = e.target;
        let temp = e.pageX;
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
                        <audio controls src={this.state.audioSrc} ref={this.audio} onLoadedMetadata={this.renderFream} crossOrigin="anonymous"></audio>
                    </div>
                    <div>
                        {/* <SplitParams add={this.addNewSplitParam}/> */}
                        {this.state.splitArray.map(item => (item.element))}
                    </div>
                    {this.state.isLoading ? <Loading message={"音频文件加载了" + this.state.percent + "%"} /> : null}
                </div>
            </div>
        )
    }
}