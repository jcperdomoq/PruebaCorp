'use strict';
module.exports = function(grunt) {
    // Load all tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time
    require('time-grunt')(grunt);

    var jsFileList = [
        'ws/initial.apib',
        'ws/auth.apib',
    ];

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'ws/initial.apib',
                'ws/auth.apib',
            ]
        },
        concat: {
            options: {
                separator: '\n',
            },
            dist: {
                src: [jsFileList],
                dest: 'webservices.apib',
            },
        },
        watch: {
            js: {
                files: [
                    jsFileList,
                    '<%= jshint.all %>'
                ],
                tasks: ['concat']
            }
        }
    });

    // Register tasks
    grunt.registerTask('default', [
        'run'
    ]);
    grunt.registerTask('run', [
        'concat'
    ]);
};