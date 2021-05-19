//activity to save all the batsman name and people in differernt folder

const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const json2xls = require('json2xls');
function BatsmanData(link){
    request(link, function(err, res, data){
        processData(data);
    })
}

function processData(data){
    let myDocument = cheerio.load(data);
    let twoInnings = myDocument(".Collapsible");
    for(let i=0;i<twoInnings.length;i++){
        let oneInning = myDocument(twoInnings[i]);
        let teamName = oneInning.find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        console.log(teamName);
        console.log(`---------------------------------------------------------------------------`);
        let allTrs = oneInning.find(".table.batsman tbody tr");
        for(let j=0;j<allTrs.length;j++){
            let allTds = myDocument(allTrs[j]).find("td");
            if(allTds.length>1){
                let batsmanName = myDocument(allTds[0]).text().trim();
                let totalRuns =   parseInt(myDocument(allTds[2]).text().trim());
                let totalBalls = parseInt(myDocument(allTds[3]).text().trim());
                let totalFours = parseInt(myDocument(allTds[5]).text().trim());
                let totalSixes = parseInt(myDocument(allTds[6]).text().trim());
                let strikeRate = parseInt(myDocument(allTds[7]).text().trim());
                //console.log(`Name: ${batsmanName}  Total Runs -> ${totalRuns}  Strike Rate -> ${strikeRate}`)
                //processBatsmanFiles(teamName, batsmanName, totalRuns, totalBalls, totalFours, totalSixes, strikeRate);
                leaderBoard(teamName, batsmanName, totalRuns, totalBalls, totalFours, totalSixes, strikeRate);
            }

        }
    }
    
}
// checkteam folder
function checkTeamFolder(teamName){
    let teamFolderPath = `./IPL2020/${teamName}`;
    return fs.existsSync(teamFolderPath);
}
//check batsman file
function checkBatsmanFile(teamName , batsmanName){
    let batsmanFilePath = `./IPL2020/${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanFilePath);
}
//update batsman file
function updateBatsmanFile(teamName, batsmanName, totalRuns, totalBalls, totalFours, totalSixes, strikeRate){
    let batsmanFilePath = `./IPL2020/${teamName}/${batsmanName}.json`;
    let batsmanFile = JSON.parse(fs.readFileSync(batsmanFilePath, "utf-8"));
    let inning = {
        Runs : batsmanFile["Runs"]+totalRuns,
        Balls : batsmanFile["Balls"]+totalBalls,
        Fours :batsmanFile["Fours"]+totalFours,
        Sixes :batsmanFile["Sixes"]+totalSixes,
        StrikeRate :strikeRate
    };
    // let object = {
    //     Runs : totalRuns,
    //     Balls : totalBalls,
    //     Fours : totalFours,
    //     Sixes : totalSixes,
    //     StrikeRate : strikeRate
    // };
    //batsmanFile.push(object);
    //batsmanFile.push(inning);
    fs.writeFileSync(batsmanFilePath, JSON.stringify(inning));
}
//create batsman file
function createBatsmanFile(teamName, batsmanName, totalRuns, totalBalls, totalFours, totalSixes, strikeRate){
    let batsmanFilePath = `./IPL2020/${teamName}/${batsmanName}.json`;
    //let batsmanFile = [];
    let object = {
        Runs : totalRuns,
        Balls : totalBalls,
        Fours : totalFours,
        Sixes : totalSixes,
        StrikeRate : strikeRate
    };
    //batsmanFile.push(object);
    fs.writeFileSync(batsmanFilePath, JSON.stringify(object));
}

//create team folder
function createTeamFolder(teamName){
    let teamFolderPath = `./IPL2020/${teamName}`;
    fs.mkdirSync(teamFolderPath);
}
function processBatsmanFiles(teamName ,batsmanName, totalRuns, totalBalls, totalFours, totalSixes, strikeRate){
    let teamFolder = checkTeamFolder(teamName);
    if(teamFolder){
        // team folder is present then check batsman profile
        let isBatsmanPresent = checkBatsmanFile(teamName, batsmanName);
        if(isBatsmanPresent){
            updateBatsmanFile(teamName ,batsmanName, totalRuns, totalBalls, totalFours, totalSixes, strikeRate);
        }
        else createBatsmanFile(teamName ,batsmanName, totalRuns, totalBalls, totalFours, totalSixes, strikeRate);

    }else {
        createTeamFolder(teamName);
        createBatsmanFile(teamName ,batsmanName, totalRuns, totalBalls, totalFours, totalSixes, strikeRate);
    }
}

function leaderBoard(teamName ,batsmanName, totalRuns, totalBalls, totalFours, totalSixes, strikeRate){
    let leaderBoardFile = JSON.parse(fs.readFileSync("./leaderboard.json", "utf-8"));
    let flag=false;
    if(leaderBoardFile.length<1){
        let batsmanFile = [];
        let object = {
            Name : batsmanName,
            Runs : totalRuns,
            Balls : totalBalls,
            Fours : totalFours,
            Sixes : totalSixes,
            StrikeRate : strikeRate            
        };
        batsmanFile.push(object);
        fs.writeFileSync("./leaderboard.json", JSON.stringify(batsmanFile));
    }
    else{
        for(let i=0;i<leaderBoardFile.length;i++){
            //if(leaderBoard[i].Name=="Extras")continue;
            if(leaderBoardFile[i].Name == batsmanName){
                flag=true;
                leaderBoardFile[i].Runs = leaderBoardFile[i].Runs+totalRuns;
                leaderBoardFile[i].Balls = leaderBoardFile[i].Balls+totalBalls;
                leaderBoardFile[i].Fours = leaderBoardFile[i].Fours+totalFours;
                leaderBoardFile[i].Sixes = leaderBoardFile[i].Sixes+totalSixes;
                leaderBoardFile[i].StrikeRate = strikeRate;
                fs.writeFileSync("./leaderboard.json", JSON.stringify(leaderBoardFile));
            }
        }
        if(!flag){
            let object = {
                Name : batsmanName,
                Runs : totalRuns,
                Balls : totalBalls,
                Fours : totalFours,
                Sixes : totalSixes,
                StrikeRate : strikeRate            
            };
            leaderBoardFile.push(object);
            fs.writeFileSync("./leaderboard.json", JSON.stringify(leaderBoardFile));
        }
    }
    let xls = json2xls(leaderBoardFile);

    fs.writeFileSync('data.xlsx', xls, 'binary');
}
//BatsmanData("https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/full-scorecard");
module.exports = BatsmanData;