const now = new Date();
var file_Name;
var parts = [];
var mediaRecorder;
var Stream = document.getElementById("video-preview");
var banner = document.getElementById("banner");
var file_format = "video./mp4";

document.getElementById("startRecord").onclick = function () {
    if (document.getElementById('format').value == "mp4") {
        file_format = "video/mp4";
    } else if (document.getElementById('format').value == "webm") {
        file_format = "video/webm";
    } else if (document.getElementById('format').value == "mp3") {
        file_format = "audio/mpeg-3";
    } else if (document.getElementById('format').value == "wav") {
        file_format = "audio/wav";
    } else {
        alert("Something is wrong...");
        return;
    }
    document.getElementById("startRecord").disabled = true;
    document.getElementById("stopRecord").disabled = false;
    document.getElementById('format').disabled = true;
    var year = 1900 + now.getYear();
    var month = now.getMonth();
    var day = now.getDay();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    file_Name = year + "-" + month + "-" + day + "-" + hours + "-" + minutes
    banner.style.backgroundColor = "red";
    parts.length = 0;
    mediaRecorder = new MediaRecorder(Stream.captureStream(25));
    mediaRecorder.start(1000);
    mediaRecorder.ondataavailable = function (e) {
        parts.push(e.data);
    }
}

document.getElementById("stopRecord").onclick = function () {
    document.getElementById("startRecord").disabled = false;
    document.getElementById("stopRecord").disabled = true;
    document.getElementById('format').disabled = false;
    banner.style.backgroundColor = "black";
    mediaRecorder.stop();
    console.log(parts);
    var blob = new Blob(parts, {
            type: file_format
        });
    console.log(blob);
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    console.log(url);
    console.log(a);
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = file_Name + "." + document.getElementById('format').value;
    a.click();
}