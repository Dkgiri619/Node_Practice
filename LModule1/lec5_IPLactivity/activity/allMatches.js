 const cheerio = require("cheerio");
const request = require("request");
const BatsmanData = require("./batsman.js");
// let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
function getAllMatchesLink(matchLink){
    request(matchLink, function(err, res, data){
         process(data);
    })
}

function process(data){
    let myDocument = cheerio.load(data);
    let allink = myDocument('a[data-hover="Scorecard"]');
    for(let i=0;i<allink.length;i++){
        let link = allink[i].attribs.href;
        link = "https://www.espncricinfo.com" + link;
        //console.log(link);
        BatsmanData(link);
    }
}
module.exports = getAllMatchesLink;