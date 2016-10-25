/**
 * 
 */
xdescribe(`Examples:`, function (){
    it('How to handle and log errors with promises', function () {
        
        //Idea here to put your callback on promise reject. So it won't be propagated to Control Flow level, and will not cause process error.
        let log = (error)=> {
            console.log('Got a page crash: ', error);
            throw Error(`Page open was crashed`);
        };

        browser.get('http://as234234ldkfj.com').then(undefined, log); 
    });

    it('How to wait for multiple promises to resolve', function () {
        // First getting 2 promises that we need to wait for.
        let firstTrack = homePage.tracks(0).getTrackInfo()
        let secondTrack = homePage.tracks(1).getTrackInfo()
        

        // Then using protractor.promise.all - this will return another promise that will be resolved with array of values.
        // Notice, protractor.promise.all - accepts array of promises - [promise, promise]
        protractor.promise.all([firstTrack, secondTrack]).then(function (texts) {
            //texts - this will be array of strings here. 
            console.log('firstTrack', texts[0]);
            console.log('secondTrack', texts[1]);
            expect(texts[0]).not.toBe(texts[1]);
        })

        // Another not recommended approach - is to use nested .then() calls 
        firstTrack.then(function (firstTrackText) {
            secondTrack.then(function (secondTrackText) {
                expect(firstTrackText).not.toBe(secondTrackText)
            })
        })

    }); 

    it('Waiting for your custom action. This will not add command to control flow, but may help you when need to wait for async 3rd party actions', function () {
        //Creating own webdriver promise
        let deferred = protractor.promise.defer();
        //setTimeout is standard function to delay execution of function, just pretending that we are doing some async work
        setTimeout(()=> {
            deferred.fulfill(true);
            console.log('finished')
        }, 2000);
        

        browser.wait(deferred.promise, 15000, 'Wating for promise to resolve');

    });

    it('How to wait for some condition of element', function () {
        let EC = protractor.ExpectedConditions;
        /**
         * first parameter for browser.wait - is a special function that returns true/false or promise, that will be resolved to true/false.
         * You can use this to write own conditions to wait
         */
        browser.wait(EC.visibilityOf($('body')), 2000, 'Third param - is a string that will be used as error message when search is not successful.')
        

        //Also - wait() returns promise, so you could handle success and fail waitings with .then();
        browser.wait(EC.visibilityOf(this.tracks(0).playButton), 10000).then(function () {
            //will be executed when search success
        }, function () {
            //will be executed when search unsuccess
        })

        // Feel free to create own conditions to wait!
        let buttonToHaveOKText = function () {
            // In this case we are returning promise, that will be resolved to true, when button text equals OK, and false in other cases (even if element is not found)  
            return $('button').getText().then(text=> text === 'OK', error=> false)
        }

        //NOTICE! we are not calling - buttonToHaveOKText function here, we just sending it as param.
        browser.wait(buttonToHaveOKText, 2000, 'Waiting failed: Button still has no OK text')
    })

});



describe('mock modules', function () {
    beforeAll(function () {
        browser.addMockModule('myApp.appVersion', function() {
            angular.module('myApp.appVersion', []).
            value('version', '10.0').
            directive('appVersion', ['version', function(version) {
                return function(scope, elm, attrs) {
                elm.text(version);
                };
            }]);
        });
    })

    afterAll(function () {
        browser.clearMockModules();
    })


    it('mocking modules', function () {


        browser.get('http://www.protractortest.org/testapp/ng1/#/repeater')        
        browser.$('[app-version]').getText().then(console.log);

        browser.sleep(10000);
    })
})

