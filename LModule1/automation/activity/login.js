const puppeteer = require("puppeteer");

const id = "gokot47302@itwbuy.com";
const pass = "123456789";
let idx,gcode;
let tab;
let browserPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
});

browserPromise.then(function(browser){
    return browser.pages();
})
.then(function(pages){
    tab = pages[0];
    return tab.goto("https://www.hackerrank.com/auth/login");
})
.then(function () {
    return tab.type("#input-1", id);
})
.then(function () {
    return tab.type("#input-2", pass);
})
.then(function(){
    return tab.click(
        ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
    );
})
.then(function(){
    return waitAndClick("a[id='base-card-1-link']");
})
.then(function(){
    return waitAndClick('a[data-attr1="warmup"]');
})
.then(function () {
    return tab.waitForSelector(".js-track-click.challenge-list-item", {
      visible: true,
    });
  })
  .then(function () {
    // tab.$() // document.querySelector;
    return tab.$$(".js-track-click.challenge-list-item"); // it will run document.querySelectorAll in the browser and gives you array of all the elements
  })
  .then(function(allQuestionArr){
      let allPendingPromises = [];
      for(let i=0; i<allQuestionArr.length; i++){
        let oneAtag = allQuestionArr[i];
        let codeNamePromise = tab.evaluate(function(elem){return elem.getAttribute("href");}, oneAtag);
        allPendingPromises.push(codeNamePromise);
      }
      return Promise.all(allPendingPromises);
  })
  .then(function(allQuesLinks){
    let oneQuesSolvePromise = solveQuestion(allQuesLinks[0]);
    return oneQuesSolvePromise;
  })



function getCode(){
    return new Promise(function(scb, fcb){
        let waitPromise = tab.waitForSelector(".hackdown-content h3", {visible:true});
        waitPromise.then(function(){
            return tab.$$(".hackdown-content h3");
        })
        .then(function(allCodeNamesElement){
            let allCodeNamesPromise = [];
            for(let i=0;i<allCodeNamesElement.length;i++){
               let codeNamePromise = tab.evaluate(function(elem){ return elem.textContent;}, allCodeNamesElement[i]);
               allCodeNamesPromise.push(codeNamePromise);
            }
            return Promise.all(allCodeNamesPromise);
        })
        .then(function(allCodeDiv){
            for(let i=0;i<allCodeDiv.length;i++){
                if(allCodeDiv[i]=="C++"){
                    idx = i;
                    break;
                }
            }
            return tab.$$(".hackdown-content .highlight");
        })
        .then(function(allCodesDiv){
            let cCode = allCodesDiv[idx];
            return tab.evaluate(function(elem){
                return elem.textContent;
            },cCode);
        })
        .then(function(code){
            gcode = code;
            scb();
        })
        .catch(function(error){
            fcb(error);
        });
    })
}

function pasteCode(){
    return Promise(function(scb, fcb){
        let     
    })
}
function solveQuestion(link){
    return new Promise(function(scb, fcb){
        let gotoPromise = tab.goto("https://www.hackerrank.com"+link);
        gotoPromise.then(function(){
            return waitAndClick('div[data-attr2="Editorial"]');
        })
        .then(function(){
            return getCode();
        })
        .then(function(){
            return tab.click('div[data-attr2="Problem"]');
        })
        .then(function(){
            return pasteCode();
        })
    })
}
function waitAndClick(selector){
    return new Promise(function(scb, fcb){
        let waitPromise = tab.waitForSelector(selector, {visible:true});
        waitPromise.then(function(){
            return tab.click(selector);
        })
        .then(function(){
            scb();
        })
        .catch(function(){
            fcb();
        })
    })
}