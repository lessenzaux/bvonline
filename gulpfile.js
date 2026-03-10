/**
 * [ SISTEMA NERVOSO | GULPFILE.JS ]
 * --------------------------------------------------------------------------
 * A Vigília do Santuário Svadhyaya
 * --------------------------------------------------------------------------
 */

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// 1. A ALQUIMIA (Sass transmutado em CSS Vajra)
function style() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
}

// 2. A VIGÍLIA (O Olho que tudo vê)
function watch() {
  browserSync.init({
    proxy: "http://localhost:3000", // A origem exata do seu Prana (Express)
    port: 3001,                     // O portal de acesso para os seus olhos
    notify: false,                  // Silencia as notificações do BrowserSync
    open: false                     // Evita a abertura caótica de abas
  });

  // Os Nadis (Canais de observação)
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch('./views/**/*.pug').on('change', browserSync.reload);
  gulp.watch('./public/js/**/*.js').on('change', browserSync.reload);
}

// 3. O SELO DE EXPORTAÇÃO
exports.style = style;
exports.watch = watch;
exports.default = gulp.series(style, watch);