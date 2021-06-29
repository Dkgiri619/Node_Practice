let videoElements = document.querySelectorAll("video");
let recordButton = document.querySelector("#record");
let innerRecord = document.querySelector(".inner-record");
let innerCapture = document.querySelector(".inner-capture");
let capturePhoto = document.querySelector("#capture");
let filters = document.querySelectorAll(".filters");
let galleryButton = document.querySelector(".gallery");

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
        saveMediaToDB(videoObject, "video");
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
    capturePhoto.addEventListener("click", capturePhotoFun);
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


function capturePhotoFun(){
    let videoElement = videoElements[0];
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
    
    let mediaObject = canvas.toDataURL('image/jpg');
    saveMediaToDB(mediaObject, "photo");
    setTimeout(  function(){
        innerCapture.classList.remove("animate-capture");
    },1000);
}



function saveMediaToDB(mediaObject, mediaType){
    let txnObject = db.transaction("Media", "readwrite");
    let mediaTable = txnObject.objectStore("Media");
    mediaTable.add({mid: Date.now(), type: mediaType, url:mediaObject });
    
    txnObject.onerror = function(e){
        console.log(e);
    }
}


galleryButton.addEventListener("click", function(){
    let galleryDiv = document.createElement("div");
    galleryDiv.classList.add("gallery-div");
    galleryDiv.innerHTML = `<div class="headline">
    <p class="title">Gallery</p>
    <i class="fas fa-times close"></i>
</div>
<div class="gallery-body"></div>`

    let galleryBody =  galleryDiv.querySelector(".gallery-body");

    let txnObject = db.transaction("Media", "readonly");
    let mediaTable = txnObject.objectStore("Media");
    let cursorObject = mediaTable.openCursor();
    cursorObject.onsuccess = function(e){
        let cursor = cursorObject.result;
        if(cursor){
            let mediaDiv = document.createElement("div");
            mediaDiv.classList.add("media-div");
            let mediaObj = cursor.value;
            if(mediaObj.type=="photo"){
                mediaDiv.innerHTML = `<img src="${mediaObj.url}" class="imgt">
                <div class="functions">
                    <div class="download">Download</div>
                    <div class="delete">Delete</div>
                </div>`;
            }
            else {
                mediaDiv.innerHTML = `<video controls autoplay loop src="${URL.createObjectURL(mediaObj.url)}" class="mediaVideo"></video>
                <div class="functions">
                    <div class="download">Download</div>
                    <div class="delete">Delete</div>
                </div>`;
            }
            let deleteButn = mediaDiv.querySelector(".delete");
            deleteButn.addEventListener("click", function(){
                txnObject = db.transaction("Media", "readwrite");
                mediaTable = txnObject.objectStore("Media");
                mediaTable.delete(mediaObj.mid);
                mediaDiv.remove();
            });
            let downloadBtn = mediaDiv.querySelector(".download");
            downloadBtn.addEventListener("click", function(){
                downloadMedia(mediaObj);
            });
            galleryBody.append(mediaDiv);
            cursor.continue();
        }
    }
    let closeButton = galleryDiv.querySelector(".close");
    closeButton.addEventListener("click", function(){
        galleryDiv.remove();
    })
    document.body.append(galleryDiv);
});


function downloadMedia(mediaObject){
    let a = document.createElement("a");
    if(mediaObject.type=="photo"){
        a.download = `img${mediaObject.mid}.jpg`;
        a.href = mediaObject.url;
    }else{
        a.download = `img${mediaObject.mid}.mp4`;
        a.href = URL.createObjectURL(mediaObject.url);
    }
    a.click();
}




