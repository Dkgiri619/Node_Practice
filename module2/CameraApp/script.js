let videoElement = document.querySelector("video");
let recordButton = document.querySelector("#record");
let innerRecord = document.querySelector(".inner-record");
let innerCapture = document.querySelector(".inner-capture");
let recordingState = false;
let capturePhoto = document.querySelector("#capture");

let constraint = {video:true};
navigator.mediaDevices.getUserMedia(constraint).then(function(mediaStream){
    videoElement.srcObject = mediaStream;
    let mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.onstart = function(){};
    mediaRecorder.ondataavailable = function(e){
        let videoObject = new Blob([e.data], {type: "video/mp4"});
        downloadFile(videoObject, 'video.mp4');
    };
    mediaRecorder.onstop = function(){};
    recordButton.addEventListener("click", function(){

        if(recordingState){
            mediaRecorder.stop();
            recordingState = false;
            innerRecord.classList.remove("on-record");
            innerRecord.classList.remove("animate-record");
        }else{
            mediaRecorder.start();
            recordingState = true;
            innerRecord.classList.add("animate-record");
            innerRecord.classList.add("on-record");
        }
    });
    capturePhoto.addEventListener("click", function(){
        innerCapture.classList.add("animate-capture");
        let canvas = document.createElement("canvas");
        canvas.width = 640; //video width
        canvas.height = 480; // video height
    
        let ctx = canvas.getContext("2d");
    
        ctx.drawImage(videoElement, 0, 0);
        let a = document.createElement("a");
        a.download = `image${Date.now()}.jpg`;
        a.href = canvas.toDataURL('image/jpg');
        a.click();
        setTimeout(  function(){
            innerCapture.classList.remove("animate-capture");
        },1000);
    })
})
.catch(function(error){
    console.log(error);
});





function downloadFile(object, fileName){
    let aTag = document.createElement("a");
    let filePath = URL.createObjectURL(object);
    aTag.href = filePath;
    aTag.download = fileName;
    aTag.click();   
}