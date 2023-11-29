window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

var alpha = 0.5;
var version = 0;
var greyScale = false;

var canvas = document.getElementById('canvas');
var canvasFinal = document.getElementById('canvasFinal');
var video = document.getElementById('video-preview');
var ctx = canvas.getContext('2d');
var ctxFinal = canvasFinal.getContext('2d');
var localStream = null;
var imgData = null;
var imgDataPrev = [];
var canvasHeight;
var canvasWidth;
var MotionDetectionintervalId;

document.getElementById("MotionDetection").onclick = function () {
    if (document.getElementById("MotionDetection").checked) {
        document.getElementById('FaceTracking').disabled = true;
        MotionDetectionintervalId = window.setInterval(showDetection, 30);
        banner.style.backgroundColor = "grey";
    } else {
        document.getElementById('FaceTracking').disabled = false;
        window.clearInterval(MotionDetectionintervalId);
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctxFinal.clearRect(0, 0, canvasWidth, canvasHeight);
        canvas.width = 0;
        canvas.height = 0;
        canvasFinal.width = 0;
        canvasFinal.height = 0;
        banner.style.backgroundColor = "black";
    }
}

function showDetection() {
    canvasWidth = video.videoWidth;
    canvasHeight = video.videoHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvasFinal.width = canvasWidth;
    canvasFinal.height = canvasHeight;
    ctx.drawImage(video, 0, 0);

    // Must capture image data in new instance as it is a live reference.
    // Use alternative live referneces to prevent messed up data.
    imgDataPrev[version] = ctx.getImageData(0, 0, canvas.width, canvas.height);
    version = (version == 0) ? 1 : 0;

    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var length = imgData.data.length;
    var x = 0;
    while (x < length) {
        if (!greyScale) {
            // Alpha blending formula: out = (alpha * new) + (1 - alpha) * old.
            imgData.data[x] = alpha * (255 - imgData.data[x]) + ((1-alpha) * imgDataPrev[version].data[x]);
            imgData.data[x + 1] = alpha * (255 - imgData.data[x+1]) + ((1-alpha) * imgDataPrev[version].data[x + 1]);
            imgData.data[x + 2] = alpha * (255 - imgData.data[x+2]) + ((1-alpha) * imgDataPrev[version].data[x + 2]);
            imgData.data[x + 3] = 255;
        } else {
            // GreyScale.
            var av = (imgData.data[x] + imgData.data[x + 1] + imgData.data[x + 2]) / 3;
            var av2 = (imgDataPrev[version].data[x] + imgDataPrev[version].data[x + 1] + imgDataPrev[version].data[x + 2]) / 3;
            var blended = alpha * (255 - av) + ((1-alpha) * av2);
            imgData.data[x] = blended;
            imgData.data[x + 1] = blended;
            imgData.data[x + 2] = blended;
            imgData.data[x + 3] = 255;
        }
        x += 4; 
    }
    ctxFinal.putImageData(imgData, 0, 0);
}