const fs = require("fs");

let f1data = fs.readFileSync("./f1.txt", "utf-8");
let removedSpaces = [];
// this functions is to implement the console cat commant "cat -s f1.txt" which remove the spaces between line
function applySflag(f1data){
    let emptyIncluded = false;
    let splittedData = f1data.split("\r\n");
    for(let i=0;i<splittedData.length;i++){
        if(splittedData[i]=="" && emptyIncluded ==false){
            emptyIncluded=true;
            removedSpaces.push(splittedData[i]);
        }
        else if(splittedData[i]!=""){
            removedSpaces.push(splittedData[i]);
            if(i<splittedData.length-2) emptyIncluded=false;
        }
    }
    let finalSstring = removedSpaces.join("\r\n");
    console.log(finalSstring);
//    console.log(removedSpaces);
}
// function to apply "cat -b f1.txt"
function applyBflag(f1data){
    let splittedData= f1data.split("\r\n");
    let count =1;
    for(let i=0;i<splittedData.length;i++){
        if(splittedData[i]!=""){
            splittedData[i]=`${count}. ${splittedData[i]}`;
            count++;
        }
    }
    let finalSstring = splittedData.join("\n");
    console.log(finalSstring);
}
// function for n option "cat -n f1.txt"
function applyNflag(f1data){
    let splittedData= f1data.split("\r\n");
    let count =1;
    for(let i=0;i<splittedData.length;i++){
        splittedData[i]=`${count}. ${splittedData[i]}`;
        count++;
        
    }
    let finalSstring = splittedData.join("\r\n");
    console.log(finalSstring);
}

// applySflag(f1data);
// applyBflag(f1data);
applyNflag(f1data);