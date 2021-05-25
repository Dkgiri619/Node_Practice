const puppeteer = require("puppeteer");

const id = "gokot47302@itwbuy.com";
const pass = "123456789";

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
    
})


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