const fs =  require("fs");
let file = ["./f1.txt", "./f2.txt", "f3.txt"];

let f;
let i=0;
while(f!=undefined){
    fs.readFile(file[i], function(err, data){
        f = data
    })
}