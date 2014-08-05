// Generated on 2014-05-09 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var path = require('path');

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: '.',
        dist: 'dist',
        generated: 'generated'
    };

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {}
    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            // compass: {
            //     files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
            //     tasks: ['compass:server', 'autoprefixer']
            // },
            gruntfile: {
                files: ['Gruntfile.js']
            }
            /*            ,
             livereload: {
             options: {
             livereload: '<%= connect.options.livereload %>'
             },
             files: [
             '<%= yeoman.app %>/{,*/
            /*}*.html',
             '.tmp/styles/{,*/
            /*}*.css',
             '<%= yeoman.app %>/images/{,*/
            /*}*.{png,jpg,jpeg,gif,webp,svg}'
             ]
             }*/
        },
        express: {
            options: {
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    server: path.resolve('./app.js'),
                    livereload: true,
                    serverreload: false,
                    bases: [path.resolve('./.tmp'), path.resolve(__dirname, yeomanConfig.app)],
                    spawn: false
                }
            },
            test: {
                options: {
                    server: path.resolve('./app.js'),
                    bases: [path.resolve('./.tmp'), path.resolve(__dirname, 'test')]
                }
            },
            dist: {
                options: {
                    server: path.resolve('./app.js'),
                    bases: path.resolve(__dirname, yeomanConfig.dist)
                }
            },
            server: {
                options: {
                    port: 80
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: 'checkstyle',
                reporterOutput: 'generated/jshint/resultJSHint.xml'
            },
            all: {
                src: ['Gruntfile.js', 'app/scripts/**/*.js', 'api/**/*.js', 'test/spec/**/*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        bowerInstall: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: '<%= yeoman.app %>/'
            },
            sass: {
                src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: '<%= yeoman.app %>/bower_components/'
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        cssmin: {
            options: {
                root: '<%= yeoman.app %>'
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngmin: {
            controllers: {
                expand: true,
                cwd: './',
                src: ['app/scripts/**/*.js'],
                dest: '<%= yeoman.generated %>/ngmin'
            }
        },
        uglify: {
            build: {
                src: '<%= yeoman.generated %>/ngmin/**/*.js',
                dest: '<%= yeoman.dist %>/app/scripts/front.js'
            }
        },
        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'app/**/*.{html,css,png,jpeg,GIF,jpg,eot,svg,ttf,woff}',
                        'app/bower_components/**/*.js',
                        'api/**/*',
                        'models/**/*',
                        'routes/**/*',
                        'app.js',
                        'Gruntfile.js',
                        'package.json',
                        'bower.json',
                        '.bowerrc'
                    ]
                }]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            dist: [
                'imagemin',
                'svgmin'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });


    grunt.registerTask('serve', function(target) {
       grunt.task.run([
            'clean:server',
            'bowerInstall',
            'autoprefixer',
            'express:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function(target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });



    grunt.registerTask('build-dev', [
        'build'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'autoprefixer',
        'express:test',
        'jshint:all',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'copy:dist',
        'useminPrepare',
        'ngmin',
        'uglify',
        'usemin'
    ]);

    grunt.registerTask('build-prod', [
        'clean:dist',
        'bowerInstall',
        'useminPrepare',
        'autoprefixer',
        'concat',
        'copy:dist',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};