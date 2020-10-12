const puppeteer = require("puppeteer");
const $ = require("cheerio");
const alert = require("alert");
const url = "https://9gag.com/";

function grabPage(url){
    return puppeteer
        .launch()
        .then(function(browser) {
            return browser.newPage();
        })
        .then(function(page) {
            return page.goto(url).then(function() {
                return page.content();
            });
        })
}

function parseHtml(html){
    return Array.from($("article", html)).map(function(el) {
        return $("h1", el).text();
    });
}

function parseSite(urL){
    return grabPage(url).then(page => parseHtml(page))
}

parseSite(url).then(res => {
    alert(res[0]);
    console.log(res);
});
