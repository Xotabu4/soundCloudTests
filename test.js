"use strict";

let promise = browser.get('asdfasdf')

promise.then(
    undefined, 
    function (error) {
        console.log('OLOLO ERROR' + error);
    }
).then(function () {
    console.log('FINALLY')
})



promise.then(
    function () {
        console.log('OLOLO PAGE OPENED!')
    } , 
    function (error) {
        console.log('OLOLO ERROR' + error);
    }
)