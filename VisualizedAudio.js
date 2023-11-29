// Get a reference to the canvas and the audio context
var video = document.getElementById('video-preview');
var Audiocanvas = document.getElementById('audio-visualizer');
var audioCtx;

// Create an analyser node
var analyser;

// Create a buffer to store the audio data
var dataArray;

// Get a reference to the canvas context
var canvasCtx = Audiocanvas.getContext('2d');
var AudioId;

document.getElementById("VisualizeAudio").onclick = function () {
    if (document.getElementById("VisualizeAudio").checked) {
        audioCtx = new AudioContext();
        analyser = audioCtx.createAnalyser();
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        stream = video.srcObject;
        var source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        AudioId = window.setInterval(draw, 30);
    } else {
        window.clearInterval(AudioId);
        canvasCtx.clearRect(0, 0, Audiocanvas.width, Audiocanvas.height);
    }
}

// Function to draw the audio data to the canvas
function draw() {
    // Get the audio data from the analyser
    analyser.getByteTimeDomainData(dataArray);

    // Clear the canvas
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, Audiocanvas.width, Audiocanvas.height);

    // Draw the audio data as a waveform
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    canvasCtx.beginPath();

    var sliceWidth = Audiocanvas.width * 1.0 / analyser.frequencyBinCount;
    var x = 0;

    for(var i = 0; i < analyser.frequencyBinCount; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * Audiocanvas.height/2;

        if(i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    canvasCtx.lineTo(Audiocanvas.width, Audiocanvas.height/2);
    canvasCtx.stroke();
}