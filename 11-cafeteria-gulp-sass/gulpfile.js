const { src, dest, watch, series, parallel } = require('gulp');

// CSS & SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// Images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

function css (done) {
    // Compile SASS (pipe)

    // Identify the file, Compile the .scss, Save the final output (css)
    // With outputStyle: 'compressed' we minify the output css
    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        //.pipe( sass({ outputStyle: 'compressed' }) )
        .pipe( sass() )
        .pipe( postcss( [ autoprefixer(), cssnano() ] ) )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/css') )

    done();

}

function images ( done ) {
    src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') );

    done();
}

function versionWebp(done) {

    const options = {
        quality: 50
    }

    src( 'src/img/**/*.{png,jpg}' )
            .pipe( webp(options) )
            .pipe( dest('build/img') )

    done();
}

function versionAvif() {
    const options = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
            .pipe( avif(options) )
            .pipe( dest('build/img') );
}

function dev() {
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/img/**/*', images );
    //watch( 'src/scss/app.scss', css );
}

function defaultTask() {
    console.log("hi ")
}

exports.css = css;
exports.dev = dev;
exports.images = images;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( images, versionWebp, versionAvif, css, dev );

// series - First execute the first task and when it finish execute the second task and so on.
// parallel - All the task start at the same time.