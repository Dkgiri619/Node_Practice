const cheerio = require("cheerio");
const request = require("request");



function getAllmatcheslink(allmatcheslink){
request(allmatcheslink, function(err, res, data){

    processData(data);
})

}


function processData(html){
    let myDocument = cheerio.load(html);
    let allATags = myDocument('a[data-hover="Scorecard"]');
    console.log(allATags.length);
    //    { "0" : {aTag} , ......... "59" : {aTag} };
    for(let i=0 ; i<allATags.length ; i++){
        let matchLink =  "https://www.espncricinfo.com" + myDocument(allATags[i]).attr("href");
        console.log(matchLink);
    }   
}


module.exports = getAllmatcheslink;