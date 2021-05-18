let a =  "horse riding";
spoon(a);
function spoon(data){
    let b = data.split(" ");
    let temp = b[0].charAt(0);
    b[0] = b[1].charAt(0) + b[0].slice(1);
    b[1] = temp + b[1].slice(1);
    let c = b.join(" ");
    console.log(c);    
}
