import InlineWorker from 'inline-worker';

export class Recorder {
    constructor(source,config) {
        let sampleRate = config.sampleRate, numChannels = config.numChannels;
        function interleave(inputL, inputR) {
            let length = inputL.length + inputR.length;
            let result = new Float32Array(length);

            let index = 0,
                inputIndex = 0;

            while (index < length) {
                result[index++] = inputL[inputIndex];
                result[index++] = inputR[inputIndex];
                inputIndex++;
            }
            return result;
        }
        function exportWAV() {
            let buffers = [];
            let audio = config.audio,phase = new Float32Array(source.length) ,mag = new Float32Array(source.length);
            let temp = [];
            let bf = audio.createBiquadFilter();
            bf.frequency.value = 8000;
            bf.type = "lowpass";
            bf.Q.value = 100
            bf.getFrequencyResponse(source,mag,phase);
            console.log(mag,phase,source)
            for(let i = 0;i < phase.length;i++){
                if(mag[i] === 1){
                    temp.push(source[i]+(phase*Math.pow(10,8)))
                }
            }
            console.log(Float32Array.from(temp));
            for (let channel = 0; channel < numChannels; channel++) {
                buffers.push(source);
            }
            let interleaved;
            if (numChannels === 2) {
                interleaved = interleave(buffers[0], buffers[1]);
            } else {
                interleaved = Float32Array.from(temp);
            }
            let dataview = encodeWAV(interleaved);
            let audioBlob = new Blob([dataview], { type: config.type });
            return audioBlob;
        }
        function floatTo16BitPCM(output, offset, input) {
            for (let i = 0; i < input.length; i++ , offset += 1) {
                // let s = Math.max(-1, Math.min(1, input[i]));
                let temp = input[i];
                output.setUint8(offset, (temp*128+128), true);
            }
        }
        function writeString(view, offset, string) {
            console.log(view.byteLength)
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        }

        function encodeWAV(samples) {
            console.log(source.length)
            let buffer = new ArrayBuffer(44 + samples.length );
            let view = new DataView(buffer);
            /* RIFF identifier */
            writeString(view, 0, 'RIFF');
            /* RIFF chunk length */
            view.setUint32(4, 36 + samples.length, true);
            /* RIFF type */
            writeString(view, 8, 'WAVE');
            /* format chunk identifier */
            writeString(view, 12, 'fmt ');
            /* format chunk length */
            view.setUint32(16, 16, true);
            /* sample format (raw) */
            view.setUint16(20, 1, true);
            /* channel count */
            view.setUint16(22, numChannels, true);
            /* sample rate */
            view.setUint32(24, sampleRate, true);
            /* byte rate (sample rate * block align) */
            view.setUint32(28, sampleRate  , true);
            /* block align (channel count * bytes per sample) */
            view.setUint16(32, numChannels , true);
            /* bits per sample */
            view.setUint16(34, 8, true);
            /* data chunk identifier */
            writeString(view, 36, 'data');
            /* data chunk length */
            view.setUint32(40, samples.length , true);

            floatTo16BitPCM(view, 44, samples);
            console.log(view)
            return view;
        }
        return exportWAV()
    }
    
}

export default Recorder;