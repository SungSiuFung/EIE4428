const parts = [];
let mediaRecorder;
var Stream = document.getElementById("video-preview");
var banner = document.getElementById("banner");

document.getElementById("startRecord").onclick = function () {
    document.getElementById("startRecord").disabled = true;
    document.getElementById("stopRecord").disabled = false;
    banner.style.backgroundColor = "red";
    mediaRecorder = new MediaRecorder(Stream.captureStream(25))
    mediaRecorder.start(1000);
    mediaRecorder.ondataavailable = function (e) {
        parts.push(e.data);
    }
}

document.getElementById("stopRecord").onclick = function () {
    document.getElementById("startRecord").disabled = false;
    document.getElementById("stopRecord").disabled = true;
    banner.style.backgroundColor = "black";
    mediaRecorder.stop();
    const blob = new Blob(parts, {
        type: "video./mp4"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "test.mp4";
    a.click();
}