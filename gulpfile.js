var protractor = require("gulp-protractor").protractor;
var gulp = require('gulp');

// Using this plugin : https://www.npmjs.com/package/gulp-protractor
// To install gulp - sudo npm install --global gulp-cli
// To run 

gulp.task('test', function() {

    gulp.src(["./specs/*_spec.js"])
        .pipe(protractor({
            configFile: "protractor.config.js",
            args: ['--baseUrl', 'https://soundcloud-ngrx.herokuapp.com']
        }))
        .on('error', function(e) { 
            throw e 
        })

});