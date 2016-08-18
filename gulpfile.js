var gulp			= require('gulp'),
	gulpLoadPlugins	= require('gulp-load-plugins'),
	plumber			= require('gulp-plumber'),
	browserSync		= require('browser-sync'),
	less 			= require('gulp-less'),
	autoprefixer	= require('gulp-autoprefixer'),
	concat			= require('gulp-concat'),
	minifyCSS		= require('gulp-minify-css'),
	minifyHTML		= require('gulp-minify-html'),
	uglify			= require('gulp-uglify'),
	babel			= require("gulp-babel"),
	bower			= require('gulp-bower'),
	ghPages			= require('gulp-gh-pages'),
	reload			= browserSync.reload;

// automatically push to github page
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
	.pipe(ghPages());
});

// Static Server + watching less/html files
gulp.task('serve', ['less', 'fonts', 'bower', 'html', 'javascript', 'resources'], function() {

	browserSync({
		server: "./portfolio"
	});

	gulp.watch("bower_components/**/*.*", ['bower']);
	gulp.watch("src/less/**/*.less", ['less']);
	gulp.watch("src/**/*.html", ['html']);
	gulp.watch("src/js/**/*.js", ['javascript']);
	gulp.watch("src/resources/**/*.*", ['resources']);
});

gulp.task('build', ['less', 'fonts', 'bower', 'html', 'javascript', 'resources'], function() {});


// Compile less into CSS & auto-inject into browsers
gulp.task('less', function() {
	return gulp.src(["src/less/style.less"])
		.pipe(plumber())
		.pipe(less())
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
	return gulp.src([
			"src/less/**/*.ttf", 'src/less/**/*.woff', 'src/less/**/*.woff2'
		])
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
	return gulp.src(["src/js/portfolio.module.js", "src/js/services/*.js", /*"src/js/controllers/*.js",*/ "src/js/**/*.js"])
		.pipe(concat('all.min.js'))
		.pipe(plumber())
		.pipe(babel())
		// .pipe(uglify())
		.pipe(gulp.dest('./portfolio/'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('resources', function() {
	return gulp.src("src/resources/**/*.*")
		.pipe(gulp.dest('./portfolio/resources'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('bower', function() {
	return bower('bower_components')
		.pipe(gulp.dest('portfolio/lib/'));
});

gulp.task('default', ['serve']);