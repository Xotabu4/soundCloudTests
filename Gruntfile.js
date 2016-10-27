module.exports = function(grunt) {
    grunt.initConfig({
        protractor: {
            options: {
                // Location of your protractor config file
                configFile: "./protractor.config.js",
            
                // Additional arguments that are passed to the webdriver command
                args: { },
                keepAlive: false
            },
            e2e: {
                options: {
                // Stops Grunt process if a test fails
                args: {
                    'baseUrl': 'http://test.com'
                }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.registerTask('test', ['protractor:e2e']);

}
