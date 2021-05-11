const fs = require("fs");
const cheerio = require("cheerio");
const request = require("request");
let matchlink = ""

request(matchlink, function(error, response, data){
    getHighSix(data);
})

function getHighSix(data){
    let myDocument
}