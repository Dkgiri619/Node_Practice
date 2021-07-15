let cellsContainer = document.querySelector(".cells");
let db;
let address = document.querySelector(".address");
let lastSelect;
let formulaInput = document.querySelector('.formula-bar');

function intiCell() {
    let cellsContent = `<div class = "top-left-cell"></div>`;
    
    cellsContent += `<div class = "top-row">`;
    for (let j = 0; j < 26; j++) {
        cellsContent += `<div class="top-row-cell">${String.fromCharCode(65 + j)}</div>`;
    }
    cellsContent += `</div>`;
    
    cellsContent += `<div class = "left-col">`;
    for (let j = 0; j < 100; j++) {
        cellsContent += `<div class="left-col-cell">${j + 1}</div>`;
    }
    cellsContent += `</div>`;
    
    cellsContent += `<div class="all-cell">`
    for (let i = 0; i < 100; i++) {
        cellsContent += `<div class="row">`;
        for (let j = 0; j < 26; j++) {
            cellsContent += `<div class="cell" contenteditable="true" rowid="${i}" colid="${j}"></div>`;
        }
        cellsContent += `</div>`;
    }
    cellsContent += `</div>`;
    cellsContainer.innerHTML = cellsContent;
}

function initDB() {
    db = [];
    for (let i = 0; i < 100; i++) {
        let row = [];
        for (let j = 0; j < 26; j++) {
            let cellName = String.fromCharCode(65 + j) + (i + 1);
            let cellObject = {
                name: cellName,
                value: "",
                formula: "",
                children: []
            }
            row.push(cellObject);
        }
        db.push(row);
    }
}
intiCell();
initDB();
let topLeftCell = document.querySelector(".top-left-cell");
let leftCol = document.querySelector(".left-col");
let topRow = document.querySelector(".top-row");

cellsContainer.addEventListener("scroll", function (e) {
    let topOffset = e.target.scrollTop;
    let leftOffset = e.target.scrollLeft;

    topRow.style.top = topOffset + "px";
    topLeftCell.style.top = topOffset + "px";
    topLeftCell.style.left = leftOffset + "px";
    leftCol.style.left = leftOffset + "px";
});

formulaInput.addEventListener("blur", function (e) {
    let formula = e.target.textContent;
    if (formula) {
        let cellObj = getCellObjectFromElem(lastSelect);
        let calcValue = getValueFromFormula(formula, cellObj);
        lastSelect.textContent = calcValue;
        cellObj.value = calcValue;
        cellObj.formula = formula;
    }
});

let allCell = document.querySelectorAll(".cell");
for (let i = 0; i < allCell.length; i++) {
    allCell[i].addEventListener("click", function (e) {
        let cellObject = getCellObjectFromElem(e.target);
        address.innerHTML = cellObject.name;
        formulaInput.innerHTML = cellObject.formula;
    });
    allCell[i].addEventListener("blur", function (e) {
        lastSelect = e.target;
        let cellValue = e.target.textContent;
        let cellObj = getCellObjectFromElem(e.target);
        cellObj.value = cellValue;


        updateChildrenValue(cellObj.children);
    });
}


function updateChildrenValue(children) {
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        let childCellObject = getCellObjectFromName(child);
        let updatedValue = getValueFromFormula(childCellObject.formula);
        childCellObject.value = updatedValue;
        let colid = child.charCodeAt(0) - 65;
        let rowid = Number(child.substring(1)) - 1;
        document.querySelector(`div [rowid="${rowid}"][colid="${colid}"]`).textContent = updatedValue;
        updateChildrenValue(childCellObject.children);
    }
}
function getCellObjectFromElem(element) {
    let rowid = element.getAttribute("rowid");
    let colid = element.getAttribute("colid");
    let cellObj = db[rowid][colid];
    return cellObj;
}
function getValueFromFormula(formula, selfCellObj) {
    let formulaComps = formula.split(" ");
    for (let i = 0; i < formulaComps.length; i++) {
        let fComps = formulaComps[i];
        if (fComps[0] >= "A" && fComps[0] <= "Z" || fComps[0] >= "a" && fComps[0] <= "z") {
            let cellObj = getCellObjectFromName(fComps);
            let value = cellObj.value;
            if (selfCellObj) {
                cellObj.children.push(selfCellObj.name);
            }
            formula = formula.replace(fComps, value);
        }
    }
    return eval(formula);
}
function getCellObjectFromName(name) {
    let colid = name.charCodeAt(0) - 65;
    let rowid = Number(name.substring(1)) - 1;
    return db[rowid][colid];
}