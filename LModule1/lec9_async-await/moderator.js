const id = "pamico3332@nic58.com";
const pw = "12345678";
const puppeteer = require("puppeteer");

async function login(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
      });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pw);
    await tab.click( ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
    await tab.waitForTimeout(2000);
    let element = await tab.$('div[data-analytics="NavBarProfileDropDown"]');
    await element.click();
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li' , {visible:true});
    let bothLis = await tab.$$('.nav-tabs.nav.admin-tabbed-nav li');
    let manageChallengeLi = bothLis[1];
    await manageChallengeLi.click();
    await tab.waitForSelector(".backbone.block-center", {visible:true});
    let allQuestionLinks = await tab.$$(".backbone.block-center");
    let allQuestionArr = [];
    for(let i=0;i<allQuestionLinks.length;i++){
        let oneLink = await tab.evaluate(function(elem){
            return elem.getAttribute("href");
        }, allQuestionLinks[i]);
        oneLink = "https://www.hackerrank.com"+oneLink;
        allQuestionArr.push(oneLink);
    }
    await allModerators(browser, allQuestionArr);
    
};

async function allModerators(browser, allQuestionArr){
    for(let i =0;i<allQuestionArr.length;i++){
        let oneLink = allQuestionArr[i];
        let tab = await browser.newPage();
        await tab.goto(oneLink);
        
    }
}


login();