var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");
var bower = require('gulp-bower');
var ghPages = require('gulp-gh-pages');
var reload = browserSync.reload;

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'fonts', 'bower', 'html', 'javascript', 'resources'], function() {

    browserSync({
        server: "./portfolio"
    });

    gulp.watch("bower_components/**/*.*", ['bower']);
    gulp.watch("src/sass/**/*.scss", ['sass']);
    gulp.watch("src/**/*.html", ['html']);
    gulp.watch("src/js/**/*.js", ['javascript']);
    gulp.watch("src/res/**/*.*", ['resources']);
});

gulp.task('build', ['sass', 'fonts', 'bower', 'html', 'javascript', 'resources'], function() {});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(["src/sass/style.scss", "src/sass/materialize/materialize.scss"])
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%']
        }))
        .pipe(gulp.dest("./portfolio/css/"))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('fonts', function() {
    return gulp.src(["src/sass/**/*.ttf", 'src/scss/**/*.woff', 'src/scss/**/*.woff2'])
        .pipe(gulp.dest("./portfolio/"))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('html', function() {
    return gulp.src("src/**/*.html")
        .pipe(plumber())
        .pipe(minifyHTML({
            conditionals: true
        }))
        .pipe(gulp.dest("./portfolio/"))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('javascript', function() {
    return gulp.src(["src/js/portfolio.module.js", "src/js/services/*.js", "src/js/**/*.js"])
        .pipe(concat('all.min.js'))
        .pipe(plumber())
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('./portfolio/'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('resources', function() {
    return gulp.src("src/res/**/*.*")
        .pipe(gulp.dest('./portfolio/res'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('bower', function() {
    return bower('bower_components')
        .pipe(gulp.dest('portfolio/lib/'));
});

gulp.task('default', ['serve']);
