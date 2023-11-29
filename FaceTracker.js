let model;
var video = document.getElementById('video-preview');
var canvasFinal = document.getElementById('canvasFinal');
var ctxFinal = canvasFinal.getContext('2d');
var canvasHeight;
var canvasWidth;
var TrackerintervalId;

document.getElementById("FaceTracking").onclick = async function () {
    if (document.getElementById("FaceTracking").checked) {
        document.getElementById('MotionDetection').disabled = true;
        document.getElementById('FaceTracking').disabled = true;
        model = await blazeface.load();
        TrackerintervalId = window.setInterval(detectFaces, 30);
        document.getElementById('FaceTracking').disabled = false;
        banner.style.backgroundColor = "blue";
    } else {
        document.getElementById('MotionDetection').disabled = false;
        window.clearInterval(TrackerintervalId);
        ctxFinal.clearRect(0, 0, canvasWidth, canvasHeight);
        canvasFinal.width = 0;
        canvasFinal.height = 0;
        banner.style.backgroundColor = "black";
    }
}

const detectFaces = async () => {
    canvasWidth = video.videoWidth;
    canvasHeight = video.videoHeight;
    canvasFinal.width = canvasWidth;
    canvasFinal.height = canvasHeight;
    const prediction = await model.estimateFaces(video, false);
    ctxFinal.drawImage(video, 0, 0);
    prediction.forEach((pred) => {
        ctxFinal.beginPath();
        ctxFinal.lineWidth = "4";
        ctxFinal.strokeStyle = "blue";
        ctxFinal.rect(
            pred.topLeft[0],
            pred.topLeft[1],
            pred.bottomRight[0] - pred.topLeft[0],
            pred.bottomRight[1] - pred.topLeft[1],
        );
        ctxFinal.stroke();
    });
}