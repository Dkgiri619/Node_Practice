let fs = require("fs");

let contents = process.argv.slice(2);

const flag =[];
const files = [];

// function to apply "cat -s f1.txt"
let data = [];
function applySflag(f1data){
    let emptyIncluded = false;
    let splittedData = f1data.split("\r\n");
    for(let i=0;i<splittedData.length;i++){
        if(splittedData[i]=="" && emptyIncluded ==false){
            emptyIncluded=true;
            data.push(splittedData[i]);
        }
        else if(splittedData[i]!=""){
            data.push(splittedData[i]);
            if(i<splittedData.length-2) emptyIncluded=false;
        }
    }
    let finalSstring = data.join("\r\n");
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
for(let i=0;i<contents.length;i++){
    if(contents[i].startsWith("-"))flag.push(contents[i])
    else {
        if(!fs.existsSync(contents[i])){
            console.log("File does not exists");
        }
        files.push(fs.readFileSync(contents[i], 'utf-8'));
    }
}

