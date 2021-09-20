const express = require("express");
const app = express();
let port = '8080';
app.use(express.json());
app.listen(port, ()=>{
    console.log("Listening at 8080");
});
app.get('/home', (req, res)=>{
    console.log(req.path);
    res.send('This is a HomePage');
})
let users =[{
    name:"Deepak",
    title: "Giri"
}];

app.get('/user', (req, res)=>{
    res.json(users);
});

app.post('/user', (req, res)=>{
   users.push(req.body);
    res.send(users);
});
app.patch('/user', (req, res)=>{
    users.map((obj)=>{
        if(obj.name==req.body.name){
            for(each in req.body){
                obj[each]=req.body[each];
            }
        }
        return obj;
    })
    // console.log(users[0]["name"]);
    res.send(users);
});
