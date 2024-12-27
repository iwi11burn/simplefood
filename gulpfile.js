const { src, dest, watch, parallel, series } = require('gulp')
const del = require('del')
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync').create()
const concat = require('gulp-concat')
const postcss = require('gulp-postcss')
const imagemin = require('gulp-imagemin')
const autoprefixer = require('autoprefixer')

function browsersync() {
	browserSync.init({
		server: {
			baseDir: './app/',
		},
		notify: false,
	})
}

function styles() {
	return src('./app/scss/style.scss')
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(
			postcss([
				autoprefixer({
					overrideBrowserslist: ['last 10 versions'],
					grid: 'autoplace',
				}),
			])
		)
		.pipe(concat('style.min.css'))
		.pipe(dest('./app/css'))
		.pipe(browserSync.stream())
}

function scripts() {
	return src(['./node_modules/jquery/dist/jquery.js', './app/js/main.js'])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('./app/js'))
}

function images() {
	return src('./app/images/**/*.*')
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [
						{
							removeViewBox: true,
						},
						{
							cleanupIDs: false,
						},
					],
				}),
			])
		)
		.pipe(dest('./dist/images'))
}

function build() {
	return src(
		['./app/**/*.html', './app/css/style.min.css', './app/js/main.min.js'],
		{ base: './app' }
	).pipe(dest('./dist'))
}

function cleanDist() {
	return del('./dist/**')
}

function watching() {
	watch(['./app/scss/**/*.scss'], styles)
	watch(['./app/js/**/*.js', '!./app/js/main.min.js'], scripts)
	watch(['./app/**/*.html']).on('change', browserSync.reload)
}

exports.browsersync = browsersync
exports.styles = styles
exports.scripts = scripts
exports.images = images
exports.watching = watching
exports.cleanDist = cleanDist
exports.build = series(cleanDist, images, build)

exports.default = parallel(browsersync, styles, scripts, watching, images)
