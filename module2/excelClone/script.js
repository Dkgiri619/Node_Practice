let cellsContainer = document.querySelector(".cells");


(function intiCell(){
    let cellsContent = `<div class = "top-left-cell"></div>`;

    cellsContent += `<div class = "top-row">`;
    for(let j=0;j<26;j++){
        cellsContent += `<div class="top-row-cell">${String.fromCharCode(65+j)}</div>`;
    }
    cellsContent += `</div>`;

    cellsContent += `<div class = "left-col">`;
    for(let j=0;j<100;j++){
        cellsContent += `<div class="left-col-cell">${j+1}</div>`;
    }
    cellsContent += `</div>`;

    cellsContent += `<div class="all-cell">`
    for(let i=0;i<100;i++){  
        cellsContent += `<div class="row">`;
        for(let j=0;j<26;j++){
            cellsContent += `<div class="cell" contenteditable="true"></div>`
        }
        cellsContent += `</div>`;
    }
    cellsContent += `</div>`;
    cellsContainer.innerHTML = cellsContent;
})();


let topLeftCell = document.querySelector(".top-left-cell");
let leftCol = document.querySelector(".left-col");
let topRow = document.querySelector(".top-row");

cellsContainer.addEventListener("scroll", function(e){
    let topOffset = e.target.scrollTop;
    let leftOffset = e.target.scrollLeft;

    topRow.style.top = topOffset+"px";
    topLeftCell.style.top = topOffset+"px";
    topLeftCell.style.left = leftOffset+"px";
    leftCol.style.left = leftOffset+"px";
});