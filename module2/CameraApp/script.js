let videoElements = document.querySelectorAll("video");
let recordButton = document.querySelector("#record");
let innerRecord = document.querySelector(".inner-record");
let innerCapture = document.querySelector(".inner-capture");
let capturePhoto = document.querySelector("#capture");
let filters = document.querySelectorAll(".filters");


let recordingState = false;
let constraint = {video:true};
navigator.mediaDevices.getUserMedia(constraint).then(function(mediaStream){
    for(let i=1;i<videoElements.length;i++){
        let videoElement = videoElements[i];
        videoElement.srcObject = mediaStream;
    }
    let videoElement = videoElements[0];
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
        if(document.querySelector(".filter-div")!=null){
            let filterDiv = document.querySelector(".filter-div");
            if( filterDiv.style.backgroundColor != ""){
                let filterW = filterDiv.style.backgroundColor.slice(4,15);
                filterW = `rgba(${filterW}, 0.2)`
                ctx.fillStyle = filterW;
                ctx.fillRect(0,0,canvas.width, canvas.height);
            }
        }
        let a = document.createElement("a");
        a.download = `image${Date.now()}.jpg`;
        a.href = canvas.toDataURL('image/jpg');
        a.click();
        setTimeout(  function(){
            innerCapture.classList.remove("animate-capture");
        },1000);
    });
})
.catch(function(error){
    console.log(error);
});


for(let i=0;i<filters.length;i++){
    let filterOne = filters[i];
    filterOne.addEventListener("click", function(e){
        let currentFilter = e.target.parentElement.style.backgroundColor;
        if(document.querySelector(".filter-div")!=null){
            let filterDiv = document.querySelector(".filter-div");
            if(filterDiv.style.backgroundColor == currentFilter){
                filterDiv.style.backgroundColor = "";
            }else
                filterDiv.style.backgroundColor = currentFilter;
        }else{
            let filterDiv = document.createElement("div");
            filterDiv.classList.add("filter-div");
            filterDiv.style.backgroundColor = currentFilter;
            document.body.append(filterDiv);
        }
    });
}





function downloadFile(object, fileName){
    let aTag = document.createElement("a");
    let filePath = URL.createObjectURL(object);
    aTag.href = filePath;
    aTag.download = fileName;
    aTag.click();   
}