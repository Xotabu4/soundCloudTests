"use strict";
var Player = require('./fragments/Player');
var Track = require('./fragments/Track');
let EC = protractor.ExpectedConditions;

class BasePage {
    constructor() {
        this.player = new Player();
        this.trackCards = $$('track-card');

        this.searchButton = $('.btn--search-alt');
    }

    /** 
     * @param {int} index - number starting from 0
     * @returns {Track} Track object on the page
     */
    tracks(index) {
        return new Track(this.trackCards.get(index));
    }

    /**
     * Opens search field, waits until visible, then types search requests and starts search.
     * 
     * @param {string} searchRequest - what will be used to search for.
     */
    search(searchRequest) {
        this.searchButton.click();
        let searchInput = $('input.search-form__input');

        browser.wait(EC.visibilityOf(searchInput), 2000, 'Search input should became visible');
        
        searchInput.sendKeys(searchRequest).submit();
        //browser.sleep(5000); //Search might take some time

        browser.wait(EC.visibilityOf(this.tracks(0).playButton), 10000).then(function () {
            //will be executed when search success
        }, function () {
            //will be executed when search unsuccess
        })
        
    }

    getHeaderTitle() {
        return $('content-header h1').getText()
    }
}


module.exports = BasePage;