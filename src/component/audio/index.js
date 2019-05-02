import React, { Component } from 'react';
import { getSource, uploadConevent } from '../../tools/networker';
import styles from './style.css';
import AudioSplit from '../audioSplit/index';
import SplitParams from '../splitParam/index'
const exRule = ['audio/mp3', 'audio/wma', 'audio/flac', 'audio/acc', 'audio/mmf', 'audio/amr', 'audio/m4a', 'audio/m4r', 'audio/ogg', 'audio/mp2', 'audio/wav', 'audio/wv'];
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
            splitArray: [],
            muiltConvert: 'disabled',
            autoSplit: true,
            hiddenParamArea:false
        }
    }
    componentDidMount() {
        this.addNewSplitParam();
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
        const url = window.location.origin + "/uploadConvert";
        fd.append('filename', this.state.fileName)
        fd.append('file', this.state.file)
        fd.append('sampleRate', this.state.sampleRate)
        fd.append('bitdpth', this.state.bitdpth)
        fd.append('countOfChannel', this.state.countOfChannel);
        fd.append('format', this.state.outputFormat)
        uploadConevent(url, fd).then(data => {
            this.setState({
                fileInformation: JSON.parse(data.srcElement.response)
            });
        })
    }
    submitMulitpleAudio = () => {
        const fd = new FormData();
        const url = window.location.origin + "/mulitpleAudioConvert";
        console.log(this.state.file instanceof Array)
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
                fileInformation: JSON.parse(data.srcElement.response)
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
    parameterAreaStatus = () =>{
        if(this.state.hiddenParamArea){
            this.setState({
                hiddenParamArea:false
            });
        }else{
            this.setState({
                hiddenParamArea:true
            });
        }  
    }
    render() {
        return (
            <div className={styles.container}>
                <div style={this.state.hiddenParamArea?{display:'none'}:{}} className={styles.parameterArea} >
                    <header>Target file parameter setting：</header>
                    <div className={styles.parameterItem}>
                        <label>Sample Rate</label>
                        <select onChange={data => {
                            this.setState({
                                sampleRate: data.target.value
                            })
                        }}>
                            <option value="8000" >8000hz </option>
                            <option value="16000">16000hz</option>
                            <option value="44100">44100hz</option>
                            <option value="48000">48000zh</option>
                        </select>
                    </div>
                    <div className={styles.parameterItem}>
                        <label>Count Of Channel</label>
                        <select onChange={data => {
                            this.setState({
                                countOfChannel: data.target.value
                            })
                        }}>
                            <option value="1" >1 </option>
                            <option value="2">2 </option>
                            <option value="4">4 </option>
                            <option value="5.1">5.1</option>
                        </select>
                    </div>
                    <div className={styles.parameterItem}>
                        <label>bitdpth</label>
                        <select onChange={data => {
                            this.setState({
                                bitdpth: data.target.value
                            })
                        }}>
                            <option value="pcm_s16be">16bit</option>
                            <option value="pcm_u8">8bit</option>
                            <option value="pcm_s32be">32bit</option>
                        </select>
                    </div>
                    <div className={styles.parameterItem}>
                        <label>Format</label>
                        <select onChange={data => {
                            this.setState({
                                outputFormat: data.target.value
                            })
                        }}>
                            {exRule.map((item, index) => (
                                <option value={item} key={index}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={styles.menu}>
                    <div>选择文件
                            <input type="file" multiple onChange={e => this.handlerFile(e)} />
                    </div>
                    <button style={{
                        backgroundColor:this.state.muiltConvert?'':'rgba(51,122,183,.8)'
                    }} disabled={this.state.muiltConvert === 'disabled' ? false : 'disabled'} onClick={this.submit}>单文件转换</button>
                    <button style={{
                        backgroundColor:this.state.muiltConvert?'rgba(51,122,183,.8)':''
                    }} disabled={this.state.muiltConvert} onClick={this.submitMulitpleAudio}>多文件转换</button>
                    <button onClick={() => this.setState({ autoSplit: true })}>自动切割</button>
                    <button onClick={() => this.setState({ autoSplit: false })}>手动切割</button>
                    <button onClick={this.parameterAreaStatus}>
                        {this.state.hiddenParamArea?'展开参数设置':'收起参数设置'}
                    </button>
                </div>
                <div
                    // onClick={
                    //     ()=>this.setState({
                    //     audioSrc: 'http://112.74.165.209:5000/static/default/Ace组合-楚地无歌.mp3'
                    // })} 
                    className={styles.fileInformation}>
                    {this.state.autoSplit ? <div>
                        {
                            this.state.fileInformation instanceof Array ?
                                this.state.fileInformation.map((item, index) => (
                                    index > 1 ? <p key={index}>{item}</p> : ''
                                )) : <p>{this.state.fileInformation.descripiton}</p>
                        }
                    </div> :
                        <div style={{ height: '100%', width: '100%' }}>
                            <AudioSplit audioSrc={this.state.audioSrc} />
                            <div className={styles.splitParamsArea}>
                                {this.state.splitArray.map(item => (item.element))}
                            </div>
                        </div>}

                </div>
            </div>
        )
    }
}
