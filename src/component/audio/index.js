import React, { Component } from 'react';
import { getSource, uploadConevent } from '../../tools/networker';
const exRule = ['audio/mp3', 'audio/wma', 'audio/flac', 'audio/acc', 'audio/mmf', 'audio/amr', 'audio/m4a', 'audio/m4r', 'audio/ogg', 'audio/mp2', 'audio/wav', 'audio/wv'];
export default class Audio extends Component {
    constructor(props) {
        super(props);
        this.audio = React.createRef();
        this.state = {
            sampleRate: 16000,
            countOfChannel: 1,
            bitdpth: 'pcm_s16',
            file: undefined,
            fileName: '',
            outputFormat: '',
            fileInformation: [],
        }
    }
    componentDidMount() { }
    handlerFile = e => {
        const extname = e.target.files[0].type;
        if (!exRule.includes(extname)) {
            alert("只能上传音频");
            return;
        }
        console.log(e.target.files)
        this.setState({
            file: e.target.files[0],
            fileName: e.target.files[0].name
        })
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
    render() {
        return (
            <div>
                <div>
                    <div>
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
                    <div>
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
                    <div>
                        <label>bitdpth</label>
                        <select onChange={data => {
                            this.setState({
                                bitdpth: data.target.value
                            })
                        }}>
                            <option value="pcm_s16">16bit</option>
                            <option value="pcm_u8">8bit</option>
                            <option value="pcm_s32">32bit</option>
                        </select>
                    </div>
                    <div>
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
                    <input type="file" onChange={e => this.handlerFile(e)} />
                    <button onClick={this.submit}>submit</button>
                    <div>
                        {
                            this.state.fileInformation.map((item, index) => (
                                index > 1 ? <p key={index}>{item}</p> : ''
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}