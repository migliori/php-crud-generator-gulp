/**
 *
 * Scripts Module
 *
 * Version: 1.1
 *
 * Compile CSS from Sass files
 *
 */
/* global module, require */
'use strict';
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

module.exports = function (gulp, plugins, config) {
    // Combine js files
    function bootstrapjs() {
        return gulp
            .src([
                config.baseDir + 'node_modules/bootstrap/js/dist/util.js',
                config.baseDir + 'node_modules/bootstrap/js/dist/alert.js',
                config.baseDir + 'node_modules/bootstrap/js/dist/button.js',
                // config.baseDir + 'node_modules/bootstrap/js/dist/carousel.js',
                config.baseDir + 'node_modules/bootstrap/js/dist/collapse.js',
                config.baseDir + 'node_modules/bootstrap/js/dist/dropdown.js',
                // config.baseDir + 'node_modules/bootstrap/js/dist/modal.js',
                config.baseDir + 'node_modules/bootstrap/js/dist/scrollspy.js'
                // config.baseDir + 'node_modules/bootstrap/js/dist/tab.js'
                // config.baseDir + 'node_modules/bootstrap/js/dist/tooltip.js'
                // config.baseDir + 'node_modules/bootstrap/js/dist/popover.js'
            ])
            .pipe(concat('bootstrap.js'))
            .pipe(gulp.dest(config.scripts));
    }

    // Create minified js
    function minifyjs() {
        // bootstrapjs has to be finished before minifyjs
        return gulp.src([
            config.scripts + '**/**/*.js', '!' + config.scripts + '**/**/*.min.js'
        ])
            .pipe(uglify())
            .pipe(rename({
                extname: ".min.js"
            }))
            .pipe(gulp.dest(config.scripts))
    }

    // main task
    return gulp.series(bootstrapjs, minifyjs);
};
