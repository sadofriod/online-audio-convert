const URL = 'http://112.74.165.209:5000'
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
    console.log(obj)
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
        xhr.open('POST', url,true);
        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-type','application/json');
        xhr.send(obj);
        xhr.onreadystatechange = data => {
            if (data.srcElement.status === 200) {
                if (data.srcElement.readyState === 4) {
            console.log(data)
            res(JSON.parse(data.srcElement.response));
                }
            }
        }
    });
}
export {
    getSource, uploadConevent, post, URL 
}