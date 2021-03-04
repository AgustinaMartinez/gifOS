const getMedia = async () => {
    const config = {
        video: {
            height: {max: 480}
        }, audio: false
    }

    let stream = null

    try{
        stream = await navigator.mediaDevices.getUserMedia(config)
        return stream
    } catch(err){
        return 'Sin permisos para la cámara'
    }
}

const startCameraRecording = async (recorder, $videoContainer) => {
    //Requests streaming data of the camera
    let stream = await getMedia();
    
    $videoContainer.srcObject = stream;
    $videoContainer.play();

    const recorderConfig = {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        height: 434,
        hidden: 240,
        onGifRecordingStarted: function() {
        console.log('started')
        }
    }

    //RTCRecorder library
    recorder = new RecordRTCPromisesHandler(stream, recorderConfig);
    recorder.startRecording();
    return recorder;
}

const stopCameraRecording = async (recorder, $videoContainer) => {
    $videoContainer.srcObject = null;
    $videoContainer.pause();
    await recorder.stopRecording();
    let blob = await recorder.getBlob();
    return blob;
}