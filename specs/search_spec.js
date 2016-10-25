"use strict";

//Importing needed pageobjects
let HomePage = require('../src/pageObjects/HomePage');
let SearchPage = require('../src/pageObjects/SearchPage');



describe(`Searching: `, function (){
    let homePage = new HomePage();
    let searchPage = new SearchPage();

    it('simple search should be successful', function () {
        let searchRequest = 'test';
        homePage.search(searchRequest);

        expect(searchPage.tracks(0).getTrackInfo())
            .toMatch(searchRequest, 'First search result should contain what we searched.');
        
        expect(searchPage.getHeaderTitle())
            .toBe(searchRequest, 'Page title should contain search request');
    });

    
});