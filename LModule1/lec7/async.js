const fs =  require("fs");
console.log("introduce yourself");



fs.readFile("./f1.txt",function(err, data){
    console.log(data+"");
    fs.readFile("./f2.txt",function(err, data){
        console.log(data+"");
        fs.readFile("./f3.txt",function(err, data){
            console.log(data+"");
        })
    })
    
})

console.log("end");