// // program to read in sync

const fs =  require("fs");

// let f1 = fs.promises.readFile("./f1.txt");
// f1.then(function(data){
//     console.log(data+"");
//     let f2 = fs.promises.readFile("./f2.txt");
//     f2.then(function(data){
//        console.log(data+"");
//        let f3 = fs.promises.readFile("./f3.txt");
//        f3.then(function(data){
//            console.log(data+"");
//        }) 
//     });
// });

// let file = ["./f1.txt", "./f2.txt", "f3.txt"];
// Readfile(0);
// function Readfile(dir){
//     let fPromises= fs.promises.readFile(file[dir]);
//     fPromises.then(function (data){
//         console.log(data+"");
//         if(dir+1<file.length)
//             Readfile(dir+1);
//     });
// }


// promises chaining along with bypass

let f1KaPromise = fs.promises.readFile("f1.txt");

f1KaPromise.then(function(f1KaData){
    console.log(f1KaData+"");
    let f2KaPromise = fs.promises.readFile("./f2.txt");
    return f2KaPromise;
})
.then(function(f2KaData){
    console.log(f2KaData+"");
    let f3KaPromise = fs.promises.readFile("./f3.txt");
    return f3KaPromise;
})
.then(function(f3KaData){
    console.log(f3KaData+"");
})
