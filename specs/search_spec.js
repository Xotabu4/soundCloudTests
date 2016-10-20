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

    xit('How to handle and log errors with promises', function () {
        let log = (error)=> {
            console.log('OLOLO PAGE CRASHED!', error);
            throw Error(`Page open was crashed`);
        };
        browser.get('http://as234234ldkfj.com').then(undefined,log); 
    });

    xit('How to wait for multiple promises to resolve', function () {
        let firstTrack = homePage.tracks(0).getTrackInfo()
        let secondTrack = homePage.tracks(1).getTrackInfo()
        
        protractor.promise.all([firstTrack, secondTrack]).then(function (texts) {
            console.log('firstTrack', texts[0]);
            console.log('secondTrack', texts[1]);
            expect(texts[0]).not.toBe(texts[1]);
        })

        firstTrack.then(function (firstTrackText) {
            secondTrack.then(function (secondTrackText) {
                expect(firstTrackText).not.toBe(secondTrackText)
            })

        })

    }); 

    xit('Own promise', function () {
        let deferred = protractor.promise.defer();
        setTimeout(()=> {
            deferred.fulfill(true);
            console.log('finished')
        }, 2000);
        
        browser.wait(deferred.promise, 15000, 'Wating for promise to resolve');

        //deferred.reject('');

        //deferred.promise.then(function (text) {console.log(text)});

    });

    xit('Wait with predefined conditions', function () {

        let EC = protractor.ExpectedConditions;

        browser.wait(EC.visibilityOf($$('asdf') ) )
        //browser.wait(protractor.ExpectedConditions.visibilityOf(), 10000);    
    })
    
});