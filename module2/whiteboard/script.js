let canvas = document.querySelector("#canvas");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let ctx = canvas.getContext("2d");
let lineDB = [];
let line = [];
let redoLinesDB = [];
let stickyAdd = document.querySelector("#sticky-icon");
let donwloadCanvas = document.querySelector("#canvas-download");
let penSelect = document.querySelector("#pen");
let eraserSelect = document.querySelector("#eraser");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 100;
  drawLinesDB();
});

let isPendown = false;
canvas.addEventListener("mousedown", function(e){
    let x = e.clientX;
    let y = e.clientY-100;
    ctx.beginPath();
    ctx.moveTo(x,y);
    isPendown = true;
    let lineObject = {
        x:x,
        y:y,
        type:"md"
    };
    line.push(lineObject);
    redoLinesDB=[];
})

canvas.addEventListener("mousemove", function(e){
    if(isPendown){
        let x = e.clientX;
        let y = e.clientY-100;
        ctx.lineTo(x,y);
        ctx.stroke();
        let lineObject = {
            x:x,
            y:y,
            type:"mm"
        };
        line.push(lineObject);
    }
});

canvas.addEventListener("mouseup", function(e){
    isPendown=false;
    lineDB.push(line);
    line=[];
});

undo.addEventListener("click", function(e){
    let redoLines = lineDB.pop();
    redoLinesDB.push(redoLines);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawLinesDB();
});
redo.addEventListener("click", function(e){
    if(redoLinesDB.length){
        let redoLines = redoLinesDB.pop();
        for(let i=0;i<redoLines.length;i++){
           
            let objects = redoLines[i];
            if(objects.type=="md"){
                ctx.beginPath();
                ctx.moveTo(objects.x, objects.y);
            }
            else {
                ctx.lineTo(objects.x, objects.y);
                ctx.stroke();
            }
        }
        lineDB.push(redoLines);
    }
});
function drawLinesDB(){
    for(let i =0;i<lineDB.length;i++){
        let singLine = lineDB[i];
        for(let j=0;j<singLine.length;j++){
            let objects = singLine[j];
            if(objects.type=="md"){
                ctx.beginPath();
                ctx.moveTo(objects.x, objects.y);
            }else {
                ctx.lineTo(objects.x,objects.y);
                ctx.stroke();
            }
        }
    }
}

// sticky add
stickyAdd.addEventListener("click", function(){
     addSticky();
})

function addSticky(imgObject){
    let stickyDiv = document.createElement("div");
    stickyDiv.classList.add("sticky");
    stickyDiv.innerHTML = `<div class="sticky-header">
    <div class="minimize" id="minimize-sticky"></div>
    <div class="close" id="close-sticky"></div>
</div>`;


    //<div class="sticky-content" contenteditable="true"></div>
    let stickyContent;
    if(imgObject){
        let stickyImageDiv = document.createElement("div");
        stickyImageDiv.classList.add("stickyImage");
        stickyImageDiv.append(imgObject);
        stickyDiv.append(stickyImageDiv);
        stickyContent = stickyImageDiv;
    }else{
        stickyContent = document.createElement("div");
        stickyContent.classList.add("sticky-content");
        stickyContent.setAttribute("contenteditable", 'true');
        stickyDiv.append(stickyContent);
    }
    let closeSticky = stickyDiv.querySelector('#close-sticky');

    closeSticky.addEventListener("click", function(e){
        stickyDiv.remove();
    });
    let minimizeSticky = stickyDiv.querySelector("#minimize-sticky");

    minimizeSticky.addEventListener("click", function(){
        stickyContent.style.display == "none" ? stickyContent.style.display = "block" : stickyContent.style.display = "none"; 
    });
    let stickyHold = false;
    let initialX;
    let initialY;
    let stickyHeader = stickyDiv.querySelector(".sticky-header");
    stickyHeader.addEventListener("mousedown", function(e){
        stickyHold=true;
        initialX = e.clientX;
        initialY = e.clientY;
    });
    stickyHeader.addEventListener("mousemove", function(e){
        if(stickyHold){
            let finalX = e.clientX;
            let finalY = e.clientY;
            let dx = finalX - initialX;
            let dy = finalY - initialY;
            let {top , left} = stickyDiv.getBoundingClientRect();

            stickyDiv.style.top=top+dy+"px";
            stickyDiv.style.left=left+dx+"px";
            initialX = finalX;
            initialY = finalY;
        }
    });
    stickyHeader.addEventListener("mouseup", function(e){
        stickyHold = false;
    });

    document.body.append(stickyDiv);
}

// photo upload 
let photoDiv = document.querySelector("#photo-upload");
let photoInput = document.querySelector("#input-file");

photoDiv.addEventListener("click", function(){
    photoInput.click();
})

photoInput.addEventListener("change", function(e){
    let fileObject = e.target.files[0];
    let filePath = URL.createObjectURL(fileObject);
    let img = document.createElement("img");
    img.setAttribute("src", filePath);
    addSticky(img);
})

// canvas download image
donwloadCanvas.addEventListener("click", function(){
    let imagePath = canvas.toDataURL("image/jpg");
    let aTag = document.createElement("a");
    aTag.href = imagePath;
    aTag.download = 'canvas.jpg';
    aTag.click();
})

// pen options
{/* <div class="pen-options">
    <input type="range" name="" id="pen-range">
    <div class="pen-colour red"></div>
    <div class="pen-colour blue"></div>
    <div class="pen-colour green"></div>
    <div class="pen-colour yellow"></div>
    <div class="pen-colour black"></div>
</div> */}
penSelect.addEventListener("click", function(){
    activeTool(penSelect, eraserSelect);
});
eraserSelect.addEventListener("click", function(){
    activeTool(eraserSelect, penSelect);
});

function activeTool(selectTool, hideTool){
    // if selectTool is select
    if(selectTool.classList.contains("active-tools")){
        if(selectTool.children[1].classList.contains("hide")){
            selectTool.children[1].classList.remove("hide");
            hideTool.children[1].classList.add("hide");
        }else{
            selectTool.children[1].classList.add("hide");
        }
        

    }else{
        selectTool.classList.add("active-tools");
        selectTool.classList.remove("fade");
        hideTool.classList.remove("active-tools");
        hideTool.classList.add("fade");
        hideTool.children[1].classList.add("hide");
    }

}