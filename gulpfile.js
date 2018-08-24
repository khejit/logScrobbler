var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	svgstore = require('gulp-svgstore'),
	guetzli = require('imagemin-guetzli'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	del = require('del'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create(),
	watch = require('gulp-watch'),
	injectSvg = require('gulp-inject-svg'),
	runSequence = require('gulp-run-sequence'),
	gutil = require('gulp-util'),
	concatcss = require('gulp-concat-css'),
	cssnano = require('gulp-cssnano'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	bulkify = require('bulkify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	historyFallback = require('connect-history-api-fallback');

var paths = {
	src: "assets/",
	dist: "dist/"
};

gulp.task('svgSprite', function () {
	return gulp.src(paths.src + '/svg/*.svg')
		.pipe(imagemin())
		.pipe(svgstore())
		.pipe(rename('icons.svg'))
		.pipe(gulp.dest(paths.dist + '/svg'))
});

gulp.task('images-jpg', function () {
	return gulp.src(paths.src + '/img/*.{jpg,jpeg}')
		.pipe(imagemin([guetzli()]))
		.pipe(imagemin({
			progressive: true,
			//optimizationLevel: 5
		}))
		.pipe(gulp.dest(paths.dist + '/img'))
});

gulp.task('images-png', function () {
	return gulp.src(paths.src + '/img/*.png')
		.pipe(imagemin({
			//optimizationLevel: 5
		}))
		.pipe(gulp.dest(paths.dist + '/img'))
});

gulp.task('images-svg', function () {
	return gulp.src(paths.src + '/img/*.svg')
		.pipe(gulp.dest(paths.dist + '/img'))
});

gulp.task('images', ['images-jpg', 'images-png', 'images-svg']);

gulp.task('sass', function () {
	return gulp.src(paths.src + '/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			"outputStyle": "expanded"
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			"browsers": ["last 2 versions", "> 1%", "ie >= 11", "android >= 4.4"]
		}))
		.pipe(rename("main.css"))
		.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest(paths.dist + '/css'))
		.pipe(browserSync.stream({
			match: '**/*.css'
		}))
});

gulp.task('css-vendors', function () {
    return gulp.src(paths.src + '/scss/vendors/*.{css,scss}')
        .pipe(concatcss('vendor.css'))
        .pipe(cssnano())
        .pipe(gulp.dest(paths.dist + '/css'))
});

gulp.task('js', function () {
	return browserify(paths.src + '/js/main.js')
		.transform('babelify', {
			presets: ['es2015']
		})
		.transform('bulkify')
		.bundle()
		.on('error', function (error) {
			console.log(error);
			this.emit('end');
		})
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init())
		//.pipe(uglify())		
		.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest(paths.dist + '/js'))
});

gulp.task('js-vendors', function () {
	return gulp.src([paths.src + '/js/vendors/jquery.js', paths.src + '/js/vendors/*.js'])
		.pipe(concat('vendor.js'))
		.pipe(uglify())
		.on('error', gutil.log)
		.pipe(gulp.dest(paths.dist + '/js'))
});

gulp.task('html', function () {
	return gulp.src(paths.src + '/**/*.html')
		.pipe(injectSvg())
		.pipe(gulp.dest(''))
		.pipe(browserSync.stream({
			match: '**/*.html'
		}))
});

gulp.task('clean', function () {
	return del([paths.dist + '/css/*', paths.dist + '/js/*']);
});

gulp.task('build', function () {
	runSequence(
		'clean',
		['html', 'sass', 'css-vendors', 'svgSprite', 'images', 'js-vendors', 'js']
	)
});

gulp.task('browser-sync', () => {
	browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html",
      middleware: [historyFallback()]
    }
  });
});

gulp.task('watch', ['build', 'browser-sync'], function () {
	watch(paths.src + '/scss/**/*.scss', function () {
		gulp.start('sass');
	});
	watch(paths.src + '/svg/*.svg', function () {
		runSequence(
			'svgSprite',
			'html'
		)
	});
	watch(paths.src + '/img/*.{jpg,jpeg}', function () {
		gulp.start('images-jpg')
	});
	watch(paths.src + '/img/*.png', function () {
		gulp.start('images-png')
	});
	watch(paths.src + '/img/*.svg', function () {
		gulp.start('images-svg')
	});
	watch(paths.src + '/**/*.html', function () {
		gulp.start('html')
	});
	watch(paths.src + '/js/**/*.js', function () {
		gulp.start('js')
	});

	gulp.watch(['dist/**/*']).on('change', browserSync.reload);
});

gulp.task('default', function () {
	runSequence('js', 'watch');
});