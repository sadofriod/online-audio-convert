import React, { Component } from 'react';
import { getSource, uploadConevent } from '../../tools/networker';
import styles from './style.css';
const exRule = ['audio/mp3', 'audio/wma', 'audio/flac', 'audio/acc', 'audio/mmf', 'audio/amr', 'audio/m4a', 'audio/m4r', 'audio/ogg', 'audio/mp2', 'audio/wav', 'audio/wv'];
export default class Audio extends Component {
    constructor(props) {
        super(props);
        this.audio = React.createRef();
        this.state = {
            sampleRate: 16000,
            countOfChannel: 1,
            bitdpth: 'pcm_s16be',
            file: undefined,
            fileName: '',
            outputFormat: 'audio/wav',
            fileInformation: [],
        }
    }
    componentDidMount() { }
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
                fileName: files[0].name
            })
        } else {
            const data = [...files];
            const nameList = data.map(item => (item.name))
            this.setState({
                file: data,
                fileName: nameList
            })
            console.log(nameList)
        }
    }
    submit = () => {
        const fd = new FormData();
        const url = "http://112.74.165.209:5000/uploadConvert";
        fd.append('filename', this.state.fileName)
        fd.append('file', this.state.file)
        fd.append('sampleRate', this.state.sampleRate)
        fd.append('bitdpth', this.state.bitdpth)
        fd.append('countOfChannel', this.state.countOfChannel);
        fd.append('format', this.state.outputFormat)
        uploadConevent(url, fd).then(data => {
            this.setState({
                fileInformation: JSON.parse(data.srcElement.response).stderr
            });
        })
    }
    submitMulitpleAudio = () => {
        const fd = new FormData();
        const url = "http://112.74.165.209:5000/mulitpleAudioConvert";
        console.log(this.state.file instanceof Array)
        if (this.state.file instanceof Array) {
            this.state.file.map(item => {
                fd.append('files', item, item.name)
            })
        }else{
            alert('请使用单文件上传功能');
            return;
        }
        fd.append('filename', this.state.fileName)
        fd.append('sampleRate', this.state.sampleRate)
        fd.append('bitdpth', this.state.bitdpth)
        fd.append('countOfChannel', this.state.countOfChannel);
        fd.append('format', this.state.outputFormat)
        uploadConevent(url, fd).then(data => {
            // this.setState({
            //     fileInformation: JSON.parse(data.srcElement.response)
            // });
            console.log(JSON.parse(data.srcElement.response));
        })
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.parameterArea}>
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
                    <div className={styles.parameterItem}>
                        <div>单文件上传</div>
                        <input type="file" onChange={e => this.handlerFile(e)} />
                        <button onClick={this.submit}>submit</button>
                    </div>
                    <div className={styles.parameterItem}>
                        <div>多文件上传</div>
                        <input type="file" multiple placeholder="多文件上传" onChange={e => this.handlerFile(e)} />
                        <button onClick={this.submitMulitpleAudio}>submit</button>
                    </div>
                </div>
                <div className={styles.fileInformation}>
                    {
                        this.state.fileInformation.length ?
                            this.state.fileInformation.map((item, index) => (
                                index > 1 ? <p key={index}>{item}</p> : ''
                            )) : <p>暂无音频文件信息数据</p>
                    }
                </div>
            </div>
        )
    }
}