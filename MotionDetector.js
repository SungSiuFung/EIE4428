var MotionDetector = (function() {
    var alpha = 0.5;
    var version = 0;
    var greyScale = false;
  
    var table = document.getElementById('secondtable');
    var canvas = document.getElementById('canvas');
    var canvasFinal = document.getElementById('canvasFinal');
    var video = document.getElementById('video-preview');
    var ctx = canvas.getContext('2d');
    var ctxFinal = canvasFinal.getContext('2d');
    var localStream = null;
    var imgData = null;
    var imgDataPrev = [];

    document.getElementById("MotionDetection").onclick = function () {
        console.log("Hi")
    }
})();