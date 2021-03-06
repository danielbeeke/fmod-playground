'use strict';

var gulp = require('gulp');
var reload = global.browserSync.reload;

gulp.task('serve', ['css'], function () {
    global.browserSync.init({
        server: [global.paths.src, 'app/js/fmodApi/studio/lib'],
        ghostMode: false
    });

    gulp.watch([global.paths.html, global.paths.js]).on("change", reload);
    gulp.watch([global.paths.scss], ['css']);
});


