// import { get } from "http";
const getSource = (url, audioCtx) => {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
            let audioData = xhr.response;
            audioCtx.decodeAudioData(audioData, (buffer) => {
                res(buffer);
            },
                function (e) { console.log("Error with decoding audio data" + e.err); });

        }
        xhr.send();
    });
}
const uploadConevent = (url, obj) => {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.send(obj);
        xhr.onreadystatechange = data => {
            if (data.srcElement.status === 200) {
                if (data.srcElement.readyState === 4) {
                    res(data);
                }
            }
        }
    });
}
const post = (url, obj) => {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type','application/json');
        xhr.withCredentials = true;
        xhr.send(obj);
        xhr.onreadystatechange = data => {
            if (data.srcElement.status === 200) {
                if (data.srcElement.readyState === 4) {
                    res(data.srcElement);
                }
            }
        }
    });
}
export {
    getSource, uploadConevent, post
}