import React, { Component } from 'react';
import { getSource, uploadConevent, URL } from '../../tools/networker';
import styles from './style.css';
import AudioSplit from '../audioSplit/index';
import SplitParams from '../splitParam/index';
import Loading from '../loadingMask'
const exRule = ['audio/mp3', 'audio/wma', 'audio/flac', 'audio/acc', 'audio/mmf', 'audio/amr', 'audio/m4a', 'audio/m4r', 'audio/ogg', 'audio/mp2', 'audio/wav', 'audio/wv'];
let pervKey = [], historyNode = [];
export default class Audio extends Component {
    constructor(props) {
        super(props);
        this.audio = React.createRef();
        this.muiltFileButton = React.createRef();
        this.state = {
            sampleRate: 16000,
            countOfChannel: 1,
            bitdpth: 'pcm_s16be',
            file: undefined,
            fileName: '',
            outputFormat: 'audio/wav',
            fileInformation: [],
            audioSrc: 'http://112.74.165.209:3030/audio_test.mp3',
            muiltConvert: 'disabled',
            autoSplit: true,
            hiddenParamArea: false,
            isLoading:false
        }
    }
    componentDidMount() {

    }
    handlerFile = e => {
        const files = e.target.files
        if (files.length === 0) {
            return;
        }
        if (files.length === 1) {
            const extname = files[0].type;
            if (!exRule.includes(extname)) {
                alert("只能上传音频");
                return;
            }
            this.setState({
                file: files[0],
                fileName: files[0].name,
                muiltConvert: 'disabled'
            })
        } else {
            const data = [...files];
            const nameList = data.map(item => (item.name))
            this.setState({
                file: data,
                fileName: nameList,
                muiltConvert: false
            })
            console.log(nameList)
        }
    }
    submit = () => {
        const fd = new FormData();
        const url = URL + "/uploadConvert";
        this.setState({
            isLoading:true
        })
        fd.append('filename', this.state.fileName)
        fd.append('file', this.state.file)
        fd.append('sampleRate', this.state.sampleRate)
        fd.append('bitdpth', this.state.bitdpth)
        fd.append('countOfChannel', this.state.countOfChannel);
        fd.append('format', this.state.outputFormat)
        uploadConevent(url, fd).then(data => {
            this.setState({
                fileInformation: JSON.parse(data.srcElement.response),
                isLoading:false
            });
        })
    }
    submitMulitpleAudio = () => {
        const fd = new FormData();
        const url = URL + "/mulitpleAudioConvert";
        console.log(this.state.file instanceof Array)
        this.setState({
            isLoading:true
        })
        if (this.state.file instanceof Array) {
            this.state.file.map(item => {
                fd.append('files', item, item.name)
            })
        } else {
            alert('请使用单文件上传功能');
            return;
        }
        fd.append('filename', this.state.fileName)
        fd.append('sampleRate', this.state.sampleRate)
        fd.append('bitdpth', this.state.bitdpth)
        fd.append('countOfChannel', this.state.countOfChannel);
        fd.append('format', this.state.outputFormat)
        uploadConevent(url, fd).then(data => {
            this.setState({
                fileInformation: JSON.parse(data.srcElement.response),
                isLoading:false
            });
            // console.log(JSON.parse(data.srcElement.response));
        })
    }
    removeParams = async (itemKey) => {
        let split = this.state.splitArray.concat();
        let temp = await this.state.splitArray.map((item, index) => {
            if (itemKey === item.index) {
                split.slice(index, index + 1);
            } else {
                return item;
            }
        });
        this.setState({
            splitArray: temp.filter(value => value !== undefined)
        })
    }
    parameterAreaStatus = () => {
        if (this.state.hiddenParamArea) {
            this.setState({
                hiddenParamArea: false
            });
        } else {
            this.setState({
                hiddenParamArea: true
            });
        }
    }
    setParam = (e, key) => {
        let tar = e.target;
        historyNode.push({ key: key, node: e.target });
        if (pervKey.includes(key)) {
            for (let i = 0; i < historyNode.length; i++) {
                if (historyNode[i].key === key) {
                    historyNode[i].node.style.backgroundColor = '';
                    tar.style.backgroundColor = 'rgba(179,179,179,.25)';
                    break;
                }
            }
        } else {
            pervKey.push(key);
            tar.style.backgroundColor = 'rgba(179,179,179,.25)';
        }
        this.setState({
            [key]: tar.getAttribute('data-value')
        });
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.parameterArea} >
                    <header>目标文件参数设定：</header>
                    <div className={styles.parameterItem}>
                        <h3>采样率</h3>
                        <div onClick={e => this.setParam(e, 'sampleRate')} className={styles.buttonGroup}>
                            <div data-value="8000">8000hz</div>
                            <div data-value="16000">16000hz</div>
                            <div data-value="44100">44100hz</div>
                            <div data-value="48000">48000hz</div>
                        </div>
                    </div>
                    <div className={styles.parameterItem}>
                        <label>声道</label>
                        <div onClick={e => this.setParam(e, 'countOfChannel')} className={styles.buttonGroup}>
                            <div data-value="1">1声道</div>
                            <div data-value="2">2声道</div>
                            <div data-value="4">4声道</div>
                            <div data-value="5.1">5.1声道</div>
                        </div>
                    </div>
                    <div className={styles.parameterItem}>
                        <label>存储位深</label>
                        <div onClick={e => this.setParam(e, 'bitdpth')} className={styles.buttonGroup}>
                            <div data-value="pcm_s16">16bit</div>
                            <div data-value="pcm_u8">8bit</div>
                            <div data-value="pcm_s32">32bit</div>
                        </div>
                    </div>
                    <div className={styles.parameterItem}>
                        <label>格式</label>
                        <div onClick={e => this.setParam(e, 'outputFormat')} className={styles.buttonGroup}>

                            {exRule.map((item, index) => (
                                <div data-value={item} key={index}>
                                    {item}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                <div className={styles.menu}>
                    <div>选择文件
                            <input type="file" multiple onChange={e => this.handlerFile(e)} />
                    </div>
                    <button style={{
                        backgroundColor: this.state.muiltConvert ? '' : 'rgba(51,122,183,.8)'
                    }} disabled={this.state.muiltConvert === 'disabled' ? false : 'disabled'} onClick={this.submit}>单转换</button>
                    <button style={{
                        backgroundColor: this.state.muiltConvert ? 'rgba(51,122,183,.8)' : ''
                    }} disabled={this.state.muiltConvert} onClick={this.submitMulitpleAudio}>批量转换</button>
                </div>
                {this.state.isLoading?<Loading message="文件上传中"/>:null}
            </div>
        )
    }
}
