var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var imagemin    = require('gulp-imagemin');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'index', 'images', 'fonts'], function() {

    browserSync.init({
        server: "./docs"
    });

    gulp.watch("src/scss/**/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("src/images/**/*.*", ['images']).on('change', browserSync.reload);
    gulp.watch("src/images/**/*.*", ['fonts']).on('change', browserSync.reload);
    gulp.watch("src/*.html", ['index']).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest("docs/css"))
        .pipe(browserSync.stream());
});

// Copy index document in the production folder
gulp.task('index', function() {
    return gulp.src("src/index.html")
        .pipe(gulp.dest("docs/"))
        .pipe(browserSync.stream());
});

// Copy fonts in the production folder
gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*.*")
        .pipe(gulp.dest("docs/fonts/"))
        .pipe(browserSync.stream());
});

// Copy and reduce image size
gulp.task('images', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('docs/images'))
        .pipe(browserSync.stream())
);

gulp.task('default', ['serve']);