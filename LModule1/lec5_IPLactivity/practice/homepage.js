const cheerio = require("cheerio")
const request = require("request")
const getAllmatcheslink = require("./allmatches");
const matchlink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595"


request(matchlink, function(err, res, data){
    processData(data);
})

function processData(data){
    let myDocument = cheerio.load(data);
    let atag = myDocument(".widget-items.cta-link a");
    let allmatcheslink = "https://www.espncricinfo.com" + atag[0].attribs.href;
    getAllmatcheslink(allmatcheslink);
}